const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const User = require('../../models/User');
const keys = require('../../config/keys');

// @route  GET api/users/me
// @desc Return current user
// @access Private
router.get('/me', passport.authenticate('jwt', { session: false }), (req, res) => {
    res.json({ id: req.user.id, name: req.user.name, email: req.user.email, avatar: req.user.avatar })
});

// @route  POST api/users/register
// @desc Register user
// @access Public
router.post('/register', async (req, res) => {
    const validateRegisterInput = require('../../validation/register');
    const { errors, isValid } = validateRegisterInput(req.body);
    //if error, isValid will false else true
    if (!isValid) return res.status(400).send(errors);
    const user = await User.findOne({ email: req.body.email });
    if (user) {
        errors.email = 'User already registered.';
        return res.status(400).send(errors);
    }
    req.body.avatar = gravatar.url(req.body.email, {
        s: '200', //size
        r: 'pg', //rating,
        d: 'mm' //default
    });
    const newUser = new User(req.body);
    const hashValue = await bcrypt.genSalt(10);
    newUser.password = await bcrypt.hash(newUser.password, hashValue);
    console.log(newUser.password);
    const data = await newUser.save();
    res.status(200).send('User registered successfully');
});


// @route  POST api/users/login
// @desc Login user/ Returning JWT token
// @access Public
router.post('/login', async (req, res) => {
    const validateLoginInput = require('../../validation/login');
    const { errors, isValid } = validateLoginInput(req.body);
    //if error, isValid will false else true
    if (!isValid) return res.status(400).send(errors);
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
        errors.email = 'email or password is not correct.';
        return res.status(400).send(errors);
    }
    const verify = await bcrypt.compare(req.body.password, user.password);
    if (!verify) {
        errors.password = 'email or password is not correct.';
        return res.status(400).send(errors);
    }
    const token = jwt.sign({ id: user.id, name: user.name, email: user.email, avatar: user.avatar }, keys.secretKey, { expiresIn: '1days' });
    res.send(token);
});

module.exports = router;