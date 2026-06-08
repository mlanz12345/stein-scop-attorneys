import os
import subprocess
from PIL import Image, ImageDraw

def test_all_frames_t310():
    temp_dir = "public/temp_leak_test_t310"
    os.makedirs(temp_dir, exist_ok=True)
    
    # Export frames if needed
    frames = sorted([f for f in os.listdir(temp_dir) if f.endswith(".png")])
    if len(frames) != 192:
        print("Exporting videotrans.mp4 frames...")
        subprocess.run([
            "ffmpeg", "-y", "-i", "videotrans.mp4",
            f"{temp_dir}/frame_%04d.png"
        ], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
        frames = sorted([f for f in os.listdir(temp_dir) if f.endswith(".png")])
        
    w, h = Image.open(os.path.join(temp_dir, frames[0])).size
    crop_x1 = 640 - 225
    crop_y1 = 360 - 225
    cw, ch = 450, 450
    
    fill_color = (255, 0, 255)
    seeds = [
        (0, 0), (cw - 1, 0), (0, ch - 1), (cw - 1, ch - 1),
        (cw // 2, 0), (cw // 2, ch - 1), (0, ch // 2), (cw - 1, ch // 2)
    ]
    
    tolerance = 310
    leaked_frames = []
    
    print(f"Testing all 192 frames at tolerance {tolerance}...")
    for idx, f in enumerate(frames):
        img_path = os.path.join(temp_dir, f)
        img = Image.open(img_path).convert("RGB")
        cropped = img.crop((crop_x1, crop_y1, crop_x1 + cw, crop_y1 + ch))
        
        ff_img = cropped.copy()
        for sx, sy in seeds:
            if ff_img.getpixel((sx, sy)) != fill_color:
                ImageDraw.floodfill(ff_img, (sx, sy), fill_color, thresh=tolerance)
                
        # Check if it leaked.
        # A leak means that a large part of the horse becomes transparent.
        # If it leaks, the bounding box will shrink massively, or the center region will be filled.
        # Wait, does the horse naturally have hollows?
        # To detect actual leaks, we can check if the bounding box width is less than 50, or height is less than 50,
        # or if the number of filled pixels is extremely high (e.g. > 180,000 pixels).
        # Let's count the number of transparent pixels.
        # Since cw*ch = 202,500, a normal crop of the logo leaves about 120,000 to 140,000 background pixels.
        # If it leaks, the number of transparent pixels will jump to > 170,000.
        transparent_count = sum(1 for y in range(ch) for x in range(cw) if ff_img.getpixel((x, y)) == fill_color)
        
        if transparent_count > 175000:
            leaked_frames.append(idx + 1)
            
    if leaked_frames:
        print(f"Warning: Leaks detected at tolerance {tolerance} in frames: {leaked_frames}")
    else:
        print(f"Success: Tolerance {tolerance} is 100% LEAK-FREE across all 192 frames!")
        
    # Clean up
    for f in os.listdir(temp_dir):
        os.remove(os.path.join(temp_dir, f))
    os.rmdir(temp_dir)

if __name__ == '__main__':
    test_all_frames_t310()
