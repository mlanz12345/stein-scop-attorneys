import os
import subprocess
from PIL import Image, ImageDraw

def make_grid():
    temp_dir = "public/temp_grid"
    os.makedirs(temp_dir, exist_ok=True)
    
    # Export 12 representative frames
    indices = [1, 18, 36, 54, 72, 90, 108, 126, 144, 162, 180, 192]
    for idx in indices:
        subprocess.run([
            "ffmpeg", "-y", "-i", "public/video3.mp4",
            "-vf", f"select=eq(n\\,{idx-1})",
            "-vframes", "1",
            f"{temp_dir}/frame_{idx:03d}.png"
        ], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
        
    # Crop them to center 450x450 and resize to 150x150
    crop_x1 = 640 - 225
    crop_y1 = 360 - 225
    crop_x2 = 640 + 225
    crop_y2 = 360 + 225
    
    thumb_size = 150
    grid_img = Image.new("RGB", (thumb_size * 4, thumb_size * 3), (255, 255, 255))
    
    for i, idx in enumerate(indices):
        frame_path = f"{temp_dir}/frame_{idx:03d}.png"
        if os.path.exists(frame_path):
            img = Image.open(frame_path)
            cropped = img.crop((crop_x1, crop_y1, crop_x2, crop_y2))
            resized = cropped.resize((thumb_size, thumb_size))
            
            # Draw frame index on image
            draw = ImageDraw.Draw(resized)
            draw.text((5, 5), f"F{idx}", fill=(255, 0, 0))
            
            x = (i % 4) * thumb_size
            y = (i // 4) * thumb_size
            grid_img.paste(resized, (x, y))
            
    grid_img.save("public/grid_video3_debug.png")
    print("Saved public/grid_video3_debug.png")
    
    # Clean up
    for f in os.listdir(temp_dir):
        os.remove(os.path.join(temp_dir, f))
    os.rmdir(temp_dir)

if __name__ == '__main__':
    make_grid()
