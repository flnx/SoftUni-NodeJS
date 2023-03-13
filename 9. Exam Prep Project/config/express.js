const express = require('express');
const hbs = require('express-handlebars');
const cookieParser = require('cookie-parser');

const handlebars = hbs.create({
    extname: '.hbs',
});

module.exports = (app) => {
    app.engine('.hbs', handlebars.engine);
    app.set('view engine', '.hbs');

    app.use(express.urlencoded( {extended: false }));
    app.use('/static', express.static('static'));
    app.use(cookieParser());
}