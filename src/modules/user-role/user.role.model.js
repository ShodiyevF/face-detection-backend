const { error } = require('../../config/error.names');
const { uniqRow } = require('../../lib/pg');

async function createUserRoleModel(body) {
    const userRole = await uniqRow('select * from userrole where role_name = ($1)', body.role_name);
    console.log(userRole);
    if (userRole.rows.length) {
        return {
            action: true,
            status: 400,
            error: error.USERROLE_ALREADY_EXISTS,
            message: 'Bu kasb allaqachon mavjud',
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

async function updateUserRoleModel(body, params) {
    const userRole = await uniqRow('select * from userrole where role_id = $1, params.role_id');

    if (!userRole.rows.length) {
        return {
            action: true,
            status: 404,
            error: error.USERROLE_NOT_FOUND,
            message: `${params.role_id} bunday kasb topilmadi !`,
        };
    }

    const roleName = await uniqRow('select * from userrole where role_name = $1, body.role_name');

    if (!roleName.rows.length) {
        return {
            action: true,
            status: 404,
            error: error.USERROLE_ALREADY_EXISTS,
            message: 'bunday kasb nomi mavjud',
        };
    }

    const result = await uniqRow('update userrole set role_name = $1 where role_id = $2 returning *', role_name, role_id);

    return result.rows;
}

async function deleteUserRoleModel(params) {
    const userRole = await uniqRow('select * from userrole where role_id = $1', params.role_id);

    if (!userRole.rows.length) {
        return {
            action: true,
            status: 404,
            error: error.USERROLE_NOT_FOUND,
            message: `${params.role_id} bunday kasb topilmadi !`,
        };
    }

    const selecteduser = await uniqRow(`select * from users where role_id = $1`, params.role_id);

    if (selecteduser.rows.length) {
        return {
            action: true,
            status: 400,
            error: error.USERROLE_REFERENCES_WITH_USER,
            message: `${params.role_id} bunday kasb qaysidir foydalanuvchiga ulangan !`,
        };
    }

    const result = await uniqRow('delete from userrole where role_id = ($1) returning *', params.role_id);

    return result.rows;
}

module.exports = { createUserRoleModel, getUserRoleModel, updateUserRoleModel, deleteUserRoleModel };
