const Blog = require('../models/blogModel');
const User = require('../models/userModel');

const createBlog = async (req, res) => {
    const { title, content, author, category, imageUrl } = req.body;

    const newBlog = await Blog.create({
        title,
        content,
        author,
        category,
        imageUrl
    });

    res.status(201).json({
        status: 'success',
        newBlog
    });
}

const getAllBlogs = async (req, res) => {
    const blogs = await Blog.find();
    res.status(200).json({
        status: 'success',
        blogs
    });
}


const getSingleBlog = async (req, res) => {
    const { id } = req.params;

    try {
        const blog = await Blog.findById(id);

        if (!blog) {
            return res.status(404).json({
                status: 'fail',
                message: 'Blog not found'
            });
        }

        blog.count += 1;
        await blog.save();

        res.status(200).json({
            status: 'success',
            id,
            blog
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Server error'
        });
    }
}

const userBlogs = async (req, res) => {
    const { id } = req.body

    const user = await User.findById(id);

    const blogs = await Blog.find({ author: user.name });

    return res.status(200).json({
        status: 'success',
        id,
        blogs
    })
}

const LikeBlog = async (req, res) =>{
    const { id } = req.body;

    const blog = await Blog.findById(id);

    blog.likes += 1;
    await blog.save();

    return res.status(200).json({
        status: 'success',
        id,
        blog
    })
}

module.exports = { createBlog, getAllBlogs, getSingleBlog, userBlogs, LikeBlog}