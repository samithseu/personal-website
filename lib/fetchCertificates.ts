// query all certificates
export async function fetchingCertificates() {
  const otherOrgs = await queryCollection("certificates")
    .where("org", "NOT LIKE", "BTI")
    .order("issue_date", "DESC")
    .all();
  const myCollege = await queryCollection("certificates")
    .where("org", "LIKE", "BTI")
    .order("issue_date", "DESC")
    .all();
  return [...otherOrgs, ...myCollege];
}
