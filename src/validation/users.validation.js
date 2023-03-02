const { error } = require('../config/error.names');
const { uniqRow } = require('../lib/pg');

async function createUserValidation(req, res, next) {
    const body = req.body;
    
    if (!body.user_firstname) {
        res.json({
            status: 404,
            error: error.VALIDATION_ERROR,
            message: 'user_firstname majburiy',
        });
    } else if (body.user_firstname.length > 30) {
        res.json({
            status: 404,
            error: error.VALIDATION_ERROR,
            message: `user_firstname uzunligi 30tadan kichik bo'lishi kerak`,
        });
    } else if (!body.user_lastname) {
        res.json({
            status: 404,
            error: error.VALIDATION_ERROR,
            message: `user_lastname majburiy`,
        });
    } else if (!body.user_lastname.length > 30) {
        res.json({
            status: 404,
            error: error.VALIDATION_ERROR,
            message: `user_lastname uzunligi 30tadan kichik bo'lishi kerak`,
        });
    } else if (!body.role_id) {
        res.json({
            status: 404,
            error: error.VALIDATION_ERROR,
            message: `role_id majburiy`,
        });
    } else if (!body.role_id.match('^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$')) {
        res.json({
            status: 404,
            error: error.VALIDATION_ERROR,
            message: `role_id uuid bo'lishi kerak`,
        });
    } else if (!body.branch_id) {
        res.json({
            status: 404,
            error: error.VALIDATION_ERROR,
            message: `branch_id majburiy`,
        });
    } else if (!body.branch_id.match('^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$')) {
        res.json({
            status: 404,
            error: error.VALIDATION_ERROR,
            message: `branch_id uuid bo'lishi kerak`,
        });
    } else if (!body.allowed_branches) {
        res.json({
            status: 404,
            error: error.VALIDATION_ERROR,
            message: `allowed_branches majburiy`,
        });
    } else if (body.user_email && body.user_email.length > 64) {
        res.json({
            status: 404,
            error: error.VALIDATION_ERROR,
            message: `user_email uzunligi 64tadan kichik bo'lishi kerak`,
        });
    } else if (body.user_email && !body.user_password) {
        res.json({
            status: 404,
            error: error.VALIDATION_ERROR,
            message: `user_password majburiy`,
        });
    } else if (body.user_email && body.user_password && body.user_password.length > 64) {
        res.json({
            status: 404,
            error: error.VALIDATION_ERROR,
            message: `user_password uzunligi 64tadan kichik bo'lishi kerak`,
        });
    }
     else {
        next()
    }
}

module.exports = {
    createUserValidation,
};
