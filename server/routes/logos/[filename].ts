import { getStoredSVG } from "~~/server/utils/getSVGs";

const FILENAME_REGEX = /^[a-zA-Z0-9_.-]+\.svg$/;

const normalizeHexColor = (color: unknown): string | null => {
  if (!color) return null;
  const raw = Array.isArray(color) ? color[0] : color;
  if (typeof raw !== "string") return null;

  let hex = raw.replace(/^#/, "").trim().toLowerCase();
  if (/^[0-9a-f]{3}$/.test(hex)) {
    if (hex[0] && hex[1] && hex[2]) {
      hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }
  }
  return /^[0-9a-f]{6}$/.test(hex) ? hex : null;
};

export default defineCachedEventHandler(
  async (event) => {
    const filename = getRouterParam(event, "filename");
    if (
      !filename ||
      !FILENAME_REGEX.test(filename) ||
      filename.includes("..")
    ) {
      throw createError({
        statusCode: 400,
        statusMessage: "Invalid or missing SVG filename.",
      });
    }

    const svgContent = await getStoredSVG(filename);
    if (!svgContent) {
      throw createError({
        statusCode: 404,
        statusMessage: `SVG logo "${filename}" not found.`,
      });
    }

    const hex = normalizeHexColor(getQuery(event).color);
    const result = hex
      ? svgContent.replace(/#[0-9a-fA-F]{6}\b/gi, `#${hex}`)
      : svgContent;

    setHeader(event, "Content-Type", "image/svg+xml; charset=utf-8");
    setHeader(
      event,
      "Cache-Control",
      "public, max-age=31536000, s-maxage=31536000, immutable",
    );

    return result;
  },
  {
    maxAge: 60 * 60 * 24 * 30, // 30 days
    staleMaxAge: 60 * 60 * 24 * 365, // 1 year
    getKey: (event) => {
      const filename = getRouterParam(event, "filename") || "";
      const color = normalizeHexColor(getQuery(event).color) || "default";
      return `logos:${filename}:${color}`;
    },
  },
);
