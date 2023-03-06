const { error } = require('../config/error.names');

function authLoginValidation(req, res, next) {
    const body = req.body;
    if (!body.user_email) {
        res.json({
            status: 403,
            error: error.VALIDATION_ERROR_USEREMAIL_REQUIRED,
            message: 'user_email majburiy',
        });
    } else if (body.user_email.length > 64) {
        res.json({
            status: 403,
            error: error.VALIDATION_ERROR_USEREMAIL_LENGTH,
            message: `user_email uzunligi 64tadan kichik bo'lishi kerak`,
        });
    } else if (!body.user_password) {
        res.json({
            status: 403,
            error: error.VALIDATION_ERROR_USERPASSWORD_REQUIRED,
            message: `user_password majburiy`,
        });
    } else {
        next();
    }
}

module.exports = {
    authLoginValidation,
};
