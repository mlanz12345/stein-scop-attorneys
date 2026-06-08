import os
from PIL import Image, ImageDraw

def test_border_floodfill():
    img_path = "public/temp_leak_test_fast/frame_0192.png"
    if not os.path.exists(img_path):
        print(f"Error: {img_path} not found")
        return
        
    img = Image.open(img_path).convert("RGB")
    
    crop_x1 = 640 - 225
    crop_y1 = 360 - 225
    cw, ch = 450, 450
    cropped = img.crop((crop_x1, crop_y1, crop_x1 + cw, crop_y1 + ch))
    
    # Let's do flood fill from the borders
    ff_img = cropped.copy()
    fill_color = (255, 0, 255)
    
    # Generate seed points along all four edges
    seeds = []
    for x in range(0, cw, 10):
        seeds.append((x, 0))
        seeds.append((x, ch - 1))
    for y in range(0, ch, 10):
        seeds.append((0, y))
        seeds.append((cw - 1, y))
        
    # Apply flood fill from each seed
    tolerance = 240
    for sx, sy in seeds:
        if ff_img.getpixel((sx, sy)) != fill_color:
            ImageDraw.floodfill(ff_img, (sx, sy), fill_color, thresh=tolerance)
            
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
    
    # Save output
    out_path = "public/test_visual_F192_border.png"
    transparent.save(out_path)
    
    bbox = transparent.getbbox()
    print(f"Saved {out_path}, bbox={bbox}")

if __name__ == '__main__':
    test_border_floodfill()
