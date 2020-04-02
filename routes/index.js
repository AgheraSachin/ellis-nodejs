var express = require('express');
var router = express.Router();

var authMiddleware = require('../middleware/auth');

var LoginValidator = require('../validation/LoginValidation');
var SignUpValidator = require('../validation/SignUpValidation');
var CategoryValidator = require('../validation/CategoryValidation');
var ArticleValidator = require('../validation/ArticleValidation');

var LoginController = require('../controller/LoginController');
var SignUpController = require('../controller/SignUpController');
var HomeController = require('../controller/HomeController');
var CategoryController = require('../controller/CategoryController');
var ArticleController = require('../controller/ArticlesController');

/* GET home page. */
router.get('/', LoginController.index);
router.post('/', LoginValidator.login, LoginController.login);
router.get('/logout', LoginController.logout);

router.get('/signup', SignUpController.index);
router.post('/signup', SignUpValidator.signup, SignUpController.signUp);

router.get('/home', authMiddleware.auth, HomeController.index);

/* Category*/
router.get('/add-category', authMiddleware.auth, CategoryController.create);
router.post('/add-category', authMiddleware.auth, CategoryValidator.add_category, CategoryController.store);
router.get('/list-category', authMiddleware.auth, CategoryController.index);
router.get('/get-all-categories', authMiddleware.auth, CategoryController.show);

/* Article*/
router.get('/add-article', authMiddleware.auth, ArticleController.create);
router.get('/list-article', authMiddleware.auth, ArticleController.index);
router.post('/add-article', authMiddleware.auth, ArticleValidator.add_article, ArticleController.store);


module.exports = router;
