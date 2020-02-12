const validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateRegisterInput(data) {
    let errors = {};
    data.name = !isEmpty(data.name) ? data.name : '';
    data.email = !isEmpty(data.email) ? data.email : '';
    data.password = !isEmpty(data.password) ? data.password : '';
    data.confirm_password = !isEmpty(data.confirm_password) ? data.confirm_password : '';

    if (!validator.isLength(data.name, { min: 2, max: 30 })) {
        errors.name = 'Name must be between 2 and 30 characters';
    }
    if (validator.isEmpty(data.name)) {
        errors.name = 'Name field is required.';
    }
    if (!validator.isEmail(data.email)) {
        errors.email = 'Email is invalid.';
    }
    if (validator.isEmpty(data.email)) {
        errors.email = 'Email field is required.';
    }
    
    if (!validator.isLength(data.password, { min: 6, max: 30 })) {
        errors.password = 'Password must be at least 6 characters.';
    }

    if (validator.isEmpty(data.password)) {
        errors.password = 'Password field is required.';
    }
    
    if (validator.isEmpty(data.confirm_password)) {
        errors.confirm_password = 'Confirm password field is required.';
    }
    if (!validator.equals(data.confirm_password, data.password)) {
        errors.confirm_password = 'Passwords must match.';
    }
    console.log("isempty: ", errors, isEmpty(errors))
    return {
        errors, isValid: isEmpty(errors)
    }
}