import { writeFile, mkdir } from "fs/promises";
import path from "path";
export { parseImageUrls, stringifyImageUrls } from "./image-urls";

const UPLOAD_DIR = "public/uploads";
const MAX_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];
const MAX_IMAGES = 5;

export async function saveListingImages(
  files: File[],
  listingId: string
): Promise<string[]> {
  const valid = files.filter(
    (f) => f.size > 0 && f.size <= MAX_SIZE && ALLOWED_TYPES.includes(f.type)
  );
  if (valid.length === 0) return [];
  const toSave = valid.slice(0, MAX_IMAGES);

  const dir = path.join(process.cwd(), UPLOAD_DIR, listingId);
  await mkdir(dir, { recursive: true });

  const urls: string[] = [];
  for (let i = 0; i < toSave.length; i++) {
    const file = toSave[i];
    const ext = file.name.split(".").pop() || "jpg";
    const safeName = `${Date.now()}-${i}.${ext}`;
    const filePath = path.join(dir, safeName);
    const buffer = Buffer.from(await file.arrayBuffer());
    await writeFile(filePath, buffer);
    urls.push(`/uploads/${listingId}/${safeName}`);
  }
  return urls;
}
