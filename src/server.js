const branches = require('./modules/branches/branches.index.js');
const userRole = require('./modules/user-role/user.role.index');
const users = require('./modules/users/users.index.js');
const auth = require('./modules/auth/auth.index.js');
const app = require('./app');

app([auth, users, branches]);
