const { error } = require('../config/error.names');

function createBranchValidation(req, res, next) {
    const body = req.body;
    if (!body.branch_name) {
        res.json({
            status: 404,
            error: error.VALIDATION_ERROR,
            message: 'branch_name majburiy',
        });
    } else if (body.branch_name.length > 30) {
        res.json({
            status: 404,
            error: error.VALIDATION_ERROR,
            message: `branch_name uzunligi 30tadan kichik bo'lishi kerak`,
        });
    } else {
        next();
    }
}

function updateBranchValidation(req, res, next) {
    const body = req.body;
    const params = req.params;

    if (body.branch_name && body.branch_name.length > 30) {
        res.json({
            status: 404,
            error: error.VALIDATION_ERROR,
            message: `branch_name uzunligi 30tadan kichik bo'lishi kerak`,
        });
    } else if (!params.branch_id.match('^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$')) {
        res.json({
            status: 404,
            error: error.VALIDATION_ERROR,
            message: `Filial uuid bo'lishi kerek`,
        });
    } else {
        next();
    }
}

function deleteBranchValidation(req, res, next) {
    const params = req.params;
    if (!params.branch_id.match('^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$')) {
        res.json({
            status: 404,
            error: error.VALIDATION_ERROR,
            message: `Filial uuid bo'lishi kerek`,
        });
    } else {
        next();
    }
}

module.exports = {
    createBranchValidation,
    deleteBranchValidation,
    updateBranchValidation
};
