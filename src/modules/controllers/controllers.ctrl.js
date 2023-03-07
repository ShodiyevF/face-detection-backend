const { getContollerModel } = require("./controllers.model");

async function getContollerCtrl(req, res) {
    const model = await getContollerModel()
    return res.status(200).json(model)
}

module.exports = {
    getContollerCtrl
}