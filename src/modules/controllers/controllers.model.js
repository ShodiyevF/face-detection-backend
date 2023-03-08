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

    const controllerUrl = await uniqRow('select * from controllers where controller_url = $1', url);
    
    if (controllerUrl.rows.length) {
        return {
            action: true,
            status: 409,
            error: error.CONTROLLER_URL_ALREADY_EXISTS,
            message: `Bunday controller url qo'shilgan !`,
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

async function updateControllerModel(body, params){
    const { controller_id } = params
    const { controller_name, controller_url, controller_username, controller_password, branch_id } = body
    
    const controller = (await uniqRow(`select * from controllers where controller_id = $1`, controller_id)).rows
    
    if (!controller.length) {
        return {
            action: true,
            status: 404,
            error: error.CONTROLLER_NOT_FOUND,
            message: `Bunday controller topilmadi !`
        }
    }

    const selectedBranch = await uniqRow('select * from branches where branch_id = $1', branch_id)

    if (!selectedBranch.rows.length) {
        return {
            action: true,
            status: 404,
            error: error.BRANCH_NOT_FOUND,
            message: `Bunday filial topilmadi !`
        }
    }

    const name = controller_name && controller_name.length ? controller_name.trim() : controller[0].controller_name
    const url = controller_url && controller_url.length ? controller_url.trim() : controller[0].controller_url
    const username = controller_username && controller_username.length ? controller_username.trim() : controller[0].controller_username
    const password = controller_password && controller_password.length ? controller_password.trim() : controller[0].controller_password
    const branch = branch_id && branch_id.length ? branch_id.trim() : controller[0].branch_id

    const queryUpdateController = `
    update controllers set controller_name = $1, controller_url = $2, controller_username = $3, controller_password = $4, branch_id = $5 where controller_id = $6
    `
    await uniqRow(queryUpdateController, name, url, username, password, branch, controller_id)

    const updatedController = (await getContollerModel()).find(el => el.controller_id == controller_id)

    return updatedController
}

async function deleteControllerModel(params){
    const { controller_id } = params
    
    const controller = (await uniqRow(`select * from controllers where controller_id = $1`, controller_id)).rows
    
    if (!controller.length) {
        return {
            action: true,
            status: 404,
            error: error.CONTROLLER_NOT_FOUND,
            message: `Bunday controller topilmadi !`
        }
    }

    const queryDeleteController = `
    delete from controllers where controller_id = $1 returning *
    `
    const deleted = await uniqRow(queryDeleteController, controller_id)
    return deleted.rows
}

module.exports = {
    getContollerModel,
    createContollerModel,
    updateControllerModel,
    deleteControllerModel
};
