const router = require('express').Router();

router.get('/:cubeId', (req, res) => {
    const { cubeId } = req.params;

    console.log(cubeId);

    res.render('details');
});

module.exports = router;
