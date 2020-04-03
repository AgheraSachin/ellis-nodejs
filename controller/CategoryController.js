const {validationResult} = require('express-validator');
const CategoryModel = require('../model/Category');
const ArticleModel = require('../model/Article');
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
    },
    edit: function (req, res) {
        CategoryModel.find({'_id': req.params.id}, (function (err, result) {
            if (err) throw  err;
            res.render('category/edit-category', {'category': result[0], errors: ''});
        }));
    },
    update: function (req, res) {
        CategoryModel.updateOne({'_id': req.params.id}, {'name': req.body.category}, function (err, result) {
            if (err) throw  err;
            return res.redirect('/list-category');
        })
    },
    delete: function (req, res) {
        ArticleModel.find({'category': req.params.id}, function (err, result) {
            if (err) throw err;
            if (result.length <= 0) {
                CategoryModel.deleteOne({'_id': req.params.id}, function (derr, dresult) {
                    if (derr) throw derr;
                })
            }
            return res.redirect('/list-category');
        })
    },
}