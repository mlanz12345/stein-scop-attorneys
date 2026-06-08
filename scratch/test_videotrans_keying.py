import os
import subprocess
from PIL import Image, ImageDraw, ImageChops

def test_videotrans_keying():
    os.makedirs("scratch", exist_ok=True)
    temp_frame = "scratch/videotrans_frame_90.png"
    
    # Export frame 90 from videotrans.mp4
    subprocess.run([
        "ffmpeg", "-y", "-i", "videotrans.mp4",
        "-vf", "select=eq(n\\,90)",
        "-vframes", "1",
        temp_frame
    ], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    
    if not os.path.exists(temp_frame):
        print("Error: Failed to export frame 90")
        return
        
    img = Image.open(temp_frame).convert("RGB")
    
    # Crop bounds
    crop_x1 = 640 - 225
    crop_y1 = 360 - 225
    cw, ch = 450, 450
    cropped = img.crop((crop_x1, crop_y1, crop_x1 + cw, crop_y1 + ch))
    
    fill_color = (255, 0, 255)
    
    # Seeds for flood fill (dense borders to ensure we hit both white and gray squares on all sides)
    seeds = []
    for x in range(0, cw, 10):
        seeds.append((x, 0))
        seeds.append((x, ch - 1))
    for y in range(0, ch, 10):
        seeds.append((0, y))
        seeds.append((cw - 1, y))
        
    tolerances = [180, 220, 260]
    
    for tol in tolerances:
        ff_img = cropped.copy()
        for sx, sy in seeds:
            if ff_img.getpixel((sx, sy)) != fill_color:
                ImageDraw.floodfill(ff_img, (sx, sy), fill_color, thresh=tol)
                
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
        
        transparent = Image.new("RGBA", (cw, ch))
        transparent.paste(cropped, (0, 0), mask=mask)
        
        out_path = f"public/test_videotrans_F90_T{tol}.png"
        transparent.save(out_path)
        bbox = transparent.getbbox()
        print(f"Tolerance {tol:3d} -> Saved {out_path}, bbox={bbox}")
        
    # Clean up temp frame
    os.remove(temp_frame)

if __name__ == '__main__':
    test_videotrans_keying()
