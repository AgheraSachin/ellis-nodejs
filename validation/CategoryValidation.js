const {check} = require('express-validator');

exports.add_category = [
    check('category', 'Category is required.').notEmpty(),
];