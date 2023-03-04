const {
    createUserRoleModel,
    getUserRoleModel,
    updateUserRoleModel,
    deleteUserRoleModel,
} = require('./user.role.model');

async function getUserRoleCtrl(req, res) {
    const userRole = await getUserRoleModel();
    res.status(200).json(userRole);
}

async function createUserRoleCtrl(req, res) {
    const userRole = await createUserRoleModel(req.body);

    if (userRole.action) {
        delete userRole.action;
        res.status(userRole.status).json(userRole);
    } else {
         res.status(201).json({
            status: 201,
            message: 'UserRole has created',
            data: userRole
        });
    }
}

async function updateUserRoleCtrl(req, res) {
    const userRole = await updateUserRoleModel(req.body, req.params);

    if (userRole.action) {
        delete userRole.action;
        res.status(userRole.status).json(userRole);
    } else {
        res.status(200).json({
            status: 200,
            message: `Muvafaqqiyatli o'zgartirildi!`,
            data: userRole
        });
    }
}

async function deleteUserRoleCtrl(req, res) {
    const userRole = await deleteUserRoleModel(req.params);

    if(userRole.action){
        delete userRole.action;
        res.status(userRole.status).json(userRole);
    } else {
        res.status(200).json({
            status: 200,
            message: `Muvafaqqiyatli o'chirildi !`,
            data: userRole
        });
    }
}

module.exports = {
    createUserRoleCtrl,
    getUserRoleCtrl,
    updateUserRoleCtrl,
    deleteUserRoleCtrl
};
