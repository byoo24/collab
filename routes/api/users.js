const bcrypt = require('bcryptjs');
const keys = require('../../config/keys/keys');
const jwt = require('jsonwebtoken');
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');



module.exports = (app, db) => {
    app.post('/api/v1/signup', (req, res) => {

            const { errors, isValid } = validateRegisterInput(req.body);

            if (!isValid) {
                return res.status(400).json(errors);
            }

            db.user.findOne({ where: { username: req.body.username } }).then(user => {
                if (user) {
                    errors.username = "User already exists.";
                    return res.status(400).json(errors);
                } else {
                    const userInfo = {
                        username: req.body.username,
                        email: req.body.email,
                        password: req.body.password
                    };

                    bcrypt.genSalt(10, (err, salt) => {
                        bcrypt.hash(userInfo.password, salt, (err, hash) => {
                            if (err) throw err;
                            userInfo.password = hash;
                            db.user.create(userInfo)
                                .then(user => {

                                    return jwtSign(res, user.dataValues);
                                })
                                .catch(err => console.log(err));
                        })
                    })
                }
            })

    });



    app.post('/api/v1/login', (req, res) => {
        console.log("=====================");
        console.log("=====================");
        console.log("=====================");
        console.log("LOG IN");
        console.log("=====================");
        console.log("=====================");
        console.log("=====================");


            const { errors, isValid } = validateLoginInput(req.body);

            if (!isValid) {
                return res.status(400).json(errors);
            }

            const username = req.body.username;
            const password = req.body.password;

            db.user.findOne({ username })
                .then(user => {

                    if (!user) {
                        errors.username = "Incorrect username or password";
                        return res.status(400).json(errors);
                    }

                    bcrypt.compare(password, user.password)
                        .then(isMatch => {
                            if (isMatch) {

                                console.log("=====================");
                                console.log("=====================");
                                console.log("=====================");
                                console.log(isMatch);
                                console.log("=====================");
                                console.log("=====================");
                                console.log("=====================");

                                jwtSign(res, user);
                                return resjson(user);

                            } else {
                                errors.password = "Incorrect username or password";
                                return res.status(400).json(errors);
                            }
                        })
                })

    });


    app.put('/api/v1/users/:userId', (req, res) => {
        const errors = {};

        if (!req.body.id) {
            errors.userId = "User ID is required";
            return res.status(400).json(errors);
        }

        db.user.findByPk(req.body.id)
            .then(user => {
                if (!user) {
                    errors.user = "User doesn't exist";
                    return res.status(400).json(errors);
                }

                const { username, email, personalBoardIds } = req.body;

                user.update({ username, email, personalBoardIds });
                delete user.dataValues.password;

                return res.json({
                    user
                });
            });
    });
}




const jwtSign = async (res, user) => {
    const payload = {
        id: user.id
    };

    jwt.sign(payload, keys.secretOrKey, { expiresIn: 7200 }, (err, token) => {
        if (err) throw err;

        res.json({
            token: 'Bearer ' + token
        })
    })
}

