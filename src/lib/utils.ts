import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function stringToColor(str: string) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }

  // Generate distinct HSL color
  // Hue: based on hash
  // Saturation: 60-80% for vibrancy
  // Lightness: 40-60% for readability
  const h = Math.abs(hash % 360);
  const s = 65 + (Math.abs(hash) % 20);
  const l = 45 + (Math.abs(hash) % 20);

  return `hsl(${h}, ${s}%, ${l}%)`;
}

export function getContrastColor(hexColor: string) {
  // robust contrast check is complex, for HSL above we can just assume light text for the range we picked (45-65% lightness might be tricky, let's aim for darker backgrounds)
  // Adjusted L to 35-55%
  return "#ffffff";
}
