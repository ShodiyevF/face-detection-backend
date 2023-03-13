const { error } = require('../config/error.names');

async function getUserImgValidation(req, res, next) {
    const params = req.params;

    if (!params.user_id.match('^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$')) {
        return res.status(403).json({
            status: 403,
            error: error.VALIDATION_ERROR_USER_USER_ID_UUID,
            message: `user_id uuid bo'lishi kerak`,
        });
    } else {
        next();
    }
}

async function createUserValidation(req, res, next) {
    const body = req.body;

    if (!body.user_firstname) {
        return res.status(403).json({
            status: 403,
            error: error.VALIDATION_ERROR_USER_FIRSTNAME_REQUIRED,
            message: 'user_firstname majburiy',
        });
    } else if (!body.user_firstname.trim()) {
        return res.status(403).json({
            status: 403,
            error: error.VALIDATION_ERROR_USER_FIRSTNAME_STRING,
            message: `user_firstname da nimadur yozilishi kerak !`,
        });
    } else if (body.user_firstname.trim().length > 30) {
        return res.status(403).json({
            status: 403,
            error: error.VALIDATION_ERROR_USER_FIRSTNAME_LENGTH,
            message: `user_firstname uzunligi 30tadan kichik bo'lishi kerak`,
        });
    } else if (!body.user_lastname) {
        return res.status(403).json({
            status: 403,
            error: error.VALIDATION_ERROR_USER_LASTNAME_REQUIRED,
            message: `user_lastname majburiy`,
        });
    } else if (!body.user_lastname.trim()) {
        return res.status(403).json({
            status: 403,
            error: error.VALIDATION_ERROR_USER_LASTNAME_STRING,
            message: `user_lastname da nimadur yozilishi kerak !`,
        });
    } else if (body.user_lastname.trim().length > 30) {
        return res.status(403).json({
            status: 403,
            error: error.VALIDATION_ERROR_USER_LASTNAME_LENGTH,
            message: `user_lastname uzunligi 30tadan kichik bo'lishi kerak`,
        });
    } else if (!body.role_id) {
        return res.status(403).json({
            status: 403,
            error: error.VALIDATION_ERROR_USER_REQUIRED,
            message: `role_id majburiy`,
        });
    } else if (!body.role_id.trim()) {
        return res.status(403).json({
            status: 403,
            error: error.VALIDATION_ERROR_USER_ROLEID_STRING,
            message: `role_id da nimadur yozilishi kerak !`,
        });
    } else if (!body.role_id.match('^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$')) {
        return res.status(403).json({
            status: 403,
            error: error.VALIDATION_ERROR_USER_ROLEID_UUID,
            message: `role_id uuid bo'lishi kerak`,
        });
    } else if (!body.branch_id) {
        return res.status(403).json({
            status: 403,
            error: error.VALIDATION_ERROR_USER_BRANCHID_REQUIRED,
            message: `branch_id majburiy`,
        });
    } else if (!body.branch_id.trim()) {
        return res.status(403).json({
            status: 403,
            error: error.VALIDATION_ERROR_USER_BRANCHID_STRING,
            message: `branch_id da nimadur yozilishi kerak !`,
        });
    } else if (!body.branch_id.match('^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$')) {
        return res.status(403).json({
            status: 403,
            error: error.VALIDATION_ERROR_USER_BRANCHID_UUID,
            message: `branch_id uuid bo'lishi kerak`,
        });
    } else if (!body.allowed_branches) {
        return res.status(403).json({
            status: 403,
            error: error.VALIDATION_ERROR_USER_ALLOWEBBRANCHES_REQUIRED,
            message: `allowed_branches majburiy`,
        });
    } else if (!body.allowed_branches.trim()) {
        return res.status(403).json({
            status: 403,
            error: error.VALIDATION_ERROR_USER_ALLOWEBBRANCHES_STRING,
            message: `allowed_branches da nimadur yozilishi kerak !`,
        });
    } else if (body.user_email && !body.user_email.trim()) {
        return res.status(403).json({
            status: 403,
            error: error.VALIDATION_ERROR_USER_EMAIL_STRING,
            message: `user_email da nimadur yozilishi kerak !`,
        });
    } else if (body.user_email && body.user_email.trim().length > 64) {
        return res.status(403).json({
            status: 403,
            error: error.VALIDATION_ERROR_USER_EMAIL_LENGTH,
            message: `user_email uzunligi 64tadan kichik bo'lishi kerak`,
        });
    } else if (body.user_email && !body.user_password) {
        return res.status(403).json({
            status: 403,
            error: error.VALIDATION_ERROR_USER_PASSWORD_REQUIRED,
            message: `user_password majburiy`,
        });
    } else if (body.user_email && body.user_password && !body.user_password.trim()) {
        return res.status(403).json({
            status: 403,
            error: error.VALIDATION_ERROR_USER_PASSWORD_STRING,
            message: `user_password da nimadur yozilishi kerak !`,
        });
    } else if (body.user_email && body.user_password && body.user_password.trim().length > 64) {
        return res.status(403).json({
            status: 403,
            error: error.VALIDATION_ERROR_USER_PASSWORD_LENGTH,
            message: `user_password uzunligi 64tadan kichik bo'lishi kerak`,
        });
    } else {
        next();
    }
}

