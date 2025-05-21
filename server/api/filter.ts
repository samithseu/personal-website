export const notionFilter = {
  filter: {
    and: [
      {
        or: [
          {
            property: "Org",
            select: {
              equals: "BTI",
            },
          },
          {
            property: "Org",
            select: {
              equals: "HackerRank",
            },
          },
        ],
      },
      {
        property: "Given",
        checkbox: {
          equals: true,
        },
      },
    ],
  },
};
