const { Prisma } = require("@prisma/client");
const prisma = require("../utils/prisma");

const findUsers = () => prisma.user.findMany({
    include: {
        items: true
    }
})

const findUserByEmail = (email) => prisma.user.findFirst({
    where: {
        email: email
    }
})

const createUser = (lowerCaseEmail, hashedPassword) => prisma.user.create({
    data: {
        email: lowerCaseEmail,
        password: hashedPassword
    }
})

module.exports = {
    findUsers,
    findUserByEmail,
    createUser
}