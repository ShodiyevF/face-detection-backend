const { uniqRow } = require('../../lib/pg');

async function getContollerModel() {
    const controllers = await uniqRow('select * from controllers');
    for (const controller of controllers) {
        const branch = await uniqRow('select * from branches where branch_id = $1', controller.branch_id);

        controller.branch = branch.rows[0];

        delete controller.branch_id;
    }

    return controllers.rows;
}

module.exports = {
    getContollerModel,
};
