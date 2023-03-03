const { error } = require('../../config/error.names');
const { uniqRow } = require('../../lib/pg');

async function createUserRoleModel(body) {
    const userRole = await uniqRow('select * from userrole where role_name = $1', body.role_name);
    if (userRole.rows.length) {
        return {
            action: true,
            status: 400,
            error: error.USERROLE_ALREADY_EXISTS,
            message: 'userrole already exists',
        };
    }
    await uniqRow(`insert into userrole(role_name) values($1)`, body.role_name);
    const role = await uniqRow('select * from userrole where role_name = $1', body.role_name);
    return role.rows;
}

async function getUserRoleModel() {
    const userRole = await uniqRow('select * from userrole;');
    return userRole.rows;
}

module.exports = { createUserRoleModel, getUserRoleModel };
