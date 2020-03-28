module.exports = {
    index: function (req, res) {
        res.render('category/list-category');
    },
    create: function (req, res) {
        res.render('category/add-category');
    }
}