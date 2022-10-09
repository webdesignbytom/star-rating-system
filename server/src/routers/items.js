const express = require("express");
const {
  createNewItem,
  getAllItems,
  getItemById,
  voteOnItem,
  updateItemById,
  deleteItemById,
  updateVoteById,
} = require("../controllers/items");

const router = express.Router();
// next time use userId and voteId and itemId
router.post("/", createNewItem);
router.get("/", getAllItems);
router.get("/:id", getItemById);
router.post("/:id/vote", voteOnItem);
router.patch("/:id/vote/:voteId", updateVoteById);
router.patch("/:id/", updateItemById);
router.delete("/:id", deleteItemById);

module.exports = router;
