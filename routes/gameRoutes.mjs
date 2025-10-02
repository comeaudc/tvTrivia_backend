import { Router } from "express";
import gameCTRL from "../controllers/gameControllers.mjs";
const router = Router();

// Create new game
router.route("/").post(gameCTRL.startGame);

// @route GET /api/games/topscore
// @desc get top 10 scores
// @access public
router.route("/topscore").get(gameCTRL.getTopAllTime);

// Get top 10 scored games by category
router
  .route("/category/:id")
  .get(gameCTRL.topByCategory)
  .delete(gameCTRL.deleteAllGamesByCat);

// Get top 10 games by user ID
router.route("/user/:id").get(gameCTRL.topByUser);

// PUT update/end game
router
  .route("/:id")
  .get(gameCTRL.getGameById)
  .put(gameCTRL.updateGame)
  .delete(gameCTRL.deleteGame);

export default router;
