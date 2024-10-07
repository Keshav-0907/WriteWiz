const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    content: {
        type: String,
        required: true,
        min: 6,
    },
    date: {
        type: Date,
        default: Date.now
    },
    author: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    category: {
        type: [String],
        default: []
    },
    likes: {
        type: Number,
        default: 0
    },
    count : {
        type: Number,
        default: 0
    }
})

const Blog = mongoose.model('Blog', blogSchema);
module.exports = Blog;