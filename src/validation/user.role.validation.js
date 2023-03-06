const { error } = require('../config/error.names');

function createUserRoleValidation(req, res, next) {
    const body = req.body;

    if (!body.role_name) {
        res.json({
            status: 403,
            error: error.VALIDATION_ERROR_USERROLE_REQUIRED,
            message: 'role_name kiritish majburiy',
        });
    } else if (!body.role_name.trim()) {
        res.json({
            status: 403,
            error: error.VALIDATION_ERROR_USERROLE_STRING,
            message: `userRole ga nimadur kiritish kerak !`,
        });
    } else if (body.role_name.length > 64) {
        res.json({
            status: 403,
            error: error.VALIDATION_ERROR_USERROLE_LENGTH,
            message: `userRole name uzunligi 64 dan kichik bo'lishi kerak`,
        });
    } else {
        next();
    }
}

function updateUserRoleValidation(req, res, next) {
    const body = req.body;
    const params = req.params;

    if (!params.role_id.match('^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$')) {
        res.json({
            status: 403,
            error: error.VALIDATION_ERROR_USERROLE_ID_UUID,
            message: `userRole id UUID bo'lishi kerak !`,
        });
    } else if (!body.role_name) {
        res.json({
            status: 403,
            error: error.VALIDATION_ERROR_USERROLE_REQUIRED,
            message: 'role_name kiritish majburiy',
        });
    } else if (!body.role_name.trim()) {
        res.json({
            status: 403,
            error: error.VALIDATION_ERROR_USERROLE_STRING,
            message: `userRole ga nimadur kiritish kerak !`,
        });
    } else if (body.role_name.trim().length > 64) {
        res.json({
            status: 403,
            error: error.VALIDATION_ERROR_USERROLE_LENGTH,
            message: `userRole name uzunligi 64 dan kichik bo'lishi kerak`,
        });
    } else {
        next();
    }
}

function deleteUserRoleValidation(req, res, next) {
    const params = req.params;

    if (!params.role_id) {
        res.json({
            status: 403,
            error: error.VALIDATION_ERROR_USERROLE_REQUIRED,
            message: `role_id kiritish majburiy`,
        });
    } else if (!params.role_id.match('^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$')) {
        res.json({
            status: 403,
            error: error.VALIDATION_ERROR_USERROLE_ID_UUID,
            message: `kasb uuid bo'lishi kerek`,
        });
    } else {
        next();
    }
}

module.exports = { createUserRoleValidation, updateUserRoleValidation, deleteUserRoleValidation };
