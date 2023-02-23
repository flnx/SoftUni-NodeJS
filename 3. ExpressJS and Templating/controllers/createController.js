const { create } = require('../services/productService');

const router = require('express').Router();

router.get('/', (req, res) => {
    res.render('create');
});

router.post('/', async (req, res, next) => {
    const { name, price } = req.body;

    try {
        await create(name, +price);
    } catch(err) {
        next(err);
    }

    res.redirect('/catalog');
});

module.exports = router;
