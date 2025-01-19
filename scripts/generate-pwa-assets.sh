#!/bin/bash

# Create icons directory if it doesn't exist
mkdir -p public/icons
mkdir -p public/splash

# Generate regular icons
sizes=(72 96 128 144 152 192 384 512)
for size in "${sizes[@]}"; do
    convert public/icons/icon-base.svg -resize ${size}x${size} public/icons/icon-${size}x${size}.png
done

# Generate maskable icon with safe area (ensure icon is within the inner 80% of the space)
convert public/icons/icon-base.svg -resize 640x640 -gravity center -background "#0A0A0F" -extent 512x512 public/icons/maskable-icon-512x512.png

# Generate feature icons
convert public/icons/icon-base.svg -resize 96x96 public/icons/features-96x96.png
convert public/icons/icon-base.svg -resize 96x96 public/icons/docs-96x96.png

# Generate splash screens
# iPhone X and newer
convert public/icons/icon-base.svg -resize 400x400 -background "#0A0A0F" -gravity center -extent 1125x2436 public/splash/splash-iphonex.png

# iPad
convert public/icons/icon-base.svg -resize 400x400 -background "#0A0A0F" -gravity center -extent 1668x2224 public/splash/splash-ipad.png

# Desktop
convert public/icons/icon-base.svg -resize 400x400 -background "#0A0A0F" -gravity center -extent 1920x1080 public/splash/home-screen.png

# Features screen with modified color scheme
convert public/icons/icon-base.svg -resize 400x400 -background "#0A0A0F" -gravity center -extent 1125x2436 public/splash/features-screen.png

echo "PWA assets generated successfully!"
