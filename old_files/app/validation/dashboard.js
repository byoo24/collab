"use strict";

var Validator = require('validator');

var validText = require('./valid-text');

module.exports = {
  validateBoardInput: function validateBoardInput(data) {
    var errors = {};
    data.name = validText(data.name) ? data.name : '';
    data.description = validText(data.description) ? data.description : '';

    if (Validator.isEmpty(data.name)) {
      errors.name = 'Board title field is required';
    }

    return {
      errors: errors,
      isValid: Object.keys(errors).length === 0
    };
  },
  validateListInput: function validateListInput(data) {
    var errors = {};
    data.name = validText(data.name) ? data.name : '';

    if (Validator.isEmpty(data.name)) {
      errors.name = 'List title field is required';
    }

    return {
      errors: errors,
      isValid: Object.keys(errors).length === 0
    };
  },
  validateCardInput: function validateCardInput(data) {
    var errors = {};
    data.name = validText(data.name) ? data.name : '';

    if (Validator.isEmpty(data.name)) {
      errors.name = 'Card title field is required';
    }

    return {
      errors: errors,
      isValid: Object.keys(errors).length === 0
    };
  }
};