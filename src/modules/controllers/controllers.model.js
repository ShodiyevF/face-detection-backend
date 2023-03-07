const { error } = require('../../config/error.names');
const { uniqRow } = require('../../lib/pg');

async function getContollerModel() {
    const controllers = await uniqRow('select * from controllers');
    for (const controller of controllers.rows) {
        const branch = await uniqRow('select * from branches where branch_id = $1', controller.branch_id);

        controller.branch = branch.rows[0];

        delete controller.branch_id;
    }

    return controllers.rows;
}

async function createContollerModel(body) {

    const { controller_name, controller_url, controller_username, controller_password, branch_id } = body

    let name = controller_name.trim()
    let url = controller_url.trim()
    let username = controller_username.trim()
    let password = controller_password.trim()
    let branchid = branch_id.trim()
    
    const controllers = await uniqRow('select * from controllers where controller_name = $1', name);
    
    if (controllers.rows.length) {
        return {
            action: true,
            status: 409,
            error: error.CONTROLLER_ALREADY_EXISTS,
            message: `Bunday controller qo'shilgan !`,
        };
    }

    const branch = await uniqRow('select * from branches where branch_id = $1', branchid)

    if (!branch.rows.length) {
        return {
            action: true,
            status: 404,
            error: error.BRANCH_NOT_FOUND,
            message: `Bunday filial topilmadi !`,
        };
    }
    
    const query = `insert into controllers (controller_name, controller_url, controller_username, controller_password, branch_id) values ($1,$2,$3,$4,$5)`
    await uniqRow(query, name, url, username, password, branchid)
    
    const controller = await getContollerModel()
    const result = controller.filter(el => el.controller_name == controller_name)
    return result
}

module.exports = {
    getContollerModel,
    createContollerModel
};
