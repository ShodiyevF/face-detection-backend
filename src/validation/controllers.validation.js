const { error } = require('../config/error.names');

function createControllerValidation(req, res, next) {
    const { controller_name, controller_url, controller_username, controller_password, branch_id } = req.body;

    if (!controller_name) {
        res.json({
            status: 403,
            error: error.VALIDATION_ERROR_CONTROLLERNAME_REQUIRED,
            message: 'controller_name kiritish majburiy',
        });
    } else if (!controller_name.trim()) {
        res.json({
            status: 403,
            error: error.VALIDATION_ERROR_CONTROLLERNAME_STRING,
            message: `controller_name ga nimadur kiritish kerak !`,
        });
    } else if (controller_name.trim().length > 30) {
        res.json({
            status: 403,
            error: error.VALIDATION_ERROR_CONTROLLERNAME_LENGTH,
            message: `controller_name uzunligi 30 dan kichik bo'lishi kerak`,
        });
    } else if (!controller_url) {
        res.json({
            status: 403,
            error: error.VALIDATION_ERROR_CONTROLLERURL_REQUIRED,
            message: 'controller_url kiritish majburiy',
        });
    } else if (!controller_url.trim()) {
        res.json({
            status: 403,
            error: error.VALIDATION_ERROR_CONTROLLERURL_STRING,
            message: `controller_url ga nimadur kiritish kerak !`,
        });
    } else if (controller_url.trim().length > 124) {
        res.json({
            status: 403,
            error: error.VALIDATION_ERROR_CONTROLLERURL_LENGTH,
            message: `controller_url uzunligi 124 dan kichik bo'lishi kerak`,
        });
    } else if (!controller_username) {
        res.json({
            status: 403,
            error: error.VALIDATION_ERROR_CONTROLLERUSERNAME_REQUIRED,
            message: 'controller_username kiritish majburiy',
        });
    } else if (!controller_username.trim()) {
        res.json({
            status: 403,
            error: error.VALIDATION_ERROR_CONTROLLERUSERNAME_STRING,
            message: `controller_username ga nimadur kiritish kerak !`,
        });
    } else if (controller_username.trim().length > 40) {
        res.json({
            status: 403,
            error: error.VALIDATION_ERROR_CONTROLLERUSERNAME_LENGTH,
            message: `controller_username uzunligi 40 dan kichik bo'lishi kerak`,
        });
    } else if (!controller_password) {
        res.json({
            status: 403,
            error: error.VALIDATION_ERROR_CONTROLLERPASSWORD_REQUIRED,
            message: 'controller_password kiritish majburiy',
        });
    } else if (!controller_password.trim()) {
        res.json({
            status: 403,
            error: error.VALIDATION_ERROR_CONTROLLERPASSWORD_STRING,
            message: `controller_password ga nimadur kiritish kerak !`,
        });
    } else if (controller_password.trim().length > 40) {
        res.json({
            status: 403,
            error: error.VALIDATION_ERROR_CONTROLLERPASSWORD_LENGTH,
            message: `controller_password uzunligi 40 dan kichik bo'lishi kerak`,
        });
    } else if (!branch_id) {
        res.json({
            status: 403,
            error: error.VALIDATION_ERROR_CONTROLLERPASSWORD_REQUIRED,
            message: 'branch_id kiritish majburiy',
        });
    } else if (!branch_id.match('^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$')) {
        res.json({
            status: 403,
            error: error.VALIDATION_ERROR_CONTROLLERPASSWORD_STRING,
            message: `branch_id UUID bo'lishi kerak !`,
        });
    } else {
        next();
    }
}

function updateControllerValidation(req, res, next) {
    const { controller_name, controller_url, controller_username, controller_password, branch_id } = req.body;

    if (controller_name && !controller_name.trim()) {
        res.json({
            status: 403,
            error: error.VALIDATION_ERROR_CONTROLLERNAME_REQUIRED,
            message: 'controller_name ga nimadur kiritish kerak',
        });
    } else if (controller_name && controller_name.trim().length > 30) {
        res.json({
            status: 403,
            error: error.VALIDATION_ERROR_CONTROLLERNAME_LENGTH,
            message: `controller_name uzunligi 30 dan kichik bo'lishi kerak`,
        });
    } else if (controller_url && !controller_url.trim()) {
        res.json({
            status: 403,
            error: error.VALIDATION_ERROR_CONTROLLERURL_STRING,
            message: `controller_url ga nimadur kiritish kerak !`,
        });
    } else if (controller_url && controller_url.trim().length > 124) {
        res.json({
            status: 403,
            error: error.VALIDATION_ERROR_CONTROLLERURL_LENGTH,
            message: `controller_url uzunligi 124 dan kichik bo'lishi kerak`,
        });
    } else if (controller_username && !controller_username.trim()) {
        res.json({
            status: 403,
            error: error.VALIDATION_ERROR_CONTROLLERUSERNAME_STRING,
            message: `controller_username ga nimadur kiritish kerak !`,
        });
    } else if (controller_username && controller_username.trim().length > 40) {
        res.json({
            status: 403,
            error: error.VALIDATION_ERROR_CONTROLLERUSERNAME_LENGTH,
            message: `controller_username uzunligi 40 dan kichik bo'lishi kerak`,
        });
    } else if (controller_password && !controller_password.trim()) {
        res.json({
            status: 403,
            error: error.VALIDATION_ERROR_CONTROLLERPASSWORD_STRING,
            message: `controller_password ga nimadur kiritish kerak !`,
        });
    } else if (controller_password && controller_password.trim().length > 40) {
        res.json({
            status: 403,
            error: error.VALIDATION_ERROR_CONTROLLERPASSWORD_LENGTH,
            message: `controller_password uzunligi 40 dan kichik bo'lishi kerak`,
        });
    } else if (branch_id && !branch_id.match('^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$')) {
        res.json({
            status: 403,
            error: error.VALIDATION_ERROR_CONTROLLERPASSWORD_STRING,
            message: `branch_id UUID bo'lishi kerak !`,
        });
    } else {
        next();
    }
}

function deleteControllerValidation(req, res, next) {
    const { controller_id } = req.params;

    if (!controller_id) {
        res.json({
            status: 403,
            error: error.VALIDATION_ERROR_CONTROLLERID_REQUIRED,
            message: 'controller_id majburiy',
        });
    } else if (!controller_id.match('^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$')) {
        res.json({
            status: 403,
            error: error.VALIDATION_ERROR_CONTROLLERID_UUID,
            message: `controller_id UUID bo'lishi kerak`,
        });
    } else {
        next();
    }
}

module.exports = {
    createControllerValidation,
    updateControllerValidation,
    deleteControllerValidation
};