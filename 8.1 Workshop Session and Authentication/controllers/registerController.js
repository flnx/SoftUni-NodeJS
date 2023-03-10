const { registerUser } = require('../services/userService');
const router = require('express').Router();

router.get('/', (req, res) => {
    res.render('register');
});

router.post('/', async (req, res) => {
    try {
        const { username, password, repeatPassword } = req.body;

        if (!username.trim() || !password || !repeatPassword) {
            throw Error('All fields are required!');
        }

        if (password !== repeatPassword) {
            throw Error("Passwords don't match!");
        }

        const payload = await registerUser({
            username: username.trim(),
            password,
        });

        const token = req.signJwt(payload);

        res.cookie('jwt', token, { maxAge: 14400000 });
        res.redirect('/');
    } catch (err) {
        res.render('register', {
            error: err.message,
        });
    }
});

module.exports = router;
