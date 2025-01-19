#!/bin/bash

# Create output directory if it doesn't exist
mkdir -p ../../public/icons

# Array of sizes needed for PWA
sizes=(72 96 128 144 152 192 384 512)

# Generate PNGs for each size
for size in "${sizes[@]}"; do
    inkscape -w $size -h $size icon-base.svg -o "../../public/icons/icon-${size}x${size}.png"
done

echo "Generated all icon sizes successfully!"
