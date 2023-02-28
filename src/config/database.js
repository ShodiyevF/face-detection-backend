const { uniqRow } = require('../lib/pg.js');

async function setMockdata() {
    const datas = await uniqRow('select * from users;');
    if (!datas) {
        console.log('PLEASE CHECK YOUR DATABASE ❗️');
    } else if (!datas.rows.length) {
        // await uniqRow(`insert into users (user_fullname, user_username, user_password) values 
        // ('John doe', 'jony007', '12345678'),
        // ('Jeckie jan', 'jan1234', '87654321'),
        // ('Bruce lee', 'brucele', 'qwerty')`);
        console.log('ADD MOCK DATAS TO DATABASE ✅');
    }
}

module.exports = setMockdata;
