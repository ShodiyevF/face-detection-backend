const { error } = require('../config/error.names');
const { tokenVerifer } = require('../lib/jwt');
const { uniqRow } = require('../lib/pg');

async function authorizationMiddleware(req, res, next) {
    try {
        const authorization = req.headers.authorization;

        if (!req.headers || !authorization) {
            return res.json({
                status: 401,
                error: error.AUTHORIZATION_ERROR,
                message: 'header da authorization majburiy',
            });
        }

        const token = await tokenVerifer(authorization);

        if (!token || (token.status && token.status == 402)) {
            return res.json({
                status: 401,
                error: error.AUTHORIZATION_ERROR,
                message: `Mavjud bo'magan token`,
            });
        }

        const user = await uniqRow('select * from users where user_id = $1', token.id);

        if (!user.rows.length) {
            return res.json({
                status: 401,
                error: error.AUTHORIZATION_ERROR,
                message: `Tokenni egasi bo'lgan foydalanuvchi topilmadi`,
            });
        }

        next();
    } catch (error) {}
}

module.exports = {
    authorizationMiddleware,
};
