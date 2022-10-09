const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");

const prisma = new PrismaClient();

async function seed() {
  const password = await bcrypt.hash("123", 8);

  const createdUser = await prisma.user.create({
    data: {
      email: "maxpower@email.com",
      password,
    },
  });

  const createdUserTwo = await prisma.user.create({
    data: {
      email: "atanzarian@email.com",
      password,
    },
  });

  const createdItem = await prisma.item.create({
    data: {
      userId: createdUser.id,
      name: "TV",
      desc: "shows movies",
      cost: 200,
      imageUrl: 'Urllllsssss'
    },
    include: {
      votes: true,
    },
  });

  const createdItem2 = await prisma.item.create({
    data: {
      userId: createdUser.id,
      name: "Cheese",
      desc: "Tasty stuff",
      cost: 20,
      imageUrl: 'Urllllsssss'
    },
    include: {
      votes: true,
    },
  });

  console.log("users", createdUser, createdItem);
}

seed().catch(async (error) => {
  console.error(error);
  await prisma.$disconnect();
  process.exit(1);
});
