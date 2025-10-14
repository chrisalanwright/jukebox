import express from "express";
const router = express.Router();
export default router;

import { getTracks, getTrackById } from "#db/queries/tracks.js";

router.route("/").get(async (req, res) => {
  try {
    const tracks = await getTracks();
    res.json(tracks);
  } catch (error) {
    console.error("Database error:", error);
    res.status(400).json({ error: "Unable to get tracks." });
  }
});

router.route("/:id").get(async (req, res) => {
  try {
    const track = await getTrackById(req.params.id);
    if (!track) {
      return res.status(404).json({ error: "Track not found." });
    }
    res.json(track);
  } catch (error) {
    console.error("Database error:", error);
    res.status(400).json({ error: "Unable to get track." });
  }
});
