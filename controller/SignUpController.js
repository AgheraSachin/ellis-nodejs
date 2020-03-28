const {validationResult} = require('express-validator');
var jwt = require('jsonwebtoken');
var UserModel = require('../model/Users')
module.exports = {

    index: function (req, res) {
        var decoded = localStorage.getItem('loginToken');
        if (decoded) {
            return res.redirect('home');
        }

        res.render("signup.ejs", {errors: ''});
    },
    signUp: function (req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.render('signup', {errors: errors.array()})
            return;
        }

        new UserModel({
            'first_name': req.body.first_name,
            'last_name': req.body.last_name,
            'email': req.body.email,
            'password': req.body.password,
        }).save(function (err, result) {
            if (err) throw err;
            if (result) {
                var token = jwt.sign({username: result.email}, 'loginToken');
                localStorage.setItem('loginToken', token);
                localStorage.setItem('authUser', result);
                res.render('home');
            }
        })


    }

}