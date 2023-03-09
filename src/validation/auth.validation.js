const { error } = require('../config/error.names');

function authLoginValidation(req, res, next) {
    const body = req.body;
    if (!body.user_email) {
        res.status(403).json({
            status: 403,
            error: error.VALIDATION_ERROR_USEREMAIL_REQUIRED,
            message: 'user_email majburiy',
        });
    } else if (body.user_email.length > 64) {
        res.status(403).json({
            status: 403,
            error: error.VALIDATION_ERROR_USEREMAIL_LENGTH,
            message: `user_email uzunligi 64tadan kichik bo'lishi kerak`,
        });
    } else if (!body.user_password) {
        res.status(403).json({
            status: 403,
            error: error.VALIDATION_ERROR_USER_PASSWORD_REQUIRED,
            message: `user_password majburiy`,
        });
    } else if (body.user_password.length > 64) {
        res.status(403).json({
            status: 403,
            error: error.VALIDATION_ERROR_USER_PASSWORD_LENGTH,
            message: `user_password uzunligi 64tadan kichik bo'lishi kerak`,
        });
    } else {
        next();
    }
}

module.exports = {
    authLoginValidation,
};
