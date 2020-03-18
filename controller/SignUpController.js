const {validationResult} = require('express-validator');
var UserModel = require('../model/Users')
module.exports = {

    index: function (req, res) {
        res.render("signup", {errors: ''});
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
                res.render('home');
            }
        })


    }

}