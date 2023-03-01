const homeController = require('../controllers/homeController');
const catalogController = require('../controllers/catalogController');
const hostController = require('../controllers/hostController');

module.exports = (app) => {
    app.use(homeController);
    app.use('/catalog', catalogController);
    app.use('/host', hostController);
};