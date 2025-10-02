import Game from "../models/gameSchema.mjs";
import Category from "../models/categorySchema.mjs";

// Start New Game --------------------------
const startGame = async (req, res) => {
  try {
    const { user, categoryID, score, completed } = req.body;
    if (!user || !categoryID || !score) {
      return res
        .status(400)
        .json({ msg: `Missing input value (user, categoryID and/or score)` });
    }

    const existingCategory = await Category.findOne({ _id: categoryID });

    if (!existingCategory) {
      return res
        .status(400)
        .json({ msg: `Category Id: ${categoryID} not found in database` });
    }

    const existingUser = await User.findOne({ _id: user });

    if (!existingUser) {
      return res
        .status(400)
        .json({ msg: `User Id: ${user} not found in database` });
    }

    let newGame = await Game.create({
      user: user,
      categoryID: categoryID,
      score: score,
      completed: completed,
    });

    res.json({ msg: `New Game Created`, newGame });
  } catch (err) {
    console.log(err.message);
    res.status(err.status || 500).json({ msg: `Error - ${err.message}}` });
  }
};

// Get Top score of all time -------------------------------------
const getTopAllTime = async (req, res) => {
  try {
    // find completed games
    const topScores = await Game.find({ completed: true })
      .sort({ score: -1 }) // Sort by score descending (Highest scores first)
      .limit(10); // Limit to top 10
    res.status(200).json(topScores);
  } catch (error) {
    console.log(`:x: Error :`, error.message);
    res.status(500).json({ msg: error.message });
  }
};

// Get Top 10 by category --------------------------
const topByCategory = async (req, res) => {
  try {
    const category = req.params.id;
    const score = await Game.find({ category: category }).sort(-1).limit(10);
    if (!category) res.status(404).json({ msg: "Category not found" });
    res.json(score);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "Server error" });
  }
};

// Delete all games from category ----------------------
const deleteAllGamesByCat = async (req, res) => {
  try {
    let deleteGame = await Game.deleteMany({ categoryId: req.params.id });

    if (deleteGame.deletedCount != 0) {
      res.json(deleteGame);
    } else {
      return res.status(404).json({
        msg: "No Category found: :negative_squared_cross_mark:Nothing deleted",
      });
    }
  } catch (err) {
    res.status(err.status || 500).json({ msg: err.message });
  }
};

// Get top games by user -----------------------------------
const topByUser = async (req, res) => {
  try {
    const game = await Game.find({ user: req.params.userId })
      .sort({ createdAt: -1 })
      .limit(10);

    res.json(game);
  } catch (err) {
    res.status(err.status || 500).json({ msg: err.message });
  }
};

// Update/End game -------------------------------
const updateGame = async (req, res) => {
  try {
    let { id } = req.params;
    const update = req.body;

    const gameUpdate = await Game.findByIdAndUpdate(id, update, {
      new: true,
      runValidator: true,
    });

    if (!gameUpdate) {
      return res.status(404).json({ msg: "Game not found" });
    }
    res.json(gameUpdate);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: `❗️Update Error❗️ - ${err.message}` });
  }
};

// Delete game ---------------------------------------
const deleteGame = async (req, res) => {
  try {
    const gameId = req.params.id;

    const deletedGame = await Game.findByIdAndDelete(gameId);

    res.status(204).json(deletedGame);
  } catch (error) {
    console.error(`:x: Error :`, error.message);
    res.status(500).json({ msg: error.message });
  }
};

const getGameById = async (req, res) => {
    try {
      let currentgame = await Game.findById(req.params.id);

      if (!currentgame)
        return res.status(400).json({ errors: [{ msg: "No game found" }] });

      res.json(currentgame);
    } catch (err) {
      console.error(err.message);
      res.status(err.status || 500).json({ errors: [{ msg: "Server Error" }] });
    }
  }

export default {
  startGame,
  getTopAllTime,
  topByCategory,
  deleteAllGamesByCat,
  topByUser,
  updateGame,
  deleteGame,
  getGameById
};
