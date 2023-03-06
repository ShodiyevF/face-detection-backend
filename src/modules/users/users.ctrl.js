const { getUsersModel, createUsersModel, updateUsersModel, deleteUserModel, getUserImgModel } = require('./users.model');
const path = require('path');

async function getUsersCtrl(req, res) {
    const model = await getUsersModel();
    res.status(200).json(model);
}

async function getUserImgCtrl(req, res) {
    const model = await getUserImgModel(req.params);
    if (model.action) {
        delete model.action;
        res.status(model.status).json(model);
    } else {
        console.log(path.join(process.cwd(), '/uploads/' + model));
        res.status(200).sendFile(path.join(process.cwd(), '/uploads/' + model));
    }
}

async function createUsersCtrl(req, res) {
    const model = await createUsersModel(req.body, req.files);
    if (model.action) {
        delete model.action;
        res.status(model.status).json(model);
    } else {
        res.status(201).json({
            status: 201,
            message: 'The user successfully created!',
            data: model,
        });
    }
}

async function updateUsersCtrl(req, res) {
    const model = await updateUsersModel(req.body, req.files, req.params);
    if (model.action) {
        delete model.action;
        res.status(model.status).json(model);
    } else {
        res.status(200).json({
            status: 200,
            message: 'The user successfully updated!',
            data: model,
        });
    }
}

async function deleteUserCtrl(req, res) {
    const model = await deleteUserModel(req.params);
    if (model && model.action) {
        delete model.action;
        res.status(model.status).json(model);
    } else {
        res.status(200).json({
            status: 200,
            message: 'The user successfully delete!',
            data: model,
        });
    }
}

module.exports = {
    getUsersCtrl,
    getUserImgCtrl,
    createUsersCtrl,
    updateUsersCtrl,
    deleteUserCtrl,
};
