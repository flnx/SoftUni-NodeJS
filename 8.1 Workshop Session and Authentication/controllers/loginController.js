const { loginUser } = require('../services/userService');

const router = require('express').Router();


router.get('/', (req, res) => {
    res.render('login');
});

router.post('/', async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username.trim() || !password) {
            throw Error('All fields are required!');
        }

        const payload = await loginUser({
            username: username.trim(),
            password,
        });

        const token = req.signJwt(payload);
        
        res.cookie('jwt', token, { maxAge: 14400000 });
        res.redirect('/');
    } catch (err) {
        res.render('login', {
            error: err.message,
        });
    }
});

module.exports = router;
