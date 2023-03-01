const { uniqRow } = require('../../lib/pg');

async function getUsersModel() {
    const users = await uniqRow('select * from users');
    return users.rows;
}

module.exports = {
    getUsersModel,
};
