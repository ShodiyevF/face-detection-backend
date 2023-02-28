require('dotenv').config({ path: `.env.${process.env.NODE_ENV || 'development'}.local` });
const jwt = require('jsonwebtoken')

async function createToken(id) {
    const token = await jwt.sign({id: id}, process.env.JWT_SECRET, {
        expiresIn: +process.env.JWT_EXPIRATION
    })
    return token
}

async function tokenVerifer(token) {
    const verifed = await jwt.verify(token, process.env.JWT_SECRET)
    return verifed
}

module.exports = {
    createToken,
    tokenVerifer
}