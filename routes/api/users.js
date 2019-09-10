import bcrypt from 'bcryptjs';
import keys from '../../config/keys/keys';
import jwt from 'jsonwebtoken';
import passport from 'passport';
import validateRegisterInput from '../../validation/register';
import validateLoginInput from '../../validation/login';





export default (app, db) => {
    app.post('/api/users/signup', (req, res) => {
        const { errors, isValid } = validateRegisterInput(req.body);

        if (!isValid) {
            return res.status(400).json(errors);
        }

        db.user.findOne({ username: req.body.username }).then(user => {
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
                                   const { id, username, email } = user.dataValues;
                                   
                                   res.json({
                                       id,
                                       username,
                                       email
                                   })
                                })
                               .catch(err => console.log(err));
                    })
                })
            }
        })
    })
}




