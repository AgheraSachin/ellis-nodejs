const {validationResult} = require('express-validator');
var jwt = require('jsonwebtoken');
var userModel = require('../model/Users');

module.exports = {

    index: function (req, res) {
        var decoded = localStorage.getItem('loginToken');
        if (decoded) {
            return res.redirect('home');
        }
        res.render('index.ejs', {errors: ''})
    },
    login: function (req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.render('index.ejs', {errors: errors.array()})
            return;
        }

        userModel.find({'email': req.body.email, 'password': req.body.password}, (err, data) => {
            if (err) throw  err;
            if (data.length > 0) {
                var token = jwt.sign({username: data[0].email}, 'loginToken');
                localStorage.setItem('loginToken', token);
                res.redirect('home');
            } else {
                res.render('index.ejs', {errors: [{'msg': 'Invalid Username or Password.'}]});
            }
        });

    },
    logout: function (req, res) {
        localStorage.removeItem('loginToken');
        res.redirect('/');
    },
};