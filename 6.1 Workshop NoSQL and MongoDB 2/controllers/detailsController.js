const router = require('express').Router();

router.get('/', (req, res) => {
    res.send('Details Page');
});

module.exports = router;