import express from "express";
const router = express.Router();
export default router;

import {
  createPlaylist,
  getPlaylistById,
  getPlaylists,
} from "../db/queries/playlists.js";
import { getTracksByPlaylistId } from "../db/queries/tracks.js";
import { createPlaylistsTracks } from "../db/queries/playlists_tracks.js";

router.param("id", async (req, res, next, id) => {
  if (isNaN(parseInt(id))) {
    return res.status(400).send("ID must be a number.");
  }

  const playlist = await getPlaylistById(id);
  if (!playlist) return res.status(404).send("Playlist not found.");

  req.playlist = playlist;
  next();
});

router.route("/").get(async (req, res) => {
  const playlists = await getPlaylists();
  res.send(playlists);
});

router.route("/").post(async (req, res) => {
  if (!req.body) return res.status(400).send("missing required text");

  const { name, description } = req.body;
  if (!name || !description) {
    return res.status(400).send("missing required text");
  }

  const playlist = await createPlaylist(name, description);
  res.status(201).send(playlist);
});

router.route("/:id").get((req, res) => {
  res.send(req.playlist);
});

router.route("/:id/tracks").get(async (req, res) => {
  const tracks = await getTracksByPlaylistId(req.playlist.id);
  res.send(tracks);
});

router.route("/:id/tracks").post(async (req, res) => {
  if (!req.body) return res.status(400).send("missing required text");

  const { trackId } = req.body;
  if (!trackId) {
    return res.status(400).send("needs trackId");
  }

  const playlist_track = await createPlaylistsTracks(trackId, req.playlist.id);
  res.status(201).send(playlist_track);
});
