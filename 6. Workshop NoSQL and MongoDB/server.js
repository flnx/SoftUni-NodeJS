const express = require('express');
const serverConfig = require('./config/serverConfig');
const expressConfig = require('./config/expressConfig');
const routesConfig = require('./config/routes');
const databaseConfig = require('./config/database');

start();

async function start() {
    const app = express();

    routesConfig(app);
    expressConfig(app);
    await databaseConfig(app);

    app.listen(serverConfig.PORT, () => {
        console.log(`Server is listening on port ${serverConfig.PORT}...`);
    });
}
