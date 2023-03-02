const { getUsersModel, createUsersModel } = require('./users.model');

async function getUsersCtrl(req, res) {
    const model = await getUsersModel();
    res.status(200).json(model);
}

async function createUsersCtrl(req, res) {
    const model = await createUsersModel(req.body, req.files);
    if(model.action){
        delete model.action
        res.status(model.status).json(model);
    } else {
        res.status(201).json({
            status: 201,
            message: 'The user successfully created!',
            data: model,
        });
    }
}

module.exports = {
    getUsersCtrl,
    createUsersCtrl
};
