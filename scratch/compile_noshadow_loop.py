import os
import subprocess
import shutil
from PIL import Image, ImageDraw, ImageFilter, ImageChops

def compile_noshadow_loop():
    temp_dir = "public/temp_compile_frames"
    os.makedirs(temp_dir, exist_ok=True)
    
    print("Exporting all video frames...")
    subprocess.run([
        "ffmpeg", "-y", "-i", "video3.mp4",
        f"{temp_dir}/frame_%04d.png"
    ], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    
    frames = sorted([f for f in os.listdir(temp_dir) if f.endswith(".png")])
    if not frames:
        print("Error: No frames found")
        return
        
    print(f"Exported {len(frames)} frames.")
    
    # Crop bounds
    crop_x1 = 640 - 225
    crop_y1 = 360 - 225
    cw, ch = 450, 450
    
    fill_color = (255, 0, 255)
    # Seeds for flood fill (corners and side midpoints)
    seeds = [
        (0, 0), (cw - 1, 0), (0, ch - 1), (cw - 1, ch - 1),
        (cw // 2, 0), (cw // 2, ch - 1), (0, ch // 2), (cw - 1, ch // 2)
    ]
    tolerance = 220
    
    processed_rgba_imgs = []
    accum_min_x, accum_min_y = cw, ch
    accum_max_x, accum_max_y = 0, 0
    
    print("Processing frames (flood-fill keying, edge smoothing, and bbox tracking)...")
    for idx, f in enumerate(frames):
        img_path = os.path.join(temp_dir, f)
        img = Image.open(img_path).convert("RGB")
        cropped = img.crop((crop_x1, crop_y1, crop_x1 + cw, crop_y1 + ch))
        
        # Determine highest safe tolerance dynamically for this frame (preventing center leaks)
        safe_tolerance = 180
        cx, cy = cw // 2, ch // 2
        for tol in [310, 300, 290, 280, 260, 240, 220, 200, 180]:
            ff_test = cropped.copy()
            for sx, sy in seeds:
                if ff_test.getpixel((sx, sy)) != fill_color:
                    ImageDraw.floodfill(ff_test, (sx, sy), fill_color, thresh=tol)
            
            # Check if center of the horse logo is leaked
            has_leak = False
            for y in range(cy - 5, cy + 5):
                for x in range(cx - 5, cx + 5):
                    if ff_test.getpixel((x, y)) == fill_color:
                        has_leak = True
                        break
                if has_leak:
                    break
            if not has_leak:
                safe_tolerance = tol
                break
                
        # Now apply the safe tolerance to build the final mask
        ff_img = cropped.copy()
        for sx, sy in seeds:
            if ff_img.getpixel((sx, sy)) != fill_color:
                ImageDraw.floodfill(ff_img, (sx, sy), fill_color, thresh=safe_tolerance)
                
        # Create mask
        alpha_pixels = []
        for y in range(ch):
            for x in range(cw):
                p = ff_img.getpixel((x, y))
                if p == fill_color:
                    alpha_pixels.append(0)
                else:
                    alpha_pixels.append(255)
                    
        mask = Image.new("L", (cw, ch))
        mask.putdata(alpha_pixels)
        
        # Soften edges with a tiny blur
        mask_blurred = mask.filter(ImageFilter.GaussianBlur(0.8))
        
        # Apply mask and pre-multiply alpha to suppress background bleed (in C for speed)
        multiplied_rgb = ImageChops.multiply(cropped, mask_blurred.convert("RGB"))
        r_ch, g_ch, b_ch = multiplied_rgb.split()
        rgba_img = Image.merge("RGBA", (r_ch, g_ch, b_ch, mask_blurred))
        
        processed_rgba_imgs.append(rgba_img)
        
        # Accumulate bounding box
        # We use a threshold of 10 for alpha to avoid loose noise
        # pillow's getbbox checks for any non-zero alpha
        # Let's create a thresholded mask for bbox calculation
        bbox_mask = mask.copy() # Using the sharp mask is safer for bbox
        bbox = bbox_mask.getbbox()
        if bbox:
            accum_min_x = min(accum_min_x, bbox[0])
            accum_min_y = min(accum_min_y, bbox[1])
            accum_max_x = max(accum_max_x, bbox[2])
            accum_max_y = max(accum_max_y, bbox[3])
            
    print(f"Accumulated bounding box: ({accum_min_x}, {accum_min_y}, {accum_max_x}, {accum_max_y})")
    
    # Add a larger padding (40 pixels) to make the logo smaller inside the 200x200 frame
    padding = 40
    accum_min_x = max(0, accum_min_x - padding)
    accum_min_y = max(0, accum_min_y - padding)
    accum_max_x = min(cw, accum_max_x + padding)
    accum_max_y = min(ch, accum_max_y + padding)
    
    crop_box = (accum_min_x, accum_min_y, accum_max_x, accum_max_y)
    print(f"Final crop box with padding: {crop_box}")
    
    # Crop and resize all processed images to 200x200
    final_frames_all = []
    for img in processed_rgba_imgs:
        cropped_img = img.crop(crop_box)
        resized_img = cropped_img.resize((200, 200), Image.Resampling.LANCZOS)
        final_frames_all.append(resized_img)
        
    # Build 360 ping-pong loop sequence
    # 1. Subsample: drop every 2nd frame to get 12fps animation
    subsampled = [final_frames_all[i] for i in range(0, len(final_frames_all), 2)]
    print(f"Subsampled from {len(final_frames_all)} to {len(subsampled)} frames.")
    
    # 2. Ping-pong loop
    # E.g. [0, 1, 2, 3] -> [0, 1, 2, 3, 2, 1] (total 6 frames)
    # This prevents duplication of boundary frames 0 and 3.
    loop_frames = subsampled[:-1] + list(reversed(subsampled))[0:-1]
    print(f"Total loop frames: {len(loop_frames)}")
    
    # Save APNG
    apng_path = "public/logo-spin-transparent.png"
    print(f"Saving APNG loop to {apng_path}...")
    loop_frames[0].save(
        apng_path,
        save_all=True,
        append_images=loop_frames[1:],
        duration=83.33, # 12 fps -> 83.33ms per frame
        loop=0
    )
    print("APNG saved.")
    
    # Save temporary frames for ffmpeg WebM compile
    temp_loop_dir = "public/temp_loop_export"
    os.makedirs(temp_loop_dir, exist_ok=True)
    for i, frame in enumerate(loop_frames):
        frame.save(os.path.join(temp_loop_dir, f"frame_{i+1:04d}.png"))
        
    # Compile WebM using ffmpeg
    webm_path = "public/logo-spin-transparent.webm"
    print(f"Compiling transparent WebM loop to {webm_path}...")
    subprocess.run([
        "ffmpeg", "-y", "-r", "12", "-i", f"{temp_loop_dir}/frame_%04d.png",
        "-c:v", "libvpx-vp9", "-pix_fmt", "yuva420p",
        "-b:v", "0", "-crf", "25", webm_path
    ], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    print("WebM saved.")
    
    # Clean up temp directories
    shutil.rmtree(temp_dir)
    shutil.rmtree(temp_loop_dir)
    print("Cleanup completed. Pipeline finished successfully!")

if __name__ == '__main__':
    compile_noshadow_loop()
