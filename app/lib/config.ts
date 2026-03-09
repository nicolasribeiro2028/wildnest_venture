/**
 * App config — see AGENTS.md. Map image path is configurable; replace
 * public/assets/campus-map.png when the real map is provided.
 */
export const mapImagePath =
  process.env.NEXT_PUBLIC_MAP_IMAGE_PATH ?? "/assets/campus-map.png";
