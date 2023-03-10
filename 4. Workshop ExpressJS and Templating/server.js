const express = require('express');
const hbr = require('express-handlebars');

const config = require('./config');

// Controllers
const homeController = require('./controllers/homeController');
const catalogController = require('./controllers/catalogController');
const hostController = require('./controllers/hostController');

const handlebars = hbr.create({
    extname: '.hbs',
});

const app = express();

app.engine('.hbs', handlebars.engine);
app.set('view engine', '.hbs');
app.use('/static', express.static('static'));
app.use(express.urlencoded({ extended: true }));

// routing

app.use(homeController);
app.use('/catalog', catalogController);
app.use('/host', hostController);


app.listen(config.PORT, () => {
    console.log(`Server is listening on port ${config.PORT}...`);
});
