require('dotenv').config({ path: `.env.${process.env.NODE_ENV || 'development'}.local` });
const jwt = require('jsonwebtoken')

async function createToken(id) {
    const token = await jwt.sign({exp: +process.env.JWT_EXPIRATION, id: id}, process.env.JWT_SECRET)
    return token
}

module.exports = {
    createToken
}