const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const mongoose = require('mongoose');
const User = mongoose.model('users');
const keys = require('../config/keys');

const options = {};
options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
options.secretOrKey = keys.secretKey;

module.exports = passport => {
    passport.use(new JwtStrategy(
        options, async (jwt_payload, done) => {
            const user = await User.findById(jwt_payload.id);
            console.log('user: ', user);
            if (user) return done(null, user);
            return done(null, false);
        }
    ))
}