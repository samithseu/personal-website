const toUtf8String = (data: unknown): string | null => {
  if (!data) return null;
  if (typeof data === "string") return data;
  if (data instanceof Uint8Array || ArrayBuffer.isView(data)) {
    return new TextDecoder().decode(data);
  }
  return String(data);
};

export const getStoredSVG = async (
  filename: string
): Promise<string | null> => {
  // Read directly from Nitro storage (embedded into the server bundle at build time)
  try {
    const fromSvg = await useStorage("assets:svg").getItem(filename);
    const text = toUtf8String(fromSvg);
    if (text) return text;
  } catch {
    // Ignore storage lookup error and try fallback
  }

  try {
    const fromServer = await useStorage("assets:server").getItem(
      `svg/${filename}`
    );
    const text = toUtf8String(fromServer);
    if (text) return text;
  } catch {
    // Ignore storage lookup error
  }

  return null;
};

// Backwards-compatibility alias
export const getSVG = getStoredSVG;

