#!/bin/bash

# Create output directory if it doesn't exist
mkdir -p ../../public/icons

# Array of sizes needed for PWA
declare -A sizes=(
  ["favicon-16x16"]=16
  ["favicon-32x32"]=32
  ["icon-72x72"]=72
  ["icon-96x96"]=96
  ["icon-128x128"]=128
  ["icon-144x144"]=144
  ["icon-152x152"]=152
  ["icon-192x192"]=192
  ["icon-384x384"]=384
  ["icon-512x512"]=512
)

# Generate regular icons
for name in "${!sizes[@]}"; do
  size="${sizes[$name]}"
  echo "Generating $name.png..."
  inkscape -w $size -h $size icon-base.svg -o "../../public/icons/$name.png"
done

# Generate maskable icons (with padding)
for size in 192 512; do
  echo "Generating maskable icon ${size}x${size}..."
  # For maskable icons, we'll use the same SVG but with a smaller viewbox
  inkscape -w $size -h $size icon-base.svg -o "../../public/icons/icon-${size}x${size}-maskable.png"
done

# Copy SVG favicon
cp icon-base.svg "../../public/icons/favicon.svg"

# Create apple touch icon (180x180)
inkscape -w 180 -h 180 icon-base.svg -o "../../public/icons/apple-touch-icon.png"

echo "Generated all icon sizes successfully!"
