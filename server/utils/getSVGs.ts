const toUtf8String = (data: unknown): string | null => {
  if (!data) return null;
  if (typeof data === "string") return data;
  if (data instanceof Uint8Array || ArrayBuffer.isView(data)) {
    return new TextDecoder().decode(data);
  }
  return String(data);
};

const svgCache = new Map<string, string>();

export const getStoredSVG = async (
  filename: string,
): Promise<string | null> => {
  const cached = svgCache.get(filename);
  if (cached) return cached;

  // read directly from nitro storage
  try {
    const fromSvg = await useStorage("assets:svg").getItem(filename);
    const text = toUtf8String(fromSvg);
    if (text) {
      svgCache.set(filename, text);
      return text;
    }
  } catch {
    // Ignore storage lookup error and try fallback
  }

  try {
    const fromServer = await useStorage("assets:server").getItem(
      `svg/${filename}`,
    );
    const text = toUtf8String(fromServer);
    if (text) {
      svgCache.set(filename, text);
      return text;
    }
  } catch {
    // Ignore storage lookup error
  }

  return null;
};

// Backwards-compatibility alias
export const getSVG = getStoredSVG;
