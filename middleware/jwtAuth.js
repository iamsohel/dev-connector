const passport = require('passport');

module.exports = function (req, res, next) {
    try {
        passport.authenticate('jwt', { session: false }, (error, user) => {
            if (!user) return res.status(401).send('Unauthorized User');
            if (error) return res.status(500).send('Server error');
            req.user = user;
            next();
        })(req, res)
    }
    catch (ex) {
        console.log(ex)
        res.status(500).send('Somethings went wrong.');
    }
}