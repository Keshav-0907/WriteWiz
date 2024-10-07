const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const bcrypt = require('bcrypt');

const RegisterUser = async (req, res) => {
    const { name, email, password } = req.body;
    const userExists = await User.findOne({ email })
    if (userExists) {
        return res.status(400).json({
            message: 'User already exists',
            success: false
        });
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = await User.create({ name, email, password: hashedPassword });
    return res.json({ 
        message: 'User Registered', 
        newUser, 
        success: true });
}

const LoginUser = async (req, res) => {
    const { email, password } = req.body;

    const curUser = await User.findOne({ email });
    if (!curUser) {
        return res.status(400).json({
            message: 'Invalid Credentials',
            success: false
        });
    };

    const isPasswordCorrect = await bcrypt.compare(password, curUser.password);
    if (!isPasswordCorrect) {
        return res.status(400).json({
            message: 'Invalid Credentials',
            success: false
        });
    }

    const token = jwt.sign({ id: curUser._id }, process.env.JWT_SECRET);

    return res.json({ message: 'User Logged In', success: true, token });
}


const UserInfo = async (req, res) => {
    const { token } = req.body;

    // if (!token) {
    //     return res.status(400).json({
    //         message: 'Invalid Token',
    //         success: false
    //     });
    // }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.id;

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({
                message: 'User not found',
                success: false
            });
        }

        return res.status(200).json({
            message: 'User Info',
            success: true,
            user
        });

    } catch (error) {
        console.error(error);
        return res.status(401).json({
            message: 'Unauthorized',
            success: false
        });
    }
};

module.exports = { RegisterUser, LoginUser, UserInfo };