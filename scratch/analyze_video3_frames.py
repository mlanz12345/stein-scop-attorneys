import os
import subprocess
from PIL import Image, ImageChops, ImageStat

def analyze_frames():
    temp_dir = "public/temp_analyze"
    os.makedirs(temp_dir, exist_ok=True)
    
    # Export all frames of video3.mp4
    print("Exporting video3.mp4 frames...")
    subprocess.run([
        "ffmpeg", "-y", "-i", "public/video3.mp4",
        f"{temp_dir}/frame_%04d.png"
    ], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    
    frames = sorted([f for f in os.listdir(temp_dir) if f.endswith(".png")])
    num_frames = len(frames)
    print(f"Total frames exported: {num_frames}")
    
    if num_frames == 0:
        print("No frames found")
        return

    # Load first and last frames
    first_frame = Image.open(os.path.join(temp_dir, frames[0])).convert("L")
    last_frame = Image.open(os.path.join(temp_dir, frames[-1])).convert("L")
    
    # Check dimensions
    w, h = first_frame.size
    print(f"Dimensions: {w}x{h}")

    # Mirror the first frame
    first_mirrored = first_frame.transpose(Image.FLIP_LEFT_RIGHT)
    
    # Compare last frame with mirrored first frame
    diff = ImageChops.difference(last_frame, first_mirrored)
    stat = ImageStat.Stat(diff)
    print(f"Diff (last vs mirrored first): {stat.mean[0]:.2f}")
    
    # Let's find the best matching frame for the mirrored first frame
    best_diff = 9999
    best_idx = -1
    for i in range(num_frames):
        img_temp = Image.open(os.path.join(temp_dir, frames[i])).convert("L")
        diff_temp = ImageChops.difference(img_temp, first_mirrored)
        stat_temp = ImageStat.Stat(diff_temp)
        mean_diff = stat_temp.mean[0]
        if mean_diff < best_diff:
            best_diff = mean_diff
            best_idx = i
            
    print(f"Best matching frame for mirrored first frame is frame {best_idx+1} ({frames[best_idx]}) with diff {best_diff:.2f}")

    # Let's clean up
    for f in os.listdir(temp_dir):
        os.remove(os.path.join(temp_dir, f))
    os.rmdir(temp_dir)

if __name__ == '__main__':
    analyze_frames()
