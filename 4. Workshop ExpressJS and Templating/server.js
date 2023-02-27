const express = require('express');
const hbr = require('express-handlebars');

// Controllers
const homeController = require('./controllers/homeController');
const catalogController = require('./controllers/catalogController');

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




app.listen(3000, () => {
    console.log('Server is listening on port 3000...');
});
