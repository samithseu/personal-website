export default defineEventHandler(async (event) => {
  // Query all certificates once from the content collection
  const allCerts = await queryCollection(event, "certificates")
    .order("issue_date", "DESC")
    .all();

  // Keep non-BTI certificates first, then BTI, both ordered by date DESC
  return allCerts.sort((a, b) => {
    const isBtiA = a.org?.toUpperCase().includes("BTI") ? 1 : 0;
    const isBtiB = b.org?.toUpperCase().includes("BTI") ? 1 : 0;
    if (isBtiA !== isBtiB) {
      return isBtiA - isBtiB;
    }
    return (b.issue_date || "").localeCompare(a.issue_date || "");
  });
});
