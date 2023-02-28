require('dotenv').config({ path: `.env.${process.env.NODE_ENV || 'development'}.local` });

const { errorMiddleware } = require('./middleware/error.widdleware.js');
const setMockdata = require('./config/database.js');
const { stream } = require('./config/logger.js');
const CORS_OPTIONS = require('./config/cors.js');
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

async function app(routes) {
    const app = express();
    const port = process.env.PORT || 3000;
    const action = process.env.NODE_ENV || 'development';

    function lister() {
        app.listen(port, () => {
            console.info('=================================');
            console.info(`======= ENV: ${action} =======`);
            console.info(`🚀 App listening on the port ${port}`);
            console.info('=================================');
        });
    }

    function initializeMiddlewares() {
        app.use(express.json());
        app.use(morgan(process.env.LOG_FORMAT, { stream }));
        app.use(cors(CORS_OPTIONS));
        app.use(express.urlencoded({ extended: true }));
    }

    function initializeRoutes(routes) {
        routes.forEach(route => {
            app.use(route);
        });
    }

    async function runner() {
        await setMockdata();
        await initializeMiddlewares();
        await initializeRoutes(routes);
        await lister();
    }

    runner();
}

module.exports = app;
