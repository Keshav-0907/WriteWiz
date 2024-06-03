const express = require('express');
const BlogRouter = express.Router();
const {createBlog, getAllBlogs, getSingleBlog, userBlogs, LikeBlog, DeleteBlog} = require('../controllers/blogController');

BlogRouter.post('/createBlog', createBlog);
BlogRouter.get('/allBlogs', getAllBlogs);
BlogRouter.post('/getBlog/:id', getSingleBlog);
BlogRouter.post('/getUserBlogs', userBlogs);
BlogRouter.post('/likeBlog', LikeBlog);
BlogRouter.post('/deleteBlog', DeleteBlog);

module.exports = BlogRouter;