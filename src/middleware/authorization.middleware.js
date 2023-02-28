const { error } = require("../config/error.names")
const { tokenVerifer } = require("../lib/jwt")
const { uniqRow } = require("../lib/pg")

async function authorizationMiddleware(req, res, next) {
    try {
        
        const authorization = req.headers.authorization

        if(!req.headers || !req.headers.authorization){
            return res.json({
                status: 400,
                error: error.AUTHORIZATION_ERROR,
                message: 'header da authorization majburiy'
            })
        }
        
        const token = await tokenVerifer(authorization)
        
        if (token.status && token.status == 402) {
            return res.json({
                status: 404,
                error: error.TOKEN_EXPIRED,
                message: `Mavjud bo'magan token`
            })
        }
        
        const user = await uniqRow('select * from users where user_id = $1', token.id)
        
        if (!user.rows.length) {
            return res.json({
                status: 400,
                error: error.AUTHORIZATION_ERROR,
                message: `Tokenni egasi bo'lgan foydalanuvchi topilmadi`
            })
        }
        
        next()
    } catch (error) {}
}

module.exports = {
    authorizationMiddleware
}