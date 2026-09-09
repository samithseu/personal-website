export const getStoredSVG = async (
  filename: string
): Promise<string | null> => {
  // Read directly from Nitro storage (embedded into the server bundle at build time)
  try {
    const fromSvg = await useStorage("assets:svg").getItem<string>(filename);
    if (fromSvg) return fromSvg;
  } catch {
    // Ignore storage lookup error and try fallback
  }

  try {
    const fromServer = await useStorage("assets:server").getItem<string>(
      `svg/${filename}`
    );
    if (fromServer) return fromServer;
  } catch {
    // Ignore storage lookup error
  }

  return null;
};

// Backwards-compatibility alias
export const getSVG = getStoredSVG;

