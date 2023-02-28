const { error } = require('../../config/error.names');
const { uniqRow } = require('../../lib/pg');

async function loginModel(body) {
    const email = await uniqRow('select * from users where user_email = $1', body.user_email);

    if (!email.rows.length) {
        return {
            action: true,
            status: 404,
            error: error.USER_NOT_FOUND,
            message: 'Bunday foydalanuvchi topilmadi !',
        };
    }

    if (email.rows[0].user_password != body.user_password) {
        return {
            action: true,
            status: 400,
            error: error.USER_PASSWORD_NOTCORRECT,
            message: `Foydalanuvchining paroli noto'g'ri !`,
        };
    }

    return email.rows[0].user_id;
}

module.exports = {
    loginModel,
};
