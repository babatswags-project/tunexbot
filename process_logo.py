from PIL import Image
import os

def process_logo(input_path, output_path):
    # Ensure directory exists
    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    
    img = Image.open(input_path).convert("RGBA")
    
    # Create an alpha channel based on maximum RGB value (lightness)
    alpha = img.convert("L")
    
    # Boost contrast of alpha slightly
    alpha = alpha.point(lambda p: min(255, int(p * 1.5)))
    
    img.putalpha(alpha)
    
    # Scale down the logo so it's not gigantic (approx 512x512)
    img.thumbnail((512, 512), Image.Resampling.LANCZOS)
    
    img.save(output_path, "PNG")
    print(f"Saved {output_path}")

process_logo(r"C:\Users\TuNeX\.gemini\antigravity\brain\8afafeb6-11b3-4b4e-b753-19526151fdee\tunexbot_gear_logo_1771626012720.png", r"c:\Users\TuNeX\Desktop\tunexbot\src\assets\logo.png")
