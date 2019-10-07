import bcrypt from 'bcryptjs';
import keys from '../../keys/keys';
import jwt from 'jsonwebtoken';
import passport from 'passport';
import validateRegisterInput from '../../validation/register';
import validateLoginInput from '../../validation/login';



export default (app, db) => {
    app.post('/api/v1/signup', (req, res) => {
        console.log("=====================");
        console.log("=====================");
        console.log("=====================");
        console.log("HIT SIGN UP");
        console.log("=====================");
        console.log("=====================");
        console.log("=====================");

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

                                    jwtSign(res, user);

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
                   console.log("=====================");
                   console.log("=====================");
                   console.log("=====================");
                   console.log(user);
                   console.log("=====================");
                   console.log("=====================");
                   console.log("=====================");
                   if (!user) {
                       errors.username = "Incorrect username or password";
                       return res.status(400).json(errors);
                   }

                   bcrypt.compare(password, user.password)
                         .then(isMatch => {
                             if (isMatch) {

                                    jwtSign(res, user);

                            } else {
                                errors.password = "Incorrect username or password";
                                return res.status(400).json(errors);
                            }
                        })
                })
    })


    app.put('/api/v1/users/:userId', (req, res) => {
        const errors = {};

        if(!req.body.id) {
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


     jwt.sign(payload, keys.secretOrKey, {expiresIn: 7200}, (err, token) => {
        if(err) throw err;

        res.json({
            token: 'Bearer ' + token
        })
    })
}

