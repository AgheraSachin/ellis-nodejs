const {check} = require('express-validator');

exports.signup = [
    check('first_name', 'First Name is required.').notEmpty(),
    check('last_name', 'Last Name is required.').notEmpty(),
    check('email', 'Email required.').notEmpty(),
    check('email', 'Invalid Email Id.').isEmail(),
    check('password', 'Password Required.').notEmpty(),
    check('confirm_password', 'Password Required.').notEmpty()
    // check('confirm_password', 'Password and Confirm Password Mismatch.').equals(req.body.password),
];