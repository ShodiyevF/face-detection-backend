const { error } = require('../config/error.names');

function createBranchValidation(req, res, next) {
    const body = req.body;
    if (!body.branch_name) {
        res.status(403).json({
            status: 403,
            error: error.VALIDATION_ERROR_BRANCHNAME_REQUIRED,
            message: 'branch_name majburiy',
        });
    } else if (!body.branch_name.trim()) {
        res.status(403).json({
            status: 403,
            error: error.VALIDATION_ERROR_BRANCHNAME_REQUIRED,
            message: `branch_name bo'sh bo'lmasligi kerak`,
        });
    } else if (body.branch_name.length > 30) {
        res.status(403).json({
            status: 403,
            error: error.VALIDATION_ERROR_BRANCHNAME_LENGTH,
            message: `branch_name uzunligi 30tadan kichik bo'lishi kerak`,
        });
    } else {
        next();
    }
}

function updateBranchValidation(req, res, next) {
    const body = req.body;
    const params = req.params;

    if (!params.branch_id.match('^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$')) {
        res.status(403).json({
            status: 403,
            error: error.VALIDATION_ERROR,
            message: `Filial uuid bo'lishi kerek`,
        });
    } else if (!body.branch_name) {
        res.status(403).json({
            status: 403,
            error: error.VALIDATION_ERROR_BRANCHNAME_REQUIRED,
            message: `branch_name majburiy`,
        });
    } else if (!body.branch_name.trim()) {
        res.status(403).json({
            status: 403,
            error: error.VALIDATION_ERROR_BRANCH_STRING,
            message: `branch_name ga nimadur kiritish kerak !`,
        });
    } else if (body.branch_name.trim().length > 30) {
        res.status(403).json({
            status: 403,
            error: error.VALIDATION_ERROR_BRANCHNAME_LENGTH,
            message: `branch_name uzunligi 30tadan kichik bo'lishi kerak`,
        });
    } else {
        next();
    }
}

function deleteBranchValidation(req, res, next) {
    const params = req.params;
    if (!params.branch_id.match('^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$')) {
        res.status(403).json({
            status: 403,
            error: error.VALIDATION_ERROR_BRANCH_UUID,
            message: `Filial uuid bo'lishi kerek`,
        });
    } else {
        next();
    }
}

module.exports = {
    createBranchValidation,
    deleteBranchValidation,
    updateBranchValidation,
};
