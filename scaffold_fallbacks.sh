#!/bin/bash
cd "/Users/saikoushik/Desktop/moto 2/public/assets/vehicles/cars" || exit 1
cat <<SVGEOF > "placeholder.svg"
<svg width="400" height="300" xmlns="http://www.w3.org/2000/svg">
  <rect width="400" height="300" fill="#f5f5f5"/>
  <text x="200" y="150" font-family="Inter, sans-serif" font-size="20" font-weight="bold" fill="#7B7B7B" text-anchor="middle" dominant-baseline="middle">car placeholder</text>
</svg>
SVGEOF

cd "/Users/saikoushik/Desktop/moto 2/public/assets/vehicles/bikes" || exit 1
cat <<SVGEOF > "placeholder.svg"
<svg width="400" height="300" xmlns="http://www.w3.org/2000/svg">
  <rect width="400" height="300" fill="#f5f5f5"/>
  <text x="200" y="150" font-family="Inter, sans-serif" font-size="20" font-weight="bold" fill="#7B7B7B" text-anchor="middle" dominant-baseline="middle">bike placeholder</text>
</svg>
SVGEOF
