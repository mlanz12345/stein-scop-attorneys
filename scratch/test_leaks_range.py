import os
from PIL import Image, ImageDraw

def test_leaks_range():
    # Use the frames already exported in public/temp_leak_test_fast
    temp_dir = "public/temp_leak_test_fast"
    if not os.path.exists(temp_dir):
        # Fallback to temp_grid or temp_analyze if fast folder isn't there
        temp_dir = "public/temp_leak_test"
    if not os.path.exists(temp_dir):
        # Create and export just the specific frames needed
        os.makedirs(temp_dir, exist_ok=True)
        import subprocess
        frames_to_export = [1, 40, 59, 60, 61, 62, 63, 80, 120, 160, 192]
        for f in frames_to_export:
            subprocess.run([
                "ffmpeg", "-y", "-i", "public/video3.mp4",
                "-vf", f"select=eq(n\\,{f-1})",
                "-vframes", "1",
                f"{temp_dir}/frame_{f:04d}.png"
            ], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
            
    # List of files in temp_dir
    files = sorted([f for f in os.listdir(temp_dir) if f.endswith(".png")])
    if not files:
        print("Error: No frames found")
        return

    # Crop bounds
    crop_x1 = 640 - 225
    crop_y1 = 360 - 225
    crop_x2 = 640 + 225
    crop_y2 = 360 + 225
    cw, ch = 450, 450
    
    fill_color = (255, 0, 255)
    corners = [(0, 0), (cw - 1, 0), (0, ch - 1), (cw - 1, ch - 1)]
    
    # We will test tolerances 100, 110, 120, 130, 140
    tolerances = [100, 110, 120, 130, 140]
    results = []
    
    # Let's load the key frames we want to check
    # We map frame index (1-based) to image
    # Note: filenames might be frame_0001.png etc.
    img_cache = {}
    for f in files:
        # Extract frame index from filename
        # e.g., frame_0001.png -> 1
        name_part = f.split("_")[-1].split(".")[0]
        try:
            f_idx = int(name_part)
            img_path = os.path.join(temp_dir, f)
            img = Image.open(img_path).convert("RGB")
            cropped = img.crop((crop_x1, crop_y1, crop_x2, crop_y2))
            img_cache[f_idx] = cropped
        except ValueError:
            continue
            
    # Frames to check: 59, 60, 61, 62, 63, 192
    check_frames = [f for f in [59, 60, 61, 62, 63, 192] if f in img_cache]
    if not check_frames:
        # If we couldn't match, check all loaded frames
        check_frames = list(img_cache.keys())
        
    for tol in tolerances:
        leaked = []
        for f_idx in check_frames:
            cropped = img_cache[f_idx]
            ff_img = cropped.copy()
            for cx, cy in corners:
                if ff_img.getpixel((cx, cy)) != fill_color:
                    ImageDraw.floodfill(ff_img, (cx, cy), fill_color, thresh=tol)
                    
            # Check center region (60x60)
            cx, cy = cw // 2, ch // 2
            has_leak = False
            for y in range(cy - 30, cy + 30):
                for x in range(cx - 30, cx + 30):
                    if ff_img.getpixel((x, y)) == fill_color:
                        has_leak = True
                        break
                if has_leak:
                    break
            if has_leak:
                leaked.append(f_idx)
                
        results.append((tol, leaked))
        
    # Write results to file
    with open("scratch/sweep_results.txt", "w") as f_out:
        for tol, leaked in results:
            line = f"Tolerance {tol:3d} -> Leaks in: {leaked}\n"
            f_out.write(line)
            print(line, end="")

if __name__ == '__main__':
    test_leaks_range()
