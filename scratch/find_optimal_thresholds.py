import os
import subprocess
from PIL import Image

def find_optimal_thresholds():
    temp_dir = "public/temp_video3_test_frames"
    os.makedirs(temp_dir, exist_ok=True)
    
    # Export 5 representative frames (e.g. 1, 40, 80, 120, 160)
    selected_frames = [1, 40, 80, 120, 160, 190]
    print("Exporting representative frames...")
    for f_idx in selected_frames:
        subprocess.run([
            "ffmpeg", "-y", "-i", "public/video3.mp4",
            "-vf", f"select=eq(n\\,{f_idx})",
            "-vframes", "1",
            f"{temp_dir}/frame_{f_idx:04d}.png"
        ], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)

    # Let's test a range of thresholds and check for holes
    # We crop to center 450x450
    crop_x1 = 640 - 225
    crop_y1 = 360 - 225
    crop_x2 = 640 + 225
    crop_y2 = 360 + 225
    
    threshold_pairs = [
        (100, 125), # Previous
        (90, 115),
        (85, 110),
        (80, 105),
        (75, 100),
        (70, 95),
        (60, 90),
    ]

    for solid, trans in threshold_pairs:
        print(f"\nTesting thresholds: solid={solid}, trans={trans}")
        has_holes_any = False
        left_bounds = []
        
        for f_idx in selected_frames:
            img = Image.open(f"{temp_dir}/frame_{f_idx:04d}.png").convert("RGB")
            cropped = img.crop((crop_x1, crop_y1, crop_x2, crop_y2))
            
            w, h = cropped.size
            datas = cropped.getdata()
            
            alpha_data = []
            for item in datas:
                r, g, b = item
                avg = (r + g + b) // 3
                if avg >= trans:
                    alpha_data.append(0)
                elif avg <= solid:
                    alpha_data.append(255)
                else:
                    alpha = 255 - int((avg - solid) / (trans - solid) * 255)
                    alpha_data.append(alpha)
            
            # Find bounding box based on alpha
            img_rgba = Image.new("RGBA", cropped.size)
            # Reconstruct RGBA data for getbbox
            rgba_pixels = []
            for idx, item in enumerate(datas):
                rgba_pixels.append((item[0], item[1], item[2], alpha_data[idx]))
            img_rgba.putdata(rgba_pixels)
            
            bbox = img_rgba.getbbox()
            if bbox:
                left_bounds.append(bbox[0])
                
                # Check for holes inside the solid logo:
                # A hole is a pixel inside the bounding box that is transparent (alpha < 100)
                # but is surrounded by solid pixels (alpha > 200) on both sides in the same row.
                has_holes = False
                for y_coord in range(bbox[1] + 10, bbox[3] - 10):
                    row_alphas = [alpha_data[y_coord * w + x_coord] for x_coord in range(bbox[0], bbox[2])]
                    
                    # Find solid boundaries
                    first_solid = -1
                    last_solid = -1
                    for idx, a in enumerate(row_alphas):
                        if a > 200:
                            if first_solid == -1:
                                first_solid = idx
                            last_solid = idx
                            
                    if first_solid != -1 and last_solid != -1:
                        # Check if there are transparent pixels inside the solid boundaries
                        for a in row_alphas[first_solid:last_solid]:
                            if a < 100:
                                has_holes = True
                                break
                    if has_holes:
                        break
                        
                if has_holes:
                    has_holes_any = True
                    
        print(f"  Holes detected: {has_holes_any}")
        print(f"  Left bounds (smaller means shadow remains): {left_bounds}")
        
    # Cleanup temp
    for f in os.listdir(temp_dir):
        os.remove(os.path.join(temp_dir, f))
    os.rmdir(temp_dir)

find_optimal_thresholds()
