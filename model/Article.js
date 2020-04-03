const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);
mongoose.connect('mongodb://127.0.0.1:27017/ellis', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const Schema = mongoose.Schema;

const ArticleSchema = new Schema({
    title: {
        type: String,
        required: true,
        index: true
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'categories',
        required: true,
        index: true
    },
    description: {
        type: String,
        required: true,
        index: true
    },
    logo: {
        type: String,
        required: true,
        index: true
    },
});

module.exports = mongoose.model("articles", ArticleSchema);