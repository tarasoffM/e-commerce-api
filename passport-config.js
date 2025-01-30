localStrategy = require('passport-local').Strategy;

const initialize = (passport) => {
    authenticateCustomer = async (email, password, done) => {
        try {
            const user = await pool.query('SELECT * FROM customer WHERE email = $1', [email]);
            
        } catch {

        }
    };

    passport.use(new localStrategy({ usernameField: 'email' }, authenticateCustomer));
    passport.serializeUser((user, done) => {});
    passport.deserializeUser((id, done) => {});
}