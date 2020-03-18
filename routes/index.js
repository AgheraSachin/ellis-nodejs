var express = require('express');
var router = express.Router();

var authMiddleware = require('../middleware/auth');

var LoginValidator = require('../validation/LoginValidation');
var SignUpValidator = require('../validation/SignUpValidation');

var LoginController = require('../controller/LoginController');
var SignUpController = require('../controller/SignUpController');

/* GET home page. */
router.get('/', LoginController.index);
router.post('/', LoginValidator.login, LoginController.login);
router.get('/logout', LoginController.logout);

router.get('/signup', SignUpController.index);
router.post('/signup', SignUpValidator.signup, SignUpController.signUp);

router.get('/home', authMiddleware.auth, (req, res) => {
    res.render('home');
})


module.exports = router;
