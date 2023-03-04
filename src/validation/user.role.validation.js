const { error } = require('../config/error.names');

function userRoleValidation(req, res, next) {
    const body = req.body;

    console.log(body);
    if (!body.role_name) {
        res.json({
            status: 404,
            error: error.VALIDATION_ERROR,
            message: 'role_name kiritish majburiy',
        });
    } else if (body.role_name.length > 64) {
        res.json({
            status: 404,
            error: error.VALIDATION_ERROR,
            message: `userRole name uzunligi 64 dan kichik bo'lishi kerak`,
        });
    } else {
        next();
    }
}

function deleteUserRoleValidation(req, res, next) {
    const params = req.params;
    console.log(params);
    if (!params.role_id.match('^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$')) {
        res.json({
            status: 404,
            error: error.VALIDATION_ERROR,
            message: `kasb uuid bo'lishi kerek`,
        });
    } else {
        next();
    }
}

module.exports = { userRoleValidation, deleteUserRoleValidation };
