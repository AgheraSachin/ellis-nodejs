const { check } = require('express-validator');

exports.login = [check('email','Invalid Email Id.').isEmail(),check('email','Email Required.').notEmpty(),check('password','Password Required.').notEmpty()];