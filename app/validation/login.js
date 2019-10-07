"use strict";

var Validator = require('validator');

var validText = require('./valid-text');

module.exports = function validateLoginInput(data) {
  var errors = {};
  data.username = validText(data.username) ? data.username : ''; // data.email = validText(data.email) ? data.email : '';

  data.password = validText(data.password) ? data.password : '';

  if (Validator.isEmpty(data.username)) {
    errors.username = 'Username is required';
  } // if (!Validator.isEmail(data.email)) {
  //     errors.email = 'Email is invalid';
  // }
  // if (Validator.isEmpty(data.email)) {
  //     errors.email = 'Email field is required';
  // }


  if (Validator.isEmpty(data.password)) {
    errors.password = 'Password field is required';
  }

  return {
    errors: errors,
    isValid: Object.keys(errors).length === 0
  };
};