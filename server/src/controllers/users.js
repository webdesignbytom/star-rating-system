const { Prisma } = require("@prisma/client");
const prisma = require("../utils/prisma");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const hashRate = 8

const { findUsers, findUserByEmail, createUser } = require('../domain/users')

const getAllUsers = async (req, res) => {
    console.log('gettin all items')
    try {

        const foundUsers = await findUsers()

        if (!foundUsers) {
            return res.status(409).json({ error: { msg: 'Users not found'}})
        }

        return res.status(200).json({ data: foundUsers })
    } catch (error) {
        res.status(500).json({ error: { msg: "500 Fail" } });

    }
}

const createNewUser = async (req, res) => {
    console.log('creating new user')
    const { email, password } = req.body

    const lowerCaseEmail = email.toLowerCase()

    try {

        const existingUser = await findUserByEmail(email)
        console.log('existingUser', existingUser)

        if (existingUser) {
            return res.status(409).json({ error: { msg: 'User already exists with this email'}})
        }

        const hashedPassword = await bcrypt.hash(password, hashRate)
        console.log('hashedPassword', hashedPassword)

        const newUser = await createUser(lowerCaseEmail, hashedPassword)
        console.log('new', newUser)

        return res.status(201).json({ data: newUser })

    } catch (error) {
        res.status(500).json({ error: { msg: "500 Fail" } });

    }
}

module.exports = {
    getAllUsers,
    createNewUser
}