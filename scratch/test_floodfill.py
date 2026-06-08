import os
from PIL import Image, ImageDraw, ImageChops

def test_floodfill():
    img_path = 'public/original_160.png'
    if not os.path.exists(img_path):
        print(f"Error: {img_path} not found")
        return

    # Load original cropped frame
    img = Image.open(img_path).convert('RGB')
    w, h = img.size

    # Try different tolerance values for floodfill
    tolerances = [30, 45, 60, 75, 90, 105, 120]
    
    for tol in tolerances:
        # Create a copy for testing
        ff_mask = Image.new("L", (w, h), 255) # Start with all white (opaque)
        # We will floodfill the mask with 0 (transparent) starting from the corners
        # Since floodfill works on the image color, we can floodfill a copy of the RGB image first,
        # or we can floodfill the RGB image directly and see what gets painted.
        # Let's do it on the RGB image copy, painting filled areas red (255, 0, 0).
        ff_img = img.copy()
        
        # Corners to start floodfill from
        corners = [(0, 0), (w - 1, 0), (0, h - 1), (w - 1, h - 1)]
        
        # We need to paint a temporary color that is not in the image.
        # But wait, we can just flood fill a mask directly by comparing with the original image pixels!
        # PIL's floodfill doesn't let us pass a separate reference image. It checks the pixel value of the image being modified.
        # So if we change the pixel at (0, 0) to Red, the next floodfill from (w-1, 0) won't match the original corner color if they are connected.
        # To avoid this, we can perform floodfill on a copy of the original image, filling with a color like (255, 0, 255) (magenta).
        # Let's verify if magenta is in the original image. (Original image is grayscale/cream, so no magenta).
        fill_color = (255, 0, 255)
        
        for cx, cy in corners:
            # Check if this corner has already been filled
            if ff_img.getpixel((cx, cy)) != fill_color:
                ImageDraw.floodfill(ff_img, (cx, cy), fill_color, thresh=tol)
                
        # Now create the alpha channel: pixels that are fill_color become 0 (transparent), others become 255 (opaque)
        alpha_pixels = []
        for y in range(h):
            for x in range(w):
                p = ff_img.getpixel((x, y))
                if p == fill_color:
                    alpha_pixels.append(0)
                else:
                    alpha_pixels.append(255)
                    
        mask = Image.new("L", (w, h))
        mask.putdata(alpha_pixels)
        
        # Save the masked image
        result = Image.new("RGBA", (w, h))
        result.paste(img, (0, 0), mask=mask)
        
        # Let's check if there are holes inside the horse.
        # A hole is a transparent pixel (alpha == 0) that is inside the bounding box of the non-transparent pixels,
        # but wait, let's see if we can check if the center pixel of the horse is preserved.
        # The center of the horse is roughly around (w//2, h//2).
        center_alpha = mask.getpixel((w//2, h//2))
        
        # Find bbox
        bbox = result.getbbox()
        
        output_name = f"public/test_floodfill_tol_{tol}.png"
        result.save(output_name)
        print(f"Tolerance {tol:3d} -> Saved {output_name}, bbox={bbox}, center_alpha={center_alpha}")

if __name__ == '__main__':
    test_floodfill()
