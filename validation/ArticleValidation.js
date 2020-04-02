const {check} = require('express-validator');

exports.add_article = [
    check('title', 'Title is required.').notEmpty(),
    check('category', 'Category is required.').notEmpty(),
    check('description', 'Description is required.').notEmpty(),
];