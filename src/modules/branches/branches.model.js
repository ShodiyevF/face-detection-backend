const { error } = require('../../config/error.names');
const { uniqRow } = require('../../lib/pg');

async function readBranchModel() {
    const result = await uniqRow('select * from branches');
    if (!result.rows.length) {
        return {
            action: true,
            status: 400,
            error: error.BRANCH_NAME_NOT_FOUND,
            message: 'Bunday nomli filial  topilmadi !',
        };
    }
    return result.rows;
}

async function createBrachesModel(body) {
    const { branch_name } = body;

    const isExist = await uniqRow('select * from branches where branch_name = ($1)', branch_name);
    if (isExist.rows.length > 0) {
        return {
            action: true,
            status: 400,
            error: error.BRANCH_NAME_EXIST,
            message: 'Bunday filial nomi mavjud !',
        };
    }
    const result = await uniqRow('insert into branches (branch_name) values($1) returning * ', branch_name);

    if (result.rows.length) {
        return result.rows[0];
    } else {
        return {
            action: true,
            status: 400,
            error: error.BRANCH_POST_ERROR,
            message: 'Xatolik sodir bo`ldi, qaytadan urunib ko`ring !',
        };
    }
}

async function updateBranchModel(params, body) {
    const { branch_name } = body;
    const { branch_id } = params;

    const findedBranch = await uniqRow('select * from branches where branch_id = ($1)', branch_id);

    if (!findedBranch.rows.length) {
        return {
            action: true,
            status: 404,
            error: error.BRANCH_NAME_NOT_FOUND,
            message: 'Kiritilgan filial topilmadi',
        };
    }

    const branchName = branch_name ? branch_name : findedBranch.rows[0].branch_name

    const findedName = await uniqRow('select * from branches where branch_name = $1', branch_name);

    if (findedName.rows.length) {
        return {
            action: true,
            status: 404,
            error: error.BRANCH_NAME_ALREADY_EXIST,
            message: `Kiritilgan filial allaqachon qo'shilgan, iltimos boshqa nom kiriting`,
        };
    }

    const result = await uniqRow('update branches set branch_name = $1 where branch_id= $2 returning *', branchName, branch_id);
    if (result.rows.length) {
        return result.rows[0];
    } else {
        return {
            action: true,
            status: 400,
            error: error.BRANCH_EDIT_ERROR,
            message: 'Xatolik yuz berdi, qaytadan urunib ko`ring !',
        };
    }
}

async function deleteBranchModel(body) {
    const { branch_id } = body;

    const findedBranch = await uniqRow('select * from branches where branch_id = ($1)', branch_id);

    if (!findedBranch.rows.length) {
        return {
            action: true,
            status: 404,
            error: error.BRANCH_NAME_NOT_FOUND,
            message: 'Kiritilgan filial topilmadi',
        };
    }
    
    const users = await uniqRow('select * from users where branch_id = $1', branch_id)

    if (users.rows.length) {
        return {
            action: true,
            status: 401,
            error: error.BRANCH_DELETE_ERROR,
            message: `O'chirmoqchi bo'lgan filial da bog'langan foydalanuvchi bor`,
        };
    }
    
    const result = await uniqRow('delete from branches where branch_id=($1) returning * ', branch_id);

    if (result.rows.length) {
        return result.rows[0];
    } else {
        return {
            action: true,
            status: 401,
            error: error.BRANCH_DELETE_ERROR,
            message: 'Xatolik yuz berdi, qaytadan urunib ko`ring !',
        };
    }
}

module.exports = {
    createBrachesModel,
    readBranchModel,
    updateBranchModel,
    deleteBranchModel,
};
