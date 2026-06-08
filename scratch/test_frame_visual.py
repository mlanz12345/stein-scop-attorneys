import os
from PIL import Image, ImageDraw

def test_frame_visual():
    temp_dir = "public/temp_leak_test_fast"
    if not os.path.exists(temp_dir):
        temp_dir = "public/temp_leak_test"
    
    # Let's verify frame 60 and 192
    frames_to_test = [60, 192]
    tolerances = [100, 120, 140]
    
    # Crop bounds
    crop_x1 = 640 - 225
    crop_y1 = 360 - 225
    crop_x2 = 640 + 225
    crop_y2 = 360 + 225
    cw, ch = 450, 450
    
    fill_color = (255, 0, 255)
    corners = [(0, 0), (cw - 1, 0), (0, ch - 1), (cw - 1, ch - 1)]
    
    for f_idx in frames_to_test:
        frame_file = f"frame_{f_idx:04d}.png"
        img_path = os.path.join(temp_dir, frame_file)
        if not os.path.exists(img_path):
            print(f"Error: {img_path} not found")
            continue
            
        img = Image.open(img_path).convert("RGB")
        cropped = img.crop((crop_x1, crop_y1, crop_x2, crop_y2))
        
        for tol in tolerances:
            ff_img = cropped.copy()
            for cx, cy in corners:
                if ff_img.getpixel((cx, cy)) != fill_color:
                    ImageDraw.floodfill(ff_img, (cx, cy), fill_color, thresh=tol)
            
            # Create mask: 0 for magenta, 255 otherwise
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
            
            # Output transparent image
            transparent = Image.new("RGBA", (cw, ch))
            transparent.paste(cropped, (0, 0), mask=mask)
            
            # Save it
            out_path = f"public/test_visual_F{f_idx}_T{tol}.png"
            transparent.save(out_path)
            
            # Calculate bbox
            bbox = transparent.getbbox()
            print(f"Frame {f_idx:3d}, Tol {tol:3d} -> Saved {out_path}, bbox={bbox}")

if __name__ == '__main__':
    test_frame_visual()
