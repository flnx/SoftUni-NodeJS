const express = require('express');

const serverConfig = require('./config/serverConfig');
const routesConfig = require('./config/routes');
const expressConfig = require('./config/express');

start();

function start() {
    const app = express();
    routesConfig(app);
    expressConfig(app);

    app.listen(serverConfig.PORT, () =>
        console.log(`Server is listening on port ${serverConfig.PORT}`)
    );
}
