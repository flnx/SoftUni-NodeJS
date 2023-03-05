const express = require('express');

const serverConfig = require('./config/serverConfig');
const routesConfig = require('./config/routes');
const expressConfig = require('./config/express');
const database = require('./config/database');

start();

async function start() {
    const app = express();
    
    expressConfig(app);
    routesConfig(app);

    await database();

    app.listen(serverConfig.PORT, () =>
        console.log(`Server is listening on port ${serverConfig.PORT}`)
    );
}
