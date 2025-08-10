import { Router } from "express";
import {
  getFollowedArtists,
  startPlayingTopTrack,
  stopCurrentPlayback,
} from "../controllers/spotify.controller";
import { verifyJWT } from "../middleware/auth.middleware";
import { mongodIdPathVariableValidator } from "../validators/common/mongodb.validators";

const router = Router();

router.route("/followed-artist").get(verifyJWT, getFollowedArtists);
router.route("/stop-current-playback").get(verifyJWT, stopCurrentPlayback);
router
  .route("/start-playing-track/:trackId")
  .get(
    mongodIdPathVariableValidator("trackId"),
    verifyJWT,
    startPlayingTopTrack
  );

export default router;
