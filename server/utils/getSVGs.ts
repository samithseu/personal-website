const getUncachedSVG = async (svgPath: string): Promise<string> => {
  return await $fetch(svgPath, {
    responseType: "text",
  });
};

export const getSVG = defineCachedFunction(
  async (svgPath: string) => {
    return await getUncachedSVG(svgPath);
  },
  {
    maxAge: 60 * 60 * 24 * 7, // 7 days
    staleMaxAge: 30, // 30 seconds
    getKey(svgPath) {
      return svgPath;
    },
  }
);
