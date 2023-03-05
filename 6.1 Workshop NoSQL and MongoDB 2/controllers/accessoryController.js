const router = require('express').Router();

router.get('/accessory/:cubeId', (req, res) => {
    const d = req.params;

    console.log(d);

    res.render('attachAccessory.hbs');
});

module.exports = router;