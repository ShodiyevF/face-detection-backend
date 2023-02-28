const auth = require('./modules/auth/auth.index.js');
const users = require('./modules/users/users.index.js');
const app = require('./app');

app([auth, users]);
