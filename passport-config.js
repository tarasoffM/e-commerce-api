LocalStrategy = require('passport-local').Strategy;
const pool = require('./db.js');
const bcrypt = require('bcrypt');

const initialize = (passport) => {
    authenticateCustomer = async (email, password, done) => {
        try {
            const user = await pool.query('SELECT * FROM customer WHERE email = $1', [email]);
            if (user.rows.length === 0) {
                return done(null, false, { message: 'No user with that email' });
            }
            if (await bcrypt.compare(password, user.rows[0].password)) {
                return done(null, user);
            } else {
                return done(null, false, { message: 'Password incorrect' });
            }
        } catch(err) {
            console.log('Error authenticating user:', err);
            return done(err);
        }
    };

    passport.use(new LocalStrategy({ usernameField: 'email' }, authenticateCustomer));
    passport.serializeUser((user, done) => {});
    passport.deserializeUser((id, done) => {});
}

module.exports = initialize;