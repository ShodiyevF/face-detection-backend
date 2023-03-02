const { createToken } = require('../../lib/jwt');
const { loginModel } = require('./auth.model');

async function loginCtrl(req, res) {
    const model = await loginModel(req.body);
    if (model.action) {
        delete model.action;
        res.status(model.status).json(model);
    } else {
        res.status(200).json({
            status: 200,
            message: `Muvaffaqiyatli tizimga kirdingiz`,
            token: await createToken(model),
        });
    }
}

module.exports = {
    loginCtrl,
};
