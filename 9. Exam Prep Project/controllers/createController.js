const { cryptoService } = require('../services/cryptoService');
const handleErrors = require('../utils/errorHandler');

const createController = require('express').Router();

createController.get('/', (req, res) => {
    res.render('create');
});

createController.post('/', async(req, res) => {
    try {
        const result = await cryptoService(req.body);
        console.log(result);
        res.redirect(`/details/${result._id}`);
    } catch(err) {
        console.log(err);
        
        res.render('create', {
            errors: handleErrors(err)
        });
    }

});

module.exports = createController;