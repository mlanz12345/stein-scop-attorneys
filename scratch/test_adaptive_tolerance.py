import os
import subprocess
from PIL import Image, ImageDraw

def test_adaptive_tolerance():
    temp_dir = "public/temp_leak_test_t310"
    if not os.path.exists(temp_dir):
        temp_dir = "public/temp_leak_test"
    if not os.path.exists(temp_dir):
        os.makedirs(temp_dir, exist_ok=True)
        print("Exporting public/video3.mp4 frames...")
        subprocess.run([
            "ffmpeg", "-y", "-i", "public/video3.mp4",
            f"{temp_dir}/frame_%04d.png"
        ], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
        
    frames = sorted([f for f in os.listdir(temp_dir) if f.endswith(".png")])
    num_frames = len(frames)
    
    crop_x1 = 640 - 225
    crop_y1 = 360 - 225
    cw, ch = 450, 450
    
    fill_color = (255, 0, 255)
    seeds = [
        (0, 0), (cw - 1, 0), (0, ch - 1), (cw - 1, ch - 1),
        (cw // 2, 0), (cw // 2, ch - 1), (0, ch // 2), (cw - 1, ch // 2)
    ]
    
    # We will test tolerances from 310 down to 180
    tolerances_to_test = list(range(310, 179, -10))
    adaptive_tols = []
    
    print("Finding safe tolerance for each frame...")
    for idx, f in enumerate(frames):
        img_path = os.path.join(temp_dir, f)
        img = Image.open(img_path).convert("RGB")
        cropped = img.crop((crop_x1, crop_y1, crop_x1 + cw, crop_y1 + ch))
        
        safe_tol = 180
        for tol in tolerances_to_test:
            ff_img = cropped.copy()
            for sx, sy in seeds:
                if ff_img.getpixel((sx, sy)) != fill_color:
                    ImageDraw.floodfill(ff_img, (sx, sy), fill_color, thresh=tol)
            
            # Check center region (10x10 box around the center 225, 225)
            # Center of crop is at (225, 225)
            cx, cy = cw // 2, ch // 2
            has_leak = False
            for y in range(cy - 5, cy + 5):
                for x in range(cx - 5, cx + 5):
                    if ff_img.getpixel((x, y)) == fill_color:
                        has_leak = True
                        break
                if has_leak:
                    break
                    
            if not has_leak:
                # This tolerance is safe!
                safe_tol = tol
                break
                
        adaptive_tols.append(safe_tol)
        
    print(f"Adaptive Tolerances (first 30): {adaptive_tols[:30]}")
    # Print statistics
    from collections import Counter
    print("Tolerance distribution:", Counter(adaptive_tols))

if __name__ == '__main__':
    test_adaptive_tolerance()
