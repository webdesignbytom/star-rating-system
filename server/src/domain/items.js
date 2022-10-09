const { Prisma } = require("@prisma/client");
const prisma = require("../utils/prisma");

const getItems = () =>
  prisma.item.findMany({
    include: {
      votes: true,
    },
    orderBy: [
      {
        id: "asc",
      },
    ],
  });

const findItemByName = (searchName) =>
  prisma.item.findFirst({
    where: {
      name: searchName,
    },
    include: {
      votes: true,
    },
  });

const findItemById = (itemId) =>
  prisma.item.findFirst({
    where: {
      id: itemId,
    },
    include: {
      votes: true,
    },
  });

const createItem = (userId, name, desc, cost, imageUrl) =>
  prisma.item.create({
    data: {
      userId: userId,
      name: name,
      desc: desc,
      cost: cost,
      imageUrl: imageUrl,
    },
    include: {
      votes: true,
    },
  });

const makeVote = (itemId, userId, value) =>
  prisma.vote.create({
    data: {
      itemId: itemId,
      userId: userId,
      value: value,
    },
  });

const calculateAverage = (itemId) =>
  prisma.vote.aggregate({
    where: {
      itemId: itemId,
    },
    _avg: {
      value: true,
    },
  });

const updateVotingRecords = (itemId, avgScore) =>
  prisma.item.update({
    where: {
      id: itemId,
    },
    data: {
      score: avgScore,
      totalVotes: {
        increment: 1,
      },
    },
  });

const updateItem = (itemId, name, desc, cost, imageUrl) =>
  prisma.item.update({
    where: {
      id: itemId,
    },
    data: {
      name: name,
      desc: desc,
      cost: cost,
      imageUrl: imageUrl,
    },
  });

const deleteItem = (itemId) =>
  prisma.item.delete({
    where: {
      id: itemId,
    },
  });

const findVoteById = (itemId, voteId) =>
  prisma.vote.findFirst({
    where: {
      AND: [
        {
          id: voteId,
        },
        {
          itemId: itemId,
        },
      ],
    },
  });

const updateVote = (voteId, itemId, newValue) =>
  prisma.item.update({
    where: {
      id: itemId,
    },
    data: {
      votes: {
        update: {
          where: {
            id: voteId,
          },
          data: {
            value: newValue
          }
        },
      },
    },
  });

module.exports = {
  getItems,
  findItemByName,
  createItem,
  findItemById,
  makeVote,
  calculateAverage,
  updateVotingRecords,
  updateItem,
  deleteItem,
  findVoteById,
  updateVote,
};
