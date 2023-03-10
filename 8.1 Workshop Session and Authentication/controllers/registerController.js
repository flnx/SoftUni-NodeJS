const registerUser = require('../services/userService');
const jwt = require('jsonwebtoken');
const secret = 'secret';

const router = require('express').Router();

router.get('/', (req, res) => {
    const token = req.cookies['jwt'];

    const data = jwt.verify(token, secret);

    req.user = data;



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

        const token = jwt.sign(payload, secret, { expiresIn: '4h' });

        res.cookie('jwt', token, { maxAge: 14400000 });
        res.redirect('/register');
    } catch (err) {
        res.render('register', {
            error: err.message,
        });
    }
});

module.exports = router;
