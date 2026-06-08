import os
import subprocess
from PIL import Image, ImageDraw

def test_all_frames_for_leaks():
    temp_dir = "public/temp_leak_test"
    os.makedirs(temp_dir, exist_ok=True)
    
    # Export all frames of video3.mp4
    print("Exporting video3.mp4 frames...")
    subprocess.run([
        "ffmpeg", "-y", "-i", "public/video3.mp4",
        f"{temp_dir}/frame_%04d.png"
    ], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    
    frames = sorted([f for f in os.listdir(temp_dir) if f.endswith(".png")])
    num_frames = len(frames)
    print(f"Total frames: {num_frames}")
    
    # Crop box: center 450x450
    crop_x1 = 640 - 225
    crop_y1 = 360 - 225
    crop_x2 = 640 + 225
    crop_y2 = 360 + 225
    
    tolerance = 150
    fill_color = (255, 0, 255)
    
    leaks = []
    
    print(f"Testing all frames for leaks with tolerance {tolerance}...")
    for idx, f in enumerate(frames):
        img_path = os.path.join(temp_dir, f)
        img = Image.open(img_path).convert("RGB")
        cropped = img.crop((crop_x1, crop_y1, crop_x2, crop_y2))
        w, h = cropped.size
        
        # Corners to flood fill from
        corners = [(0, 0), (w - 1, 0), (0, h - 1), (w - 1, h - 1)]
        ff_img = cropped.copy()
        for cx, cy in corners:
            if ff_img.getpixel((cx, cy)) != fill_color:
                ImageDraw.floodfill(ff_img, (cx, cy), fill_color, thresh=tolerance)
                
        # Check center region (e.g. 50x50 box in the very center of the image)
        # The center is at (w//2, h//2). Let's check a region around it.
        cx, cy = w // 2, h // 2
        has_leak_in_frame = False
        for y in range(cy - 25, cy + 25):
            for x in range(cx - 25, cx + 25):
                if ff_img.getpixel((x, y)) == fill_color:
                    has_leak_in_frame = True
                    break
            if has_leak_in_frame:
                break
                
        if has_leak_in_frame:
            leaks.append(idx + 1)
            
    if leaks:
        print(f"Warning: Leaks detected in frames: {leaks}")
    else:
        print("Success: No leaks detected in any of the 192 frames!")
        
    # Clean up
    for f in os.listdir(temp_dir):
        os.remove(os.path.join(temp_dir, f))
    os.rmdir(temp_dir)

if __name__ == '__main__':
    test_all_frames_for_leaks()
