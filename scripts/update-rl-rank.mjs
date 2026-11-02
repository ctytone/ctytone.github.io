// Fetches Rocket League Ranked Doubles (playlist 11) from the Tracker Network
// public API and writes it to data/rocket-league.json for fun.html to display.
// Runs in GitHub Actions; needs the TRN_API_KEY secret.
import { mkdir, readFile, writeFile } from "node:fs/promises";

const PLATFORM = "epic";
const USER = "CyGy Ω";
const PLAYLIST_ID = 11; // Ranked Doubles 2v2
const OUT = "data/rocket-league.json";

const key = process.env.TRN_API_KEY;
if (!key) {
  console.error("TRN_API_KEY is not set.");
  process.exit(1);
}

const url = `https://public-api.tracker.gg/v2/rocket-league/standard/profile/${PLATFORM}/${encodeURIComponent(USER)}`;
const res = await fetch(url, {
  headers: { "TRN-Api-Key": key, Accept: "application/json" },
});
const body = await res.text();
if (!res.ok) {
  console.error(`Tracker API returned ${res.status} for ${url}`);
  console.error(body.slice(0, 1000));
  process.exit(1);
}

const segments = JSON.parse(body)?.data?.segments ?? [];
const seg = segments.find(
  (s) => s.type === "playlist" && Number(s.attributes?.playlistId) === PLAYLIST_ID
);
if (!seg) {
  console.error(`No playlist ${PLAYLIST_ID} segment found. Segments seen:`,
    segments.map((s) => `${s.type}:${s.attributes?.playlistId ?? ""}`).join(", "));
  process.exit(1);
}

const stats = seg.stats ?? {};
const data = {
  playlist: seg.metadata?.name ?? "Ranked Doubles 2v2",
  rank: stats.tier?.metadata?.name ?? null,
  division: stats.division?.metadata?.name ?? null,
  mmr: stats.rating?.value ?? null,
  icon: stats.tier?.metadata?.iconUrl ?? null,
  updated: new Date().toISOString(),
};

// Only rewrite when something other than the timestamp changed, so the
// workflow doesn't commit every run.
try {
  const prev = JSON.parse(await readFile(OUT, "utf8"));
  const same = ["playlist", "rank", "division", "mmr", "icon"].every((k) => prev[k] === data[k]);
  if (same) {
    console.log("Rank unchanged:", data);
    process.exit(0);
  }
} catch {
  // no previous file yet
}

await mkdir("data", { recursive: true });
await writeFile(OUT, JSON.stringify(data, null, 2) + "\n");
console.log("Wrote", OUT, data);
