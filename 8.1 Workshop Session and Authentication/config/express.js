const express = require('express');
const hbs = require('express-handlebars');
const cookieParser = require('cookie-parser');
const userNav = require('../middlewares/userNav');
const auth = require('../middlewares/auth');

const handlebars = hbs.create({
    extname: '.hbs',
});

const JWT_SECRET = 'secret';

module.exports = (app) => {
    app.engine('.hbs', handlebars.engine);
    app.set('view engine', '.hbs');

    app.use(express.urlencoded({ extended: true }));
    app.use('/static', express.static('static'));
    app.use(cookieParser());
    app.use(auth(JWT_SECRET));
    app.use(userNav());
};
