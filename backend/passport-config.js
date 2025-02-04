LocalStrategy = require('passport-local').Strategy;
const pool = require('./models/db.js');
const bcrypt = require('bcrypt');

const initialize = (passport) => {
    const authenticateCustomer = async (email, password, done) => {
        try {
            const result = await pool.query('SELECT * FROM customer WHERE email = $1', [email]);
            const user = result.rows[0];
            if (!user) {
                console.log('User not found');
                return done(null, false, { message: 'No user with that email' });
            }
            const isMatch = await bcrypt.compare(password, user.password);
            console.log('Password comparison:', isMatch);


            if (isMatch) {
                console.log('Success');
                return done(null, user);
            } else {
                console.log('Password incorrect');
                return done(null, false, { message: 'Password incorrect' });
            }
        } catch(err) {
            console.log('Error authenticating user:', err);
            return done(err);
        }
    };

    passport.use(new LocalStrategy({ usernameField: 'email' }, authenticateCustomer));
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });
    passport.deserializeUser((id, done) => {
        pool.query('SELECT * FROM customer WHERE id = $1', [id], (err, result) => {
            if (err) {
                console.log('Error deserializing user:', err);
                return done(err);
            }
            return done(null, result.rows[0]);
        });
    });
}

module.exports = initialize;