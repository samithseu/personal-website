#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");
const outputPath = path.join(rootDir, "server", "assets", "projects.json");

// Load .env or .env.local if available in environment
for (const envFile of [".env.local", ".env"]) {
  const envPath = path.join(rootDir, envFile);
  if (fs.existsSync(envPath) && typeof process.loadEnvFile === "function") {
    try {
      process.loadEnvFile(envPath);
    } catch {
      // Ignore env parsing errors
    }
  }
}

const githubToken =
  process.env.NUXT_GITHUB_TOKEN || process.env.GITHUB_TOKEN || "";

const headers = {
  Accept: "application/vnd.github+json",
  "User-Agent": "samithseu-portfolio-sync",
  "X-GitHub-Api-Version": "2022-11-28",
};

if (githubToken) {
  headers.Authorization = `Bearer ${githubToken}`;
}

async function syncProjects() {
  console.log("[sync-projects] Starting GitHub repository sync...");

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10000);

    const response = await fetch(
      "https://api.github.com/users/samithseu/repos?per_page=100&sort=updated&direction=desc",
      {
        headers,
        signal: controller.signal,
      }
    );
    clearTimeout(timeout);

    if (!response.ok) {
      throw new Error(`GitHub API returned status ${response.status} (${response.statusText})`);
    }

    const repos = await response.json();
    if (!Array.isArray(repos)) {
      throw new Error("GitHub API did not return an array of repositories");
    }

    // Filter valid portfolio projects: non-forks, topics contains 'project', and homepage exists
    const projects = repos
      .filter(
        (repo) =>
          !repo.fork &&
          Array.isArray(repo.topics) &&
          repo.topics.includes("project") &&
          Boolean(repo.homepage && repo.homepage.trim())
      )
      .map((p) => ({
        id: p.id,
        name: p.name,
        description: p.description ?? "",
        topics: p.topics ?? [],
        homepage: p.homepage.trim(),
        html_url: p.html_url,
        updated_at: p.updated_at,
      }))
      .sort(
        (a, b) =>
          new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
      );

    if (projects.length === 0) {
      console.warn(
        "[sync-projects] GitHub returned 0 matching portfolio projects. Retaining current snapshot if present."
      );
      return;
    }

    fs.mkdirSync(path.dirname(outputPath), { recursive: true });
    fs.writeFileSync(outputPath, JSON.stringify(projects, null, 2) + "\n", "utf8");
    console.log(
      `[sync-projects] Successfully synced ${projects.length} projects to ${path.relative(rootDir, outputPath)}`
    );
  } catch (error) {
    console.warn(`[sync-projects] Sync skipped or failed: ${error.message}`);
    if (fs.existsSync(outputPath)) {
      try {
        const existing = JSON.parse(fs.readFileSync(outputPath, "utf8"));
        console.log(
          `[sync-projects] Using existing snapshot with ${existing.length} projects.`
        );
      } catch {
        // file reading error
      }
    } else {
      console.warn(
        `[sync-projects] No snapshot file found at ${path.relative(rootDir, outputPath)}`
      );
    }
  }
}

syncProjects()
  .catch((err) => {
    console.error("[sync-projects] Unexpected error:", err);
  })
  .finally(() => {
    // Always exit 0 so build pipeline continues reliably
    process.exit(0);
  });
