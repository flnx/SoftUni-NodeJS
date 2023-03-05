const router = require('express').Router();

router.get('/', (req, res) => {
    res.send('Create Page');
});

module.exports = router;