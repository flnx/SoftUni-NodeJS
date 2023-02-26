const express = require('express');
const hbr = require('express-handlebars');

const handlebars = hbr.create({
    extname: '.hbs',
});

const app = express();

app.engine('.hbs', handlebars.engine);
app.set('view engine', '.hbs');
app.use('/static', express.static('static'));


app.get('/', (req, res) => {
    res.render('home');
});

app.listen(3000, () => {
    console.log('Server is listening on port 3000...');
});
