const { error } = require('../../config/error.names');
const { uniqRow } = require('../../lib/pg');
const path = require('path');

async function getUsersModel() {
    const users = await uniqRow('select * from users');
    return users.rows;
}

async function createUsersModel(body, files) {
    if (body.user_email) {
        const user = await uniqRow('select * from users where user_email = $1', body.user_email)
        if(user.rows.length){
            return {
                action: true,
                status: 400,
                error: error.USER_ALREADY_EXISTS,
                message: 'Bunday emailli bor foydalanuvchi topildi !'
            };
        }
    }
    
    const userroles = await uniqRow('select * from userrole where role_id = $1', body.role_id)
    
    if (!userroles.rows.length) {
        return {
            action: true,
            status: 404,
            error: error.USERROLE_NOT_FOUND,
            message: 'Bunday userrole topilmadi !'
        };
    }
    
    const branches = await uniqRow('select * from branches where branch_id = $1', body.branch_id)
    
    if (!branches.rows.length) {
        return {
            action: true,
            status: 404,
            error: error.BRANCH_NOT_FOUND,
            message: 'Bunday branch topilmadi !'
        };
    }
    
    const allowedBranches = body.allowed_branches.split(',')
    
    for (const allowBranch of allowedBranches) {
        const branches = await uniqRow('select * from branches where branch_id = $1', allowBranch)
        if (!branches.rows.length) {
            return {
                action: true,
                status: 404,
                error: error.BRANCH_NOT_FOUND,
                message: `${allowBranch} Bunday branch topilmadi !`
            };
        }
    }
    
    const queryInsertUser = `
    insert into users (user_firstname, user_lastname, user_img, user_email, user_password, role_id, branch_id) values ($1,$2,$3,$4,$5,$6,$7) returning *
    `

    const ext = path.extname(files['user_img'].name);
    const filename = `${Date.now()}-${String(Math.round(Math.random() * 1e9)).padEnd(15, '0') + ext}`
    
    const createdUser = await uniqRow(queryInsertUser, body.user_firstname, body.user_lastname, filename, body.user_email ? body.user_email : null, body.user_email && body.user_password ? body.user_password : null , body.role_id, body.branch_id)
    
    const queryAllowedBranches = `
    insert into allowedbranch (branch_id, user_id) values ($1,$2)
    `
    
    for (const i of allowedBranches) {
        await uniqRow(queryAllowedBranches, i, createdUser.rows[0].user_id)
        
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
    `
    
    const selectUser = await uniqRow(querySelectUser, createdUser.rows[0].user_id)
    
    return selectUser.rows    
}

module.exports = {
    getUsersModel,
    createUsersModel
};
