const { createUserRoleModel, getUserRoleModel, updateUserRoleModel, deleteUserRoleModel } = require('./user.role.model');

async function createUserRoleCtrl(req, res) {
    const userRole = await createUserRoleModel(req.body);

    if (userRole.action) {
        delete userRole.action;
        res.status(userRole.status).json(userRole);
    } else {
        res.status(201).json({
            status: 201,
            message: 'UserRole has created',
        });
    }
}

async function getUserRoleCtrl(req, res) {
    const userRole = await getUserRoleModel();
    res.json(userRole);
}

async function updateUserRoleCtrl(req, res) {
    const userRole = await updateUserRoleModel(req.body);

    if (userRole.action) {
        delete userRole.action;
        res.status(userRole.status).json(userRole);
    } else {
        res.status(userRole.status).json({
            status: 200,
            message: `Muvafaqqiyatli o'zgartirildi!`,
        });
    }
}

async function deleteUserRoleCtrl(req, res) {
    const userRole = await deleteUserRoleModel(req.params);

    if (userRole.action) {
        delete userRole.action;
        res.json(userRole);
    } else {
        res.json({
            status: 200,
            message: `Muvafaqqiyatli o'chirildi !`,
        });
    }
}

module.exports = {
    createUserRoleCtrl,
    getUserRoleCtrl,
    updateUserRoleCtrl,
    deleteUserRoleCtrl,
};