async function updateUserValidation(req, res, next) {
    const body = req.body;
    const params = req.params;

    if (!params.user_id.match('^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$')){
        return res.status(403).json({
            status: 403,
            error: error.VALIDATION_ERROR,
            message: `user_id uuid bo'lishi kerak !`,
        });
    } else if (body.user_firstname && !body.user_firstname.trim()) {
        return res.status(403).json({
            status: 403,
            error: error.VALIDATION_ERROR,
            message: `user_firstname da nimadur yozilishi kerak !`,
        });
    } else if (body.user_firstname && body.user_firstname.trim().length > 30) {
        return res.status(403).json({
            status: 403,
            error: error.VALIDATION_ERROR,
            message: `user_firstname uzunligi 30tadan kichik bo'lishi kerak`,
        });
    } else if (body.user_lastname && !body.user_lastname.trim()) {
        return res.status(403).json({
            status: 403,
            error: error.VALIDATION_ERROR,
            message: `user_lastname da nimadur yozilishi kerak !`,
        });
    } else if (body.user_lastname && body.user_lastname.trim().length > 30) {
        return res.status(403).json({
            status: 403,
            error: error.VALIDATION_ERROR,
            message: `user_lastname uzunligi 30tadan kichik bo'lishi kerak`,
        });
    } else if (body.role_id && !body.role_id.match('^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$')) {
        return res.status(403).json({
            status: 403,
            error: error.VALIDATION_ERROR,
            message: `role_id uuid bo'lishi kerak`,
        });
    } else if (body.branch_id && !body.branch_id.match('^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$')) {
        return res.status(403).json({
            status: 403,
            error: error.VALIDATION_ERROR,
            message: `branch_id uuid bo'lishi kerak`,
        });
    } else if (body.user_email && body.user_email.trim().length > 64) {
        return res.status(403).json({
            status: 403,
            error: error.VALIDATION_ERROR,
            message: `user_email uzunligi 64tadan kichik bo'lishi kerak`,
        });
    } else if (body.user_email && !body.user_password) {
        return res.status(403).json({
            status: 403,
            error: error.VALIDATION_ERROR,
            message: `user_password majburiy`,
        });
    } else if (body.user_email && body.user_password && body.user_password.trim().length > 64) {
        return res.status(403).json({
            status: 403,
            error: error.VALIDATION_ERROR,
            message: `user_password uzunligi 64tadan kichik bo'lishi kerak`,
        });
    } else {
        next();
    }
}

async function deleteUserValidation(req, res, next) {
    const params = req.params;

    console.log(params.user_id);
    if (!params.user_id.match('^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$')) {
        return res.status(403).json({
            status: 403,
            error: error.VALIDATION_ERROR,
            message: `user_id uuid bo'lishi kerak`,
        });
    } else {
        next();
    }
}

module.exports = {
    getUserImgValidation,
    createUserValidation,
    updateUserValidation,
    deleteUserValidation,
};
