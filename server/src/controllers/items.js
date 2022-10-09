const { Prisma } = require("@prisma/client");
const prisma = require("../utils/prisma");

const {
  getItems,
  findItemByName,
  createItem,
  makeVote,
  findItemById,
  calculateAverage,
  updateVotingRecords,
  updateItem,
  deleteItem,
  findVoteById,
  updateVote
} = require("../domain/items");

const getAllItems = async (req, res) => {
  try {
    const foundItems = await getItems();

    res.status(200).json({ data: foundItems });
  } catch (error) {
    res.status(500).json({ error: { msg: "500 Fail" } });
  }
};

const getItemById = async (req, res) => {
  const itemId = Number(req.params.id);

  try {
    const foundItem = await findItemById(itemId);
    console.log("found", foundItem);

    if (!foundItem) {
      return res.status(404).json({ error: { msg: "Item not found" } });
    }

    return res.status(201).json({ data: foundItem });
  } catch (error) {
    return res.status(500).json({ error: { msg: "500 Fail" } });
  }
};

const createNewItem = async (req, res) => {
  const { userId, name, desc, cost, imageUrl } = req.body;

  try {
    const existingItem = await findItemByName(name);

    if (existingItem) {
      return res
        .status(409)
        .json({ error: { msg: `The item already exists` } });
    }

    const newItem = await createItem(userId, name, desc, cost, imageUrl);

    res.status(200).json({ data: newItem });
  } catch (error) {
    res.status(500).json({ error: { msg: "500 Fail" } });
  }
};

const voteOnItem = async (req, res) => {
  const { userId, value } = req.body;
  const itemId = Number(req.params.id);

  try {
    const foundItem = await findItemById(itemId);

    if (!foundItem) {
      return res.status(404).json({ error: { msg: `Item not found` } });
    }

    const newVote = await makeVote(itemId, userId, value);

    let newAverage = await calculateAverage(itemId);

    newAverage = Number(newAverage._avg.value.toFixed(2));
    console.log("newAverage", newAverage);

    // const testNum = new Prisma.Decimal(5.60)

    const newScore = await updateVotingRecords(itemId, newAverage);

    console.log("newScore", newScore);

    res.status(201).json({ data: { newVote, newAverage } });
  } catch (error) {
    return res.status(500).json({ error: { msg: "500 Fail" } });
  }
};

const updateItemById = async (req, res) => {
  console.log("updating item");

  const { name, desc, cost, imageUrl } = req.body;
  const itemId = Number(req.params.id);

  try {
    const existingItem = await findItemByName(name);
    if (existingItem) {
      return res
        .status(409)
        .json({ error: { msg: `The item already exists` } });
    }

    const foundItem = await findItemById(itemId);
    console.log("found", foundItem);

    if (!foundItem) {
      return res.status(404).json({ error: { msg: `Item not found` } });
    }

    const updatedItem = await updateItem(itemId, name, desc, cost, imageUrl);
    console.log("updaed", updatedItem);

    return res.status(201).json({ data: updatedItem });
  } catch (error) {
    return res.status(500).json({ error: { msg: "500 Fail" } });
  }
};

const deleteItemById = async (req, res) => {
  console.log("delete");
  const itemId = Number(req.params.id);

  try {
    const foundItem = await findItemById(itemId);
    console.log("found", foundItem);

    if (!foundItem) {
      return res.status(404).json({ error: { msg: `Item not found` } });
    }

    const deletedItem = await deleteItem(itemId);

    return res.status(201).json({ data: deletedItem });
  } catch (error) {
    return res.status(500).json({ error: { msg: "500 Fail" } });
  }
};

const updateVoteById = async (req, res) => {
  const itemId = Number(req.params.id);
  const voteId = Number(req.params.voteId);
  const { value } = req.body

  try {
    const foundItem = await findItemById(itemId);

    if (!foundItem) {
      return res.status(404).json({ error: { msg: `Item not found` } });
    }

    const foundVote = await findVoteById(itemId, voteId);

    if (!foundVote) {
      return res.status(404).json({ error: { msg: `Vote not found` } });
    }

    const updatedVote = await updateVote(voteId, itemId, value);

    const foundUpdatedVote = await findVoteById(itemId, voteId)

    return res.status(200).json({ data: foundUpdatedVote })
  } catch (error) {
    return res.status(500).json({ error: { msg: "500 Fail" } });
  }
};

module.exports = {
  createNewItem,
  getAllItems,
  voteOnItem,
  getItemById,
  updateItemById,
  deleteItemById,
  updateVoteById,
};
