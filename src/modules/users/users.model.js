const { UPLOAD_IMG_NAME, UPLOAD_FOLDER } = require('../../config/upload');
const { error } = require('../../config/error.names');
const { uniqRow } = require('../../lib/pg');
const path = require('path');
const fs = require('fs');

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
    from users`;

    const selectUser = await uniqRow(querySelectUser);

    for (const user of selectUser.rows) {
        const allowedbranch = await uniqRow('select * from allowedbranch where user_id = $1', user.user_id);
        const allowedBranches = [];
        for (const allowed of allowedbranch.rows) {
            const branch = await uniqRow('select * from branches where branch_id = $1', allowed.branch_id);
            allowedBranches.push(branch.rows[0]);
        }
        const selectBranch = await uniqRow('select * from branches where branch_id = $1', user.branch_id);
        const selectRoles = await uniqRow('select * from userrole where role_id = $1', user.role_id);

        user.user_img = 'http://192.168.1.139:3001/api/users/img/' + user.user_id;
        user.allowed_branches = allowedBranches;
        user.branch = selectBranch.rows[0];
        user.role = selectRoles.rows[0];

        delete user.branch_id;
        delete user.role_id;
    }

    return selectUser.rows;
}

async function getUserImgModel(params) {
    const user = await uniqRow('select * from users where user_id = $1', params.user_id);

    if (!user.rows.length) {
        return {
            action: true,
            status: 404,
            error: error.USER_NOT_FOUND,
            message: 'Bunday foydalanuvchi topilmadi !',
        };
    }

    return user.rows[0].user_img;
}

async function createUsersModel(body, files) {
    if (body.user_email) {
        const user = await uniqRow('select * from users where user_email = $1', body.user_email);
        if (user.rows.length) {
            return {
                action: true,
                status: 409,
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
        if (allowBranch.match('^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$')) {
            const branches = await uniqRow('select * from branches where branch_id = $1', allowBranch);
            if (!branches.rows.length) {
                return {
                    action: true,
                    status: 404,
                    error: error.BRANCH_NOT_FOUND,
                    message: `-> ${allowBranch} Bunday branch topilmadi !`,
                };
            }
        } else {
            return {
                action: true,
                status: 400,
                error: error.BRANCH_NOT_UUID,
                message: `-> ${allowBranch} <- UUID bo'lishi kerak`,
            };
        }
    }

    const queryInsertUser = `
    insert into users (user_firstname, user_lastname, user_img, user_email, user_password, role_id, branch_id) values ($1,$2,$3,$4,$5,$6,$7) returning *
    `;

    const ext = path.extname(files[UPLOAD_IMG_NAME].name);
    const filename = `${Date.now()}-${String(Math.round(Math.random() * 1e9)).padEnd(15, '0') + ext}`;

    const createdUser = await uniqRow(
        queryInsertUser,
        body.user_firstname.trim(),
        body.user_lastname.trim(),
        filename,
        body.user_email ? body.user_email.trim() : null,
        body.user_email && body.user_password ? body.user_password.trim() : null,
        body.role_id.trim(),
        body.branch_id.trim(),
    );

    const queryAllowedBranches = `
        insert into allowedbranch (branch_id, user_id) values ($1,$2)
        `;

    for (const i of allowedBranches) {
        if (i.length) {
            await uniqRow(queryAllowedBranches, i.trim(), createdUser.rows[0].user_id);
        }
    }

    files[UPLOAD_IMG_NAME].mv(UPLOAD_FOLDER + '\\' + filename);

    const users = (await getUsersModel()).find(el => el.user_id == createdUser.rows[0].user_id);

    return users;
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
    if (files && files[UPLOAD_IMG_NAME]) {
        await fs.unlinkSync(UPLOAD_FOLDER + '\\' + user_img);
        const ext = path.extname(files[UPLOAD_IMG_NAME].name);
        const filename = `${Date.now()}-${String(Math.round(Math.random() * 1e9)).padEnd(15, '0') + ext}`;
        user_img = filename;
    }
    const user_firstname = body.user_firstname && body.user_firstname.length ? body.user_firstname.trim() : user.rows[0].user_firstname;
    const user_lastname = body.user_lastname && body.user_lastname.length ? body.user_lastname.trim() : user.rows[0].user_lastname;
    const user_email =
        body.user_email && body.user_email.length ? (body.user_email == 'false' ? null : body.user_email.trim()) : user.rows[0].user_email;
    const user_password =
        body.user_password && body.user_password.length
            ? body.user_password == 'false'
                ? null
                : body.user_password.trim()
            : user.rows[0].user_password;
    const role_id = body.role_id && body.role_id.length ? body.role_id.trim() : user.rows[0].role_id;
    const branch_id = body.branch_id && body.branch_id.length ? body.branch_id.trim() : user.rows[0].branch_id;

    if (body.allowed_branches && body.allowed_branches.length) {
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
            const checkBranch = await uniqRow('select * from branches where branch_id = $1', branch);
            if (!checkBranch.rows.length) {
                return {
                    action: true,
                    status: 404,
                    error: error.BRANCH_NOT_FOUND,
                    message: `-> ${branch} <- bunday branch topilmadi !`,
                };
            }
        }
        await uniqRow(`delete from allowedbranch where user_id = $1`, params.user_id);
        const queryAllowedBranches = `insert into allowedbranch (branch_id, user_id) values ($1,$2)`;
        for (const i of allowedBranches) {
            console.log(i);
            await uniqRow(queryAllowedBranches, i, params.user_id);
        }
    }

    const queryUpdateUser = `update users set user_firstname = $1, user_lastname = $2, user_img = $3, user_email = $4, user_password = $5, role_id = $6, branch_id = $7 where user_id = $8`;

    await uniqRow(queryUpdateUser, user_firstname, user_lastname, user_img, user_email, user_password, role_id, branch_id, params.user_id);

    if (files && files[UPLOAD_IMG_NAME]) {
        files[UPLOAD_IMG_NAME].mv(UPLOAD_FOLDER + '\\' + user_img);
    }

    const users = (await getUsersModel()).find(el => el.user_id == params.user_id);

    return users;
}

async function deleteUserModel(params) {
    const user = await uniqRow('select * from users where user_id = $1', params.user_id);

    if (!user.rows.length) {
        return {
            action: true,
            status: 404,
            error: error.USER_NOT_FOUND,
            message: `${params.user_id} Bunday foydalanuvchi topilmadi !`,
        };
    }

    const allowedbranches = await uniqRow('select * from allowedbranch where user_id = $1', params.user_id);

    if (allowedbranches.rows.length) {
        for (const i of allowedbranches.rows) {
            await uniqRow(`delete from allowedbranch where allowedbranch_id = $1`, i.allowedbranch_id);
        }
    }

    await uniqRow('delete from users where user_id = $1', params.user_id);
}

module.exports = {
    getUsersModel,
    getUserImgModel,
    createUsersModel,
    updateUsersModel,
    deleteUserModel,
};
