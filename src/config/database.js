const { uniqRow } = require('../lib/pg.js');

async function setMockdata() {
    const datas = await uniqRow('select * from users;');
    
    if (!datas) {
        console.log('PLEASE CHECK YOUR DATABASE ❗️');
    } else {
        const branches = await uniqRow('select * from branches')
        const userroles = await uniqRow('select * from userrole')
        if (branches.rows.length && branches.rows.length) {
            const usersQuery = `
            insert into users (user_firstname, user_lastname, user_img, user_email, user_password, role_id, branch_id) values 
            ('John', 'Doe', 'TEST/PATH', 'johndoe@gmail.com', '12345678', $1, $2),
            ('Fayzulloh', 'ShodiyevF', 'TEST/PATH', 'fayzullohwork@gmail.com', '6661114f', $1, $2),
            ('Muhammad rizo', 'Rapiqjonov', 'TEST/PATH', '', '', $1, $2)
            `
            const randomBranch = branches.rows[Math.floor(Math.random()*branches.rows.length)]
            const randomUserRole = userroles.rows[Math.floor(Math.random()*userroles.rows.length)]
            if(!datas.rows.length){
                await uniqRow(usersQuery, randomUserRole.role_id, randomBranch.branch_id)
                console.log('MOCKDATAS HAS ADDED TO DATABASE');
            }
        }
    }
}

module.exports = setMockdata;
