import os
import subprocess
import time
from PIL import Image, ImageDraw

def find_safe_tolerance_fast():
    temp_dir = "public/temp_leak_test_fast"
    os.makedirs(temp_dir, exist_ok=True)
    
    # Export frames if needed
    frames = sorted([f for f in os.listdir(temp_dir) if f.endswith(".png")])
    if len(frames) != 192:
        print("Exporting video3.mp4 frames...")
        subprocess.run([
            "ffmpeg", "-y", "-i", "public/video3.mp4",
            f"{temp_dir}/frame_%04d.png"
        ], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
        frames = sorted([f for f in os.listdir(temp_dir) if f.endswith(".png")])
        
    print(f"Loading {len(frames)} frames into memory...")
    t0 = time.time()
    
    # Center crop bounds
    crop_x1 = 640 - 225
    crop_y1 = 360 - 225
    crop_x2 = 640 + 225
    crop_y2 = 360 + 225
    cw, ch = 450, 450
    
    loaded_imgs = []
    for f in frames:
        img_path = os.path.join(temp_dir, f)
        img = Image.open(img_path).convert("RGB")
        cropped = img.crop((crop_x1, crop_y1, crop_x2, crop_y2))
        loaded_imgs.append(cropped)
        
    print(f"Loaded in {time.time() - t0:.2f} seconds.")
    
    fill_color = (255, 0, 255)
    corners = [(0, 0), (cw - 1, 0), (0, ch - 1), (cw - 1, ch - 1)]
    
    print("\nSweeping tolerances...")
    best_safe_tol = None
    for tolerance in range(85, 155, 5):
        leaked_frames = []
        for idx, cropped in enumerate(loaded_imgs):
            ff_img = cropped.copy()
            for cx, cy in corners:
                if ff_img.getpixel((cx, cy)) != fill_color:
                    ImageDraw.floodfill(ff_img, (cx, cy), fill_color, thresh=tolerance)
            
            # Check center 60x60 region
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
                leaked_frames.append(idx + 1)
                
        if leaked_frames:
            print(f"Tolerance {tolerance:3d} -> LEAKS in {len(leaked_frames)} frames (first few: {leaked_frames[:6]})")
        else:
            print(f"Tolerance {tolerance:3d} -> 100% LEAK-FREE!")
            best_safe_tol = tolerance
            
    print(f"\nRecommended highest safe tolerance: {best_safe_tol}")
    
    # Clean up temp files
    for f in os.listdir(temp_dir):
        os.remove(os.path.join(temp_dir, f))
    os.rmdir(temp_dir)

if __name__ == '__main__':
    find_safe_tolerance_fast()
