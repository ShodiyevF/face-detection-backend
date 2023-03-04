const { error } = require('../../config/error.names');
const { uniqRow } = require('../../lib/pg');
const path = require('path');

async function getUsersModel() {
    const querySelectUser = `
        select
        user_id,
        user_firstname,
        user_lastname,
        user_img,
        user_email,
        role_id,
        branch_id,
        user_createdat
        from users`

    const selectUser = await uniqRow(querySelectUser);

    for (const user of selectUser.rows) {
        const allowedbranch = await uniqRow('select * from allowedbranch where user_id = $1', user.user_id)

        user.allowed_branches = allowedbranch.rows
    }

    return selectUser.rows;
}

async function createUsersModel(body, files) {
    if (body.user_email) {
        const user = await uniqRow('select * from users where user_email = $1', body.user_email);
        if (user.rows.length) {
            return {
                action: true,
                status: 400,
                error: error.USER_ALREADY_EXISTS,
                message: 'Bunday emailli bor foydalanuvchi topildi !',
            };
        }
    }

    const userroles = await uniqRow('select * from userrole where role_id = $1', body.role_id);

    if (!userroles.rows.length) {
        return {
            action: true,
            status: 404,
            error: error.USERROLE_NOT_FOUND,
            message: 'Bunday userrole topilmadi !',
        };
    }

    const branches = await uniqRow('select * from branches where branch_id = $1', body.branch_id);

    if (!branches.rows.length) {
        return {
            action: true,
            status: 404,
            error: error.BRANCH_NOT_FOUND,
            message: 'Bunday branch topilmadi !',
        };
    }

    const allowedBranches = body.allowed_branches.split(',');

    for (const allowBranch of allowedBranches) {
        const branches = await uniqRow('select * from branches where branch_id = $1', allowBranch);
        if (!branches.rows.length) {
            return {
                action: true,
                status: 404,
                error: error.BRANCH_NOT_FOUND,
                message: `${allowBranch} Bunday branch topilmadi !`,
            };
        }
    }

    const queryInsertUser = `
    insert into users (user_firstname, user_lastname, user_img, user_email, user_password, role_id, branch_id) values ($1,$2,$3,$4,$5,$6,$7) returning *
    `;

    const ext = path.extname(files['user_img'].name);
    const filename = `${Date.now()}-${String(Math.round(Math.random() * 1e9)).padEnd(15, '0') + ext}`;

    const createdUser = await uniqRow(
        queryInsertUser,
        body.user_firstname,
        body.user_lastname,
        filename,
        body.user_email ? body.user_email : null,
        body.user_email && body.user_password ? body.user_password : null,
        body.role_id,
        body.branch_id,
    );

    const queryAllowedBranches = `
        insert into allowedbranch (branch_id, user_id) values ($1,$2)
        `;

    for (const i of allowedBranches) {
        await uniqRow(queryAllowedBranches, i, createdUser.rows[0].user_id);
    }

    const querySelectUser = `
        select
        u.user_id,
        u.user_firstname,
        u.user_lastname,
        u.user_img,
        u.user_email,
        u.user_password,
        u.role_id,
        u.branch_id,
        array_agg(ab.allowedbranch_id) as allowed_branches
        from users as u
        inner join allowedbranch as ab on ab.user_id = u.user_id
        where u.user_id = $1
        group by u.user_id,
        u.user_firstname,
        u.user_lastname,
        u.user_img,
        u.user_email,
        u.user_password,
        u.role_id,
        u.branch_id
        `;

    const selectUser = await uniqRow(querySelectUser, createdUser.rows[0].user_id);

    return selectUser.rows;
}

async function updateUsersModel(body, files, params) {
    const user = await uniqRow('select * from users where user_id = $1', params.user_id);

    if (!user.rows.length) {
        return {
            action: true,
            status: 404,
            error: error.USER_NOT_FOUND,
            message: `${params.user_id} Bunday foydalanuvchi topilmadi !`,
        };
    }

    let user_img = user.rows[0].user_img;
    if (files && files['user_img']) {
        const ext = path.extname(files['user_img'].name);
        const filename = `${Date.now()}-${String(Math.round(Math.random() * 1e9)).padEnd(15, '0') + ext}`;
        user_img = filename;
    }

    const user_firstname = body.user_firstname ? body.user_firstname : user.rows[0].user_firstname;
    const user_lastname = body.user_lastname ? body.user_lastname : user.rows[0].user_lastname;
    const user_email = body.user_email ? (body.user_email == 'false' ? null : body.user_email) : user.rows[0].user_email;
    const user_password = body.user_password ? (body.user_password == 'false' ? null : body.user_password) : user.rows[0].user_password;
    const role_id = body.role_id ? body.role_id : user.rows[0].role_id;
    const branch_id = body.branch_id ? body.branch_id : user.rows[0].branch_id;

    if (body.allowed_branches) {
        const allowedBranches = body.allowed_branches.split(',');
        for (const branch of allowedBranches) {
            if (!branch.match('^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$')) {
                return {
                    action: true,
                    status: 400,
                    error: error.THIS_NOT_BRANCH,
                    message: `Filial uuid bo'lishi kerak`,
                };
            }
        }
        await uniqRow(`delete from allowedbranch where user_id = $1`, params.user_id);
        const queryAllowedBranches = `insert into allowedbranch (branch_id, user_id) values ($1,$2)`;
        for (const i of allowedBranches) {
            await uniqRow(queryAllowedBranches, i, params.user_id);
        }
    }

    const queryUpdateUser = `update users set user_firstname = $1, user_lastname = $2, user_img = $3, user_email = $4, user_password = $5, role_id = $6, branch_id = $7 where user_id = $8`;

    await uniqRow(queryUpdateUser, user_firstname, user_lastname, user_img, user_email, user_password, role_id, branch_id, params.user_id);

    const querySelectUser = `
        select
        u.user_id,
        u.user_firstname,
        u.user_lastname,
        u.user_img,
        u.user_email,
        u.user_password,
        u.role_id,
        u.branch_id,
        array_agg(ab.allowedbranch_id) as allowed_branches
        from users as u
        inner join allowedbranch as ab on ab.user_id = u.user_id
        where u.user_id = $1
        group by u.user_id,
        u.user_firstname,
        u.user_lastname,
        u.user_img,
        u.user_email,
        u.user_password,
        u.role_id,
        u.branch_id
        `;

    const selectUser = await uniqRow(querySelectUser, params.user_id);

    return selectUser.rows;
}

module.exports = {
    getUsersModel,
    createUsersModel,
    updateUsersModel,
};
