// query all certificates
export async function fetchingCertificates() {
  const result = await Promise.all([
    queryCollection("certificates")
      .where("org", "NOT LIKE", "BTI")
      .order("issue_date", "DESC")
      .all(),
    queryCollection("certificates")
      .where("org", "LIKE", "BTI")
      .order("issue_date", "DESC")
      .all(),
  ]);
  return result.flat();
  // const otherOrgs = await queryCollection("certificates")
  //   .where("org", "NOT LIKE", "BTI")
  //   .order("issue_date", "DESC")
  //   .all();
  // const myCollege = await queryCollection("certificates")
  //   .where("org", "LIKE", "BTI")
  //   .order("issue_date", "DESC")
  //   .all();
  // return [...otherOrgs, ...myCollege];
}
