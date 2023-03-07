const { getContollerModel, createContollerModel } = require('./controllers.model');

async function getContollerCtrl(req, res) {
    const model = await getContollerModel();
    return res.status(200).json(model);
}

async function createContollerCtrl(req, res) {
    const model = await createContollerModel(req.body);
    if (model.action) {
        delete model.action
        return res.status(model.status).json(model)
    } else {
        return res.status(201).json({
            status: 201,
            message: 'Controller successfully created',
            data: model
        })
    }
    return res.status(200).json(model);
}

module.exports = {
    getContollerCtrl,
    createContollerCtrl
};
