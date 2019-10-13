const bcrypt = require('bcrypt');
const userSchema = require('../models/user');
const jwt = require('../common/jwt');
const saltPounds = 10;

function getRegister(req, res) {
    res.render('register.hbs');
}

function postRegister(req, res) {
    const { username, password, repeatPassword } = req.body;
    if (password !== repeatPassword) {
        res.render('register.hbs', {
            errors: {
                repeatPassword: 'Passwords don\'t match!'
            }
        });
        return;
    }

    bcrypt.genSalt(saltPounds, (err, salt) => {
        bcrypt.hash(password, salt, (err, hashPassword) => {
            userSchema.create({ username, hashPassword }).then(() => {
                res.redirect('/login');
            }).catch(err => {
                res.render('register.hbs', {
                    errors: {
                        username: 'Username already exist!'
                    }
                });
            });
        });
    });
}

function getLogin(req, res) {
    res.render('login.hbs');
}

function postLogin(req, res) {
    const { username, password } = req.body;
    userSchema.findOne({ username })
        .then(user => Promise.all([user, user.matchPassword(password)]))
        .then(([user, match]) => {
            if (!match) {
                res.render('login.hbs', {
                    errors: {
                        invalid: 'Invalid username or password!'
                    }
                });
                return;
            }

            // create jwt
            const jwtToken = jwt.create({ id: user.id });
            console.log(jwtToken);
        }).catch(err => {
            res.render('login.hbs', {
                errors: {
                    invalid: 'Invalid username or password!'
                }
            });
            return;
        });
}

function logout(req, res) {

}

module.exports = {
    getRegister,
    postRegister,
    getLogin,
    postLogin,
    logout
}