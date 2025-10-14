import db from "#db/client";

import { createTrack } from "#db/queries/tracks.js";
import { createPlaylist } from "#db/queries/playlists.js";
import { createPlaylistsTracks } from "#db/queries/playlists_tracks.js";

await db.connect();
await seed();
await db.end();
console.log("🌱 Database seeded.");

async function seed() {
  for (let i = 1; i <= 20; i++) {
    await createTrack(
      "Track " + i,
      120000 + Math.floor(Math.random() * 480000)
    );
  }

  for (let i = 1; i <= 10; i++) {
    await createPlaylist("Playlist " + i, "Description " + ((i % 2) + 1));
  }

  for (let i = 1; i <= 15; i++) {
    const trackId = 1 + Math.floor(Math.random() * 20);
    const playlistId = 1 + Math.floor(Math.random() * 10);
    await createPlaylistsTracks(trackId, playlistId);
  }
}
