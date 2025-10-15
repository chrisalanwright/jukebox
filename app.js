import express from "express";
const app = express();
export default app;

import morgan from "morgan";

import tracksRouter from "./api/tracks.js";
import playlistsRouter from "./api/playlists.js";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(morgan("dev"));

app.use("/playlists", playlistsRouter);
app.use("/tracks", tracksRouter);

app.use((error, req, res, next) => {
  if (error.code === "23502") {
    return res.status(400).send(error.detail);
  }

  if (err.code === "23505") {
    return res.status(400).send("Track is already in this playlist.");
  }

  next(err);
});

app.use((error, req, res, next) => {
  console.error(error);
});
