const auth = require('./modules/auth/auth.index.js');
const app = require('./app');

app([auth]);
