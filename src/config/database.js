const { uniqRow } = require('../lib/pg.js');

async function setMockdata() {
    const datas = await uniqRow('select * from users;');

    if (!datas) {
        console.log('PLEASE CHECK YOUR DATABASE ❗️');
    }
}

module.exports = setMockdata;
