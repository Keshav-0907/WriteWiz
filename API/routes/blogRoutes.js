const express = require('express');
const BlogRouter = express.Router();
const {createBlog, getAllBlogs, getSingleBlog, userBlogs, LikeBlog} = require('../controllers/blogController');

BlogRouter.post('/createBlog', createBlog);
BlogRouter.get('/allBlogs', getAllBlogs);
BlogRouter.post('/getBlog/:id', getSingleBlog);
BlogRouter.post('/getUserBlogs', userBlogs);
BlogRouter.post('/likeBlog', LikeBlog);

module.exports = BlogRouter;