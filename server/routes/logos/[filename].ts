import { getSVG } from "~~/server/utils/getSVGs";

const getOnlyValidHex = (hex: string) => {
  return hex && hex.match(/^([0-9a-fA-F]{6})$/) ? hex : null;
};

export default defineEventHandler(async (event) => {
  const filename = getRouterParam(event, "filename");
  if (!filename) {
    throw new Error("Filename not found!");
  }
  // get the color from url and validate
  const validHex = getOnlyValidHex(getQuery(event).color as string);
  const protocol = process.env.NODE_ENV === "development" ? "http" : "https";
  const baseURL = `${protocol}://${getRequestHost(event)}`;

  try {
    let svgUrl = new URL(`/svg/${filename}`, baseURL).toString();
    let svgContent = await getSVG(svgUrl);
    if (validHex!) {
      svgContent = svgContent
        .replace(/fill="#[0-9a-fA-F]{6}"/g, `fill="#${validHex}"`)
        .replace(/#[0-9a-fA-F]{6}/g, `#${validHex}`);
    }
    return new Response(svgContent, {
      headers: {
        "Content-Type": "image/svg+xml",
        "Cache-Control": "public, max-age=3600, s-maxage=3600", // 1 hour
      },
    });
  } catch (error: any) {
    return new Response(`${error.message}`, {
      status: 404,
    });
  }
});
