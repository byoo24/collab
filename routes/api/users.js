import bcrypt from 'bcryptjs';
import keys from '../../config/keys/keys';
import jwt from 'jsonwebtoken';
import passport from 'passport';
import validateRegisterInput from '../../validation/register';
import validateLoginInput from '../../validation/login';



export default (app, db) => {
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
    });



    app.post('/api/v1/login', (req, res) => {
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
                                 const payload = {id: user.id, username: user.username, email: user.email};

                                 jwt.sign(payload, keys.secretOrKey, {expiresIn: 7200}, (err, token) => {
                                     if(err) throw err;

                                     res.json({
                                         token: 'Bearer ' + token
                                     })
                                 })
                             } else {
                                 errors.password = "Incorrect username or password";
                                 return res.status(400).json(errors);
                             }
                         })
               })
    })
}




