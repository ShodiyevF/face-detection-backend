const { getUsersModel } = require("./users.model");

async function getUsersCtrl(req, res) {
    const model = await getUsersModel()
    res.status(200).json(model)
}

module.exports = {
    getUsersCtrl
}