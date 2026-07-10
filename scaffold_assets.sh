#!/bin/bash
cd "/Users/saikoushik/Desktop/moto 2/public" || exit 1
mkdir -p assets

# Define lists
CAR_BRANDS=("hyundai" "tata" "mahindra" "toyota" "honda" "kia" "maruti" "bmw" "audi" "mercedes" "volkswagen" "skoda")
BIKE_BRANDS=("hero" "honda" "tvs" "yamaha" "ktm" "royal-enfield" "bajaj" "suzuki")
SERVICES=("car-wash" "bike-wash" "mechanic" "towing" "battery" "tyre" "garage" "emergency")
ROOT_DIRS=("offers" "providers" "banners" "icons" "logo")

create_asset_dir() {
  local dir=$1
  local desc=$2
  local p_name=$3
  local p_text=$4
  
  mkdir -p "$dir"
  echo "# $desc" > "$dir/README.md"
  echo "Place static assets for this category here." >> "$dir/README.md"
  
  if [ -n "$p_name" ]; then
    cat <<SVGEOF > "$dir/$p_name"
<svg width="400" height="300" xmlns="http://www.w3.org/2000/svg">
  <rect width="400" height="300" fill="#f5f5f5"/>
  <text x="200" y="150" font-family="Inter, sans-serif" font-size="20" font-weight="bold" fill="#7B7B7B" text-anchor="middle" dominant-baseline="middle">$p_text</text>
</svg>
SVGEOF
  fi
}

# Brands
for b in "${CAR_BRANDS[@]}"; do
  create_asset_dir "assets/brands/cars/$b" "Car Brand: $b" "logo.svg" "$b logo"
done
for b in "${BIKE_BRANDS[@]}"; do
  create_asset_dir "assets/brands/bikes/$b" "Bike Brand: $b" "logo.svg" "$b logo"
done

# Vehicles
for b in "${CAR_BRANDS[@]}"; do
  create_asset_dir "assets/vehicles/cars/$b" "Car Models for $b" "placeholder.svg" "$b car"
done
for b in "${BIKE_BRANDS[@]}"; do
  create_asset_dir "assets/vehicles/bikes/$b" "Bike Models for $b" "placeholder.svg" "$b bike"
done

# Services
for s in "${SERVICES[@]}"; do
  create_asset_dir "assets/services/$s" "Service: $s" "image.svg" "$s"
done

# Root dirs
for d in "${ROOT_DIRS[@]}"; do
  create_asset_dir "assets/$d" "Assets for $d" "placeholder.svg" "$d"
done

echo "# MotoMate Assets" > assets/README.md
echo "All static images and icons." >> assets/README.md
echo "Done!"
