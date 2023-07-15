const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// schema instilah utk membuat model
const BlogPost = new Schema({
    title: {
        type: String,
        required: true,
    },
    body: {
        type: String,
        required: true,
    },
    author: {
        type: Object,
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('BlogPost', BlogPost);