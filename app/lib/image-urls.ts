// Pure helpers — no Node.js imports, safe to use in client components.

export function parseImageUrls(imageUrls: string | null): string[] {
  if (!imageUrls) return [];
  try {
    const parsed = JSON.parse(imageUrls) as unknown;
    return Array.isArray(parsed)
      ? parsed.filter((u): u is string => typeof u === "string")
      : [];
  } catch {
    return [];
  }
}

export function stringifyImageUrls(urls: string[]): string {
  return JSON.stringify(urls);
}
