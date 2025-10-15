import express from "express";
const app = express();
export default app;

import playlistsRouter from "#api/playlists";
import tracksRouter from "#api/tracks";
import playlistsTracksRouter from "#api/playlists_tracks";

app.use("/playlists", playlistsRouter);
app.use("/tracks", tracksRouter);
app.use("/playlists_tracks", playlistsTracksRouter);

app.use((error, req, res, next) => {
  if (error.code === "23502") {
    return res.status(400).send(error.detail);
  }
  console.error(error);
});

app.use((error, req, res, next) => {
  console.error(error);
});
