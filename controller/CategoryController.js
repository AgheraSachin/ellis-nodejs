const {validationResult} = require('express-validator');
const CategoryModel = require('../model/Category');
module.exports = {
    index: function (req, res) {
        res.render('category/list-category');
    },
    create: function (req, res) {
        res.render('category/add-category', {errors: ''});
    },
    store: function (req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.render('category/add-category', {errors: errors.array()})
            return;
        }
        new CategoryModel({
            'name': req.body.category
        }).save(function (err, result) {
            if (err) throw err;
            if (result) {
                res.redirect('list-category');
            }
        })
    },
    show: function (req, res) {
        CategoryModel.find(function (error, data) {
            if (error) throw error;
            res.json({'data': data});
        })
    }
}