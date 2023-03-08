const homeController = require('../controllers/homeController');
const catalogController = require('../controllers/catalogController');
const hostController = require('../controllers/hostController');
const facilityController = require('../controllers/facilityController');
const authController = require('../controllers/authController');
const roomController = require('../controllers/roomController');
const { hasUser } = require('../middlewares/guards');

module.exports = (app) => {
    app.use(homeController);
    app.use('/catalog', catalogController);
    app.use('/host', hasUser(), hostController);
    app.use('/facility', hasUser(), facilityController);
    app.use('/auth', authController);
    app.use('/room', roomController);
};