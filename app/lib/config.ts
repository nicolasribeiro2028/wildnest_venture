/**
 * App config — see AGENTS.md.
 * Map: Mapbox GL JS when NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN is set;
 * otherwise fallback to static image.
 */
export const mapImagePath =
  process.env.NEXT_PUBLIC_MAP_IMAGE_PATH ?? "/assets/campus-map.png";

export const mapboxAccessToken =
  process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN ?? "";

/** Evanston campus center (Northwestern), shifted west for better framing */
export const mapCenter: [number, number] = [-87.682, 42.053];
export const mapZoom = 14;
export const mapStyle = "mapbox://styles/mapbox/light-v11";

/** Campus bounds for converting pin_x, pin_y (0–100%) to lat/lng */
export const campusBounds = {
  north: 42.058,
  south: 42.048,
  west: -87.685,
  east: -87.665,
} as const;

export function pinPercentToLatLng(
  pinX: number,
  pinY: number
): [number, number] {
  const { north, south, west, east } = campusBounds;
  const lng = west + (pinX / 100) * (east - west);
  const lat = north - (pinY / 100) * (north - south);
  return [lng, lat];
}

/** Reverse: convert lat/lng to pin_x, pin_y (0–100) for pin picker */
export function latLngToPinPercent(
  lat: number,
  lng: number
): [number, number] {
  const { north, south, west, east } = campusBounds;
  const pinX = ((lng - west) / (east - west)) * 100;
  const pinY = ((north - lat) / (north - south)) * 100;
  return [pinX, pinY];
}
