const {validationResult} = require('express-validator');
const CategoryModel = require('../model/Category');
const ArticleModel = require('../model/Article');
module.exports = {
    index: function (req, res) {
        res.render('articles/list-article');
    },
    create: function (req, res) {
        module.exports.getCategory().then(function (result) {
            res.render('articles/add-article', {categories: result, errors: ''});
        });
    },
    store: function (req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            module.exports.getCategory().then(function (result) {
                res.render('articles/add-article', {categories: result, errors: errors.array()});
            });
        }
        if (!req.files || Object.keys(req.files).length === 0) {
            module.exports.getCategory().then(function (result) {
                res.render('articles/add-article', {categories: result, errors: "file not found"});
            });
        }
        let requestedFile = req.files.logo;
        requestedFile.mv('public/upload/' + requestedFile.name, function (err) {
            if (err) {
                module.exports.getCategory().then(function (result) {
                    res.render('articles/add-article', {categories: result, errors: "file not uploaded"});
                });
            } else {
                new ArticleModel({
                    'title': req.body.title,
                    'category': req.body.category,
                    'description': req.body.description,
                    'logo': requestedFile.name,
                }).save(function (err, result) {
                    if (err) throw err;
                    if (result) {
                        res.redirect('list-article');
                    }
                })
            }
        });
    },
    getCategory: function () {
        return new Promise(function (resolve, reject) {
            CategoryModel.find(function (err, data) {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            })
        });
    }
}