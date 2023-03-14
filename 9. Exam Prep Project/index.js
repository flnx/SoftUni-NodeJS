const express = require('express');
require('dotenv').config();

const env = require('./config/serverConfig');
const routesConfig = require('./config/routes');
const expressConfig = require('./config/express');


const database = require('./config/database');

start();

async function start() {
    const app = express();

    expressConfig(app);
    routesConfig(app);

    await database();

    app.listen(env.PORT, () => {
        console.log(`Server is listening on port ${env.PORT}`);
    });
}
