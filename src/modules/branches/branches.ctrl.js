const { createBrachesModel, deleteBranchModel, readBranchModel, updateBranchModel } = require('./branches.model');

async function readController(req, res) {
    const model = await readBranchModel(req.body);
    if (model.action) {
        delete model.action;
        res.json(model);
    } else {
        res.json(model);
    }
}

async function createController(req, res) {
    const model = await createBrachesModel(req.body);
    if (model.action) {
        delete model.action;
        res.json(model);
    } else {
        res.json({
            status: 200,
            message: `Muvaffaqiyatli qo'shildi`,
        });
    }
}

async function updateController(req, res) {
    const model = await updateBranchModel(req.params, req.body);
    if (model.action) {
        delete model.action;
        res.json(model);
    } else {
        res.json({
            status: 200,
            message: `Muvaffaqiyatli o'zgartirildi`,
            data: model
        });
    }
}

async function deleteController(req, res) {
    const model = await deleteBranchModel(req.params);
    if (model.action) {
        delete model.action;
        res.json(model);
    } else {
        res.json({
            status: 200,
            message: `Muvaffaqiyatli o'chirildi`,
        });
    }
}

module.exports = {
    createController,
    readController,
    updateController,
    deleteController,
};
