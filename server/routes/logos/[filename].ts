import { getStoredSVG } from "~~/server/utils/getSVGs";

const VALID_HEX_REGEX = /^[0-9a-fA-F]{6}$/;
const FILENAME_REGEX = /^[a-zA-Z0-9_.-]+\.svg$/;

export default defineCachedEventHandler(
  async (event) => {
    const filename = getRouterParam(event, "filename");
    if (!filename || !FILENAME_REGEX.test(filename) || filename.includes("..")) {
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

    let result = svgContent;
    const rawColor = getQuery(event).color;
    if (typeof rawColor === "string") {
      const cleanHex = rawColor.replace(/^#/, "").trim();
      if (VALID_HEX_REGEX.test(cleanHex)) {
        result = result
          .replace(/fill="#[0-9a-fA-F]{6}"/gi, `fill="#${cleanHex}"`)
          .replace(/#[0-9a-fA-F]{6}\b/gi, `#${cleanHex}`);
      }
    }

    setHeader(event, "Content-Type", "image/svg+xml; charset=utf-8");
    setHeader(
      event,
      "Cache-Control",
      "public, max-age=31536000, s-maxage=31536000, immutable"
    );

    return result;
  },
  {
    maxAge: 60 * 60 * 24 * 30, // 30 days
    staleMaxAge: 60 * 60 * 24 * 365, // 1 year
    getKey: (event) => {
      const filename = getRouterParam(event, "filename") || "";
      const rawColor = (getQuery(event).color as string) || "default";
      const cleanHex = rawColor.replace(/^#/, "").trim();
      return `logos:${filename}:${cleanHex}`;
    },
  }
);

