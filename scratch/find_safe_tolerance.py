import os
import subprocess
from PIL import Image, ImageDraw

def find_optimal_safe_tolerance():
    temp_dir = "public/temp_leak_test"
    os.makedirs(temp_dir, exist_ok=True)
    
    # Export all frames of video3.mp4 if they don't exist
    frames = sorted([f for f in os.listdir(temp_dir) if f.endswith(".png")])
    if len(frames) != 192:
        print("Exporting video3.mp4 frames...")
        subprocess.run([
            "ffmpeg", "-y", "-i", "public/video3.mp4",
            f"{temp_dir}/frame_%04d.png"
        ], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
        frames = sorted([f for f in os.listdir(temp_dir) if f.endswith(".png")])
        
    w, h = Image.open(os.path.join(temp_dir, frames[0])).size
    # Crop center 450x450
    crop_x1 = 640 - 225
    crop_y1 = 360 - 225
    crop_x2 = 640 + 225
    crop_y2 = 360 + 225
    cw, ch = 450, 450
    
    fill_color = (255, 0, 255)
    corners = [(0, 0), (cw - 1, 0), (0, ch - 1), (cw - 1, ch - 1)]
    
    # We test tolerances from 80 to 150
    for tolerance in range(80, 151, 5):
        leaked_frames = []
        for idx, f in enumerate(frames):
            img_path = os.path.join(temp_dir, f)
            img = Image.open(img_path).convert("RGB")
            cropped = img.crop((crop_x1, crop_y1, crop_x2, crop_y2))
            
            ff_img = cropped.copy()
            for cx, cy in corners:
                if ff_img.getpixel((cx, cy)) != fill_color:
                    ImageDraw.floodfill(ff_img, (cx, cy), fill_color, thresh=tolerance)
            
            # Check center region 50x50
            cx, cy = cw // 2, ch // 2
            has_leak = False
            for y in range(cy - 25, cy + 25):
                for x in range(cx - 25, cx + 25):
                    if ff_img.getpixel((x, y)) == fill_color:
                        has_leak = True
                        break
                if has_leak:
                    break
            if has_leak:
                leaked_frames.append(idx + 1)
                
        print(f"Tolerance {tolerance:3d} -> Leaks in {len(leaked_frames)} frames: {leaked_frames[:10]}")
        if not leaked_frames:
            print(f"==> TOLERANCE {tolerance} IS 100% LEAK-FREE!")
            
    # Clean up
    for f in os.listdir(temp_dir):
        os.remove(os.path.join(temp_dir, f))
    os.rmdir(temp_dir)

if __name__ == '__main__':
    find_optimal_safe_tolerance()
