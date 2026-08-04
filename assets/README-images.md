Image optimization notes

We created placeholder copies of the uploaded logo:
- assets/logo.png
- assets/logo@2x.png
- assets/og.png

Recommended ImageMagick commands to generate optimized assets (run locally):

# Create a WebP hero image (lossy, quality 80)
magick convert assets/hero.jpg -resize 1600x900 -quality 80 assets/hero.webp

# Create social OG image (1200x630)
magick convert assets/logo.png -background '#0D0D0D' -gravity center -extent 1200x630 -quality 90 assets/og-1200x630.jpg

# Create responsive sizes for logo
magick convert assets/logo.png -resize 600 assets/logo-600.png
magick convert assets/logo.png -resize 1200 assets/logo-1200.png
magick convert assets/logo.png -resize 2400 assets/logo-2400.png

Notes:
- Install ImageMagick (https://imagemagick.org) to run these commands.
- Use WebP for modern browsers and keep JPEG/PNG fallbacks for older clients.
- After generating optimized images, update src/srcset attributes in HTML accordingly.
