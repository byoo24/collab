const Validator = require('validator');
const validText = require('./valid-text');

module.exports = {
    validateBoardInput(data) {
        let errors = {};

        data.name = validText(data.name) ? data.name : '';
        data.description = validText(data.description) ? data.description : '';

        if (Validator.isEmpty(data.name)) {
            errors.name = 'Board title field is required';
        }

        return {
            errors,
            isValid: Object.keys(errors).length === 0
        }
    },
    validateListInput(data) {
        let errors = {};

        data.name = validText(data.name) ? data.name : '';

        if (Validator.isEmpty(data.name)) {
            errors.name = 'List title field is required';
        }

        return {
            errors,
            isValid: Object.keys(errors).length === 0
        }
    },
    validateCardInput(data) {
        let errors = {};

        data.name = validText(data.name) ? data.name : '';

        if (Validator.isEmpty(data.name)) {
            errors.name = 'Card title field is required';
        }

        return {
            errors,
            isValid: Object.keys(errors).length === 0
        }
    },
}