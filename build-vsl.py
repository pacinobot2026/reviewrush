"""
VSL Video Builder - Following the skill spec exactly
- Black background, white text (yellow for emphasis)
- Auto-fit font sizes based on word count
- Word-level timestamp sync
- Punchy pacing
"""

import json
import os
import subprocess
from PIL import Image, ImageDraw, ImageFont

# Config
WIDTH = 1920
HEIGHT = 1080
BG_COLOR = (26, 26, 46)  # Dark navy/black
TEXT_COLOR = (255, 255, 255)  # White
EMPHASIS_COLOR = (255, 215, 0)  # Yellow/gold
OUTPUT_DIR = "reviewrush/slides"
AUDIO_PATH = "reviewrush/vsl-audio.mp3"
JSON_PATH = "reviewrush/whisper-output/vsl-audio.json"

# Emphasis words/phrases to highlight in yellow
EMPHASIS_WORDS = {
    'ask', '147', 'reviews', '88%', 'automatic', 'reviewrush', 'review rush',
    '$47', '47', 'lose', 'win', 'best', 'proven', 'done', 'instant'
}

# Try to load a nice font, fallback to default
def get_font(size):
    font_paths = [
        "C:/Windows/Fonts/arial.ttf",
        "C:/Windows/Fonts/segoeui.ttf",
        "C:/Windows/Fonts/calibri.ttf",
    ]
    for path in font_paths:
        if os.path.exists(path):
            return ImageFont.truetype(path, size)
    return ImageFont.load_default()

def get_font_size(word_count):
    """Auto-fit font size based on word count per skill spec"""
    if word_count <= 4:
        return 120  # HUGE
    elif word_count <= 8:
        return 90   # LARGE
    elif word_count <= 14:
        return 65   # MEDIUM
    else:
        return 50   # SMALL (shouldn't happen if we split properly)

def should_emphasize(word):
    """Check if word should be yellow"""
    clean = word.lower().strip('.,!?')
    return clean in EMPHASIS_WORDS or any(e in clean for e in ['$', '%'])

def create_slide(text, slide_num, word_count):
    """Create a slide image with proper styling"""
    img = Image.new('RGB', (WIDTH, HEIGHT), BG_COLOR)
    draw = ImageDraw.Draw(img)
    
    font_size = get_font_size(word_count)
    font = get_font(font_size)
    
    # Clean text
    text = text.strip()
    
    # Calculate text size and position (centered)
    words = text.split()
    
    # For simple centering, just draw the whole text
    # Get text bounding box
    bbox = draw.textbbox((0, 0), text, font=font)
    text_width = bbox[2] - bbox[0]
    text_height = bbox[3] - bbox[1]
    
    # If text is too wide, reduce font size
    max_width = WIDTH - 200  # Margin
    while text_width > max_width and font_size > 30:
        font_size -= 5
        font = get_font(font_size)
        bbox = draw.textbbox((0, 0), text, font=font)
        text_width = bbox[2] - bbox[0]
        text_height = bbox[3] - bbox[1]
    
    x = (WIDTH - text_width) // 2
    y = (HEIGHT - text_height) // 2
    
    # Check if any word needs emphasis
    has_emphasis = any(should_emphasize(w) for w in words)
    
    if has_emphasis and len(words) > 1:
        # Draw word by word with colors
        current_x = x
        for word in words:
            color = EMPHASIS_COLOR if should_emphasize(word) else TEXT_COLOR
            draw.text((current_x, y), word + " ", font=font, fill=color)
            word_bbox = draw.textbbox((0, 0), word + " ", font=font)
            current_x += word_bbox[2] - word_bbox[0]
    else:
        # Draw all white or all yellow if emphasis word
        color = EMPHASIS_COLOR if (len(words) <= 3 and has_emphasis) else TEXT_COLOR
        draw.text((x, y), text, font=font, fill=color)
    
    # Save
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    filepath = f"{OUTPUT_DIR}/slide_{slide_num:04d}.png"
    img.save(filepath, 'PNG')
    return filepath

def build_slides_from_json():
    """Parse Whisper JSON and build slides with proper timing"""
    with open(JSON_PATH, 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    slides = []
    slide_num = 0
    
    for segment in data['segments']:
        text = segment['text'].strip()
        words = segment.get('words', [])
        
        if not text or not words:
            continue
        
        # Split long segments into smaller slides (4-8 words target)
        word_texts = [w['word'].strip() for w in words]
        word_count = len(word_texts)
        
        if word_count <= 8:
            # Use segment as-is
            start_time = words[0]['start']
            end_time = words[-1]['end']
            
            slide_num += 1
            slide_path = create_slide(text, slide_num, word_count)
            slides.append({
                'index': slide_num,
                'text': text,
                'start': start_time,
                'end': end_time,
                'duration': end_time - start_time,
                'path': slide_path,
                'word_count': word_count
            })
        else:
            # Split into chunks of ~6 words
            chunk_size = 6
            for i in range(0, word_count, chunk_size):
                chunk_words = words[i:i+chunk_size]
                if not chunk_words:
                    continue
                
                chunk_text = ' '.join(w['word'].strip() for w in chunk_words)
                start_time = chunk_words[0]['start']
                end_time = chunk_words[-1]['end']
                
                slide_num += 1
                slide_path = create_slide(chunk_text, slide_num, len(chunk_words))
                slides.append({
                    'index': slide_num,
                    'text': chunk_text,
                    'start': start_time,
                    'end': end_time,
                    'duration': end_time - start_time,
                    'path': slide_path,
                    'word_count': len(chunk_words)
                })
    
    return slides

def build_video(slides):
    """Build video with FFmpeg using exact slide timings"""
    
    # Build FFmpeg input and filter complex
    inputs = []
    filter_parts = []
    
    for i, slide in enumerate(slides):
        duration = max(slide['duration'], 0.5)  # Minimum 0.5s
        inputs.extend(['-loop', '1', '-t', str(duration), '-i', slide['path']])
        filter_parts.append(f'[{i}:v]')
    
    # Add audio input
    audio_idx = len(slides)
    inputs.extend(['-i', AUDIO_PATH])
    
    # Build concat filter
    concat_filter = ''.join(filter_parts) + f'concat=n={len(slides)}:v=1:a=0[v]'
    
    output_path = 'reviewrush/vsl-final.mp4'
    
    cmd = [
        'ffmpeg', '-y',
        *inputs,
        '-filter_complex', concat_filter,
        '-map', '[v]',
        '-map', f'{audio_idx}:a',
        '-c:v', 'libx264',
        '-c:a', 'aac',
        '-b:a', '192k',
        '-shortest',
        '-pix_fmt', 'yuv420p',
        output_path
    ]
    
    print(f"Building video with {len(slides)} slides...")
    print(f"Command: {' '.join(cmd[:20])}...")
    
    result = subprocess.run(cmd, capture_output=True, text=True)
    
    if result.returncode != 0:
        print(f"FFmpeg error: {result.stderr}")
        return None
    
    print(f"Video created: {output_path}")
    return output_path

def main():
    print("Building VSL slides from Whisper timestamps...")
    slides = build_slides_from_json()
    print(f"Created {len(slides)} slides")
    
    # Save slides.json for reference
    with open('reviewrush/slides.json', 'w') as f:
        json.dump({'slides': slides, 'total_slides': len(slides)}, f, indent=2)
    
    print("Building video...")
    output = build_video(slides)
    
    if output:
        print(f"SUCCESS: {output}")
    else:
        print("FAILED to build video")

if __name__ == '__main__':
    main()
