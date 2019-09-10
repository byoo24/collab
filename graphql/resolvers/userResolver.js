import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import keys from '../../config/keys/keys';
import { InvalidInputError } from '../errors/invalidInputError';
import validateRegisterInput from '../../validation/register';
import validateLoginInput from '../../validation/login';

export default {
    Query: {
        users: (parent, args, { db }, info) => db.user.findAll(),
        user: (parent, args, { db }, info) => db.user.findByPk(id)
    },
    Mutation: {
        signup: async (parent, args, context, info) => {
            const db = context.db;
            const {username, email, password, password2} = args;

            const { errors, isValid } = await validateRegisterInput(args);
            if (!isValid) {
                throw new InvalidInputError(errors);
            }

            const foundUser = await db.user.findOne({ where: {username: username} });
            if (foundUser) {
                errors.username = "The username already exists.";
                throw new InvalidInputError(errors);
            }

            const payload = {
                username,
                email,
                password
            }

            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(payload.password, salt);
            payload.password = hash;

            const newUser = db.user.create(payload);
            const token = jwt.sign({ userId: newUser.id }, keys.secretOrKey, { expiresIn: 7200 });

            return JSON.stringify({
                success: true,
                token: "Bearer " + token
            });

            

            newUser.token = JSON.stringify({
                success: true,
                token: "Bearer " + token
            });

            console.log("==============");
            console.log(newUser);
            console.log("==============");

            // console.log(test);
            return newUser;
        },

        login: async (parent, args, context, info) => {
            const db = context.db;
            const { username, password } = args;

            const { errors, isValid } = await validateLoginInput(args);
            if (!isValid) {
                throw new InvalidInputError(errors);
            }

            const foundUser = await db.user.findOne({ where: {username: username } });
            if (!foundUser) {
                errors.username = "Incorrect username or password";
                throw new InvalidInputError(errors);
            }

            const isMatch = bcrypt.compareSync(password, foundUser.password);
            if (isMatch) {
                jwt.sign({ userId: foundUser.id }, keys.secretOrKey, { expiresIn: 7200 });
                return foundUser;
            } else {
                errors.password = "Incorrect username or password";
                throw new InvalidInputError(errors);
            }
        }
    }
};