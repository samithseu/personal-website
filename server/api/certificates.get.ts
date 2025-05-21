const CACHE_TTL: number = 60 * 5; // 5 minutes
import { notionFilter } from "./filter";

export default defineCachedEventHandler(
  async (event) => {
    const config = useRuntimeConfig(event);
    setResponseHeader(event, "Cache-Control", `public, max-age=${CACHE_TTL}`);
    try {
      const response = await fetch(
        `https://api.notion.com/v1/databases/${config.notionDbId}/query`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${config.notionApiKey}`,
            "Notion-Version": "2022-06-28",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(notionFilter),
        }
      );
      const data = await response.json();
      return data.results.map((res: any) => {
        let id = res.properties.ID.rich_text[0].plain_text;
        let subject = res.properties.Subject.title[0].plain_text;
        let issueDate = res.properties.issue_date.date.start;
        let image = res.properties.image?.files[0]?.file.url ?? null;
        return { id, subject, issueDate, image };
      });
    } catch (error) {
      console.error(error);
      return [];
    }
  },
  {
    maxAge: CACHE_TTL,
  }
);
