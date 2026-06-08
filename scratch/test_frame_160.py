import os
import subprocess
from PIL import Image

def test_frame_160():
    temp_dir = "public/temp_frame_160"
    os.makedirs(temp_dir, exist_ok=True)
    
    # Export frame 160
    subprocess.run([
        "ffmpeg", "-y", "-i", "public/video3.mp4",
        "-vf", "select=eq(n\\,160)",
        "-vframes", "1",
        f"{temp_dir}/frame_0160.png"
    ], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    
    img = Image.open(f"{temp_dir}/frame_0160.png").convert("RGB")
    
    # Crop to center 450x450
    crop_x1 = 640 - 225
    crop_y1 = 360 - 225
    crop_x2 = 640 + 225
    crop_y2 = 360 + 225
    cropped = img.crop((crop_x1, crop_y1, crop_x2, crop_y2))
    
    thresholds = [
        (80, 100, "T1"),
        (70, 90, "T2"),
        (55, 75, "T3")
    ]
    
    for solid, trans, name in thresholds:
        datas = cropped.getdata()
        newData = []
        for item in datas:
            r, g, b = item
            avg = (r + g + b) // 3
            
            if avg >= trans:
                newData.append((0, 0, 0, 0))
            elif avg <= solid:
                newData.append((r, g, b, 255))
            else:
                alpha = 255 - int((avg - solid) / (trans - solid) * 255)
                factor = alpha / 255.0
                nr = int(r * factor)
                ng = int(g * factor)
                nb = int(b * factor)
                newData.append((nr, ng, nb, alpha))
                
        img_rgba = Image.new("RGBA", cropped.size)
        img_rgba.putdata(newData)
        
        # Crop to bbox
        bbox = img_rgba.getbbox()
        if bbox:
            final_img = img_rgba.crop(bbox)
            final_img.save(f"public/test_160_{name}.png")
            print(f"Saved {name} (solid={solid}, trans={trans}), bbox={bbox}")
            
    # Clean up
    os.remove(f"{temp_dir}/frame_0160.png")
    os.rmdir(temp_dir)

test_frame_160()
