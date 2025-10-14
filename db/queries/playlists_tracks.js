import db from "#db/client";

export async function createPlaylistsTracks(trackId, playlistId) {
  const sql = `
  INSERT INTO playlists_tracks
    (track_id, playlist_id)
  VALUES
    ($1, $2)
  RETURNING *
  `;
  const {
    rows: [playlist_tracks],
  } = await db.query(sql, [trackId, playlistId]);
  return playlist_tracks;
}

export async function getPlaylistsTracks() {
  const sql = `
  SELECT playlists_tracks.*,
  tracks.name AS track_name,
  playlists.name AS playlist_name
  FROM playlists_tracks
  JOIN tracks ON playlists_tracks.track_id = tracks.id
  JOIN playlists ON playlists_tracks.playlist_id = playlists.id
  `;
  const { rows: playlists_tracks } = await db.query(sql);
  return playlists_tracks;
}

export async function getPlaylistsTracksByTrackId(id) {
  const sql = `
  SELECT *
  FROM playlists_tracks
  WHERE track_id = $1
  `;
  const { rows: playlists_tracks } = await db.query(sql, [id]);
  return playlists_tracks;
}

export async function getPlaylistsTracksByPlaylistId(id) {
  const sql = `
  SELECT *
  FROM playlists_tracks
  WHERE playlist_id = $1
  `;
  const { rows: playlists_tracks } = await db.query(sql, [id]);
  return playlists_tracks;
}
