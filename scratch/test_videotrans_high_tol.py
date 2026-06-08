import os
import subprocess
from PIL import Image, ImageDraw

def test_videotrans_high_tol():
    os.makedirs("scratch", exist_ok=True)
    temp_frame = "scratch/videotrans_frame_90.png"
    
    # Export frame 90
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
    crop_x1 = 640 - 225
    crop_y1 = 360 - 225
    cw, ch = 450, 450
    cropped = img.crop((crop_x1, crop_y1, crop_x1 + cw, crop_y1 + ch))
    
    fill_color = (255, 0, 255)
    
    # Seeds for flood fill (corners and side midpoints)
    seeds = [
        (0, 0), (cw - 1, 0), (0, ch - 1), (cw - 1, ch - 1),
        (cw // 2, 0), (cw // 2, ch - 1), (0, ch // 2), (cw - 1, ch // 2)
    ]
    
    tolerances = [280, 310, 340, 370]
    
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
        
        out_path = f"public/test_videotrans_high_F90_T{tol}.png"
        transparent.save(out_path)
        bbox = transparent.getbbox()
        print(f"Tolerance {tol:3d} -> Saved {out_path}, bbox={bbox}")
        
    os.remove(temp_frame)

if __name__ == '__main__':
    test_videotrans_high_tol()
