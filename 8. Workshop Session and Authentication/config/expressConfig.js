const express = require('express');
const hbs = require('express-handlebars');
const cookieParser = require('cookie-parser');
const auth = require('../middlewares/auth');

const handlebars = hbs.create({
    extname: '.hbs',
});

const jwtSecret = '1ab2c3d4';

module.exports = (app) => {
    app.engine('.hbs', handlebars.engine);
    app.set('view engine', '.hbs');

    app.use(express.urlencoded({ extended: true }));
    app.use('/static', express.static('static'));
    app.use(cookieParser());
    app.use(auth(jwtSecret));
};
