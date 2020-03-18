var jwt = require('jsonwebtoken');

module.exports = {

    auth: function (req, res, next) {
        try {
            if (localStorage.getItem('loginToken')) {
                var decoded = jwt.verify(localStorage.getItem('loginToken'), 'loginToken');
                next();
            } else {
                res.redirect('/');
            }
        } catch (err) {
            res.redirect('/');
        }
    }

}