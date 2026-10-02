import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";

function getCertFileHash(filename: string): string {
  try {
    const fullPath = path.resolve("./public/certs", filename);
    if (fs.existsSync(fullPath)) {
      return crypto
        .createHash("md5")
        .update(fs.readFileSync(fullPath))
        .digest("hex")
        .slice(0, 8);
    }
  } catch {}
  return "v1";
}

export default defineEventHandler(async (event) => {
  // Query all certificates once from the content collection
  const allCerts = await queryCollection(event, "certificates")
    .order("issue_date", "DESC")
    .all();

  // Attach content hash to certificate url for instant cache busting
  const certsWithHash = allCerts.map((c) => ({
    ...c,
    url: c.url ? `${c.url}?v=${getCertFileHash(c.url)}` : c.url,
  }));

  // Keep non-BTI certificates first, then BTI, both ordered by date DESC
  return certsWithHash.sort((a, b) => {
    const isBtiA = a.org?.toUpperCase().includes("BTI") ? 1 : 0;
    const isBtiB = b.org?.toUpperCase().includes("BTI") ? 1 : 0;
    if (isBtiA !== isBtiB) {
      return isBtiA - isBtiB;
    }
    return (b.issue_date || "").localeCompare(a.issue_date || "");
  });
});
