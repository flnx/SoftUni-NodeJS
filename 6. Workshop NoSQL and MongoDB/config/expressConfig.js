
const express = require('express');
const hbs = require('express-handlebars');

const handlebars = hbs.create({
    extname: '.hbs',
});

module.exports = (app) => {
    app.engine('.hbs', handlebars.engine);
    app.set('view engine', '.hbs');
    
    app.use(express.urlencoded({ extended: true }));
    app.use('/static', express.static('static'));
};
