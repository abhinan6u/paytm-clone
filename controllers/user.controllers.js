const User = require('../models/user.models');
const Account = require('../models/account.models');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/config');
const zod = require('zod');

// Validation Schema
const signupBody = zod.object({
    username: zod.string().email(),
    firstName: zod.string(),
    lastName: zod.string(),
    password: zod.string().min(6)
});

const signinBody = zod.object({
    username: zod.string().email(),
    password: zod.string()
});

// Signup Controller
exports.signup = async (req, res) => {
    const { success } = signupBody.safeParse(req.body);
    if (!success) return res.status(400).json({ message: "Invalid input" });

    const existingUser = await User.findOne({ username: req.body.username });
    if (existingUser) return res.status(400).json({ message: "Email already taken" });

    const user = await User.create(req.body);
    const userId = user._id;

    await Account.create({ userId, balance: Math.floor(1 + Math.random() * 10000) });

    const token = jwt.sign({ userId }, JWT_SECRET);
    res.json({ message: "User created successfully", token });
};

// Signin Controller
exports.signin = async (req, res) => {
    const { success } = signinBody.safeParse(req.body);
    if (!success) return res.status(400).json({ message: "Invalid input" });

    const user = await User.findOne({ username: req.body.username, password: req.body.password });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ userId: user._id }, JWT_SECRET);
    res.json({ token });
};

// Update User Info
exports.updateUser = async (req, res) => {
    const updateData = req.body;
    await User.updateOne({ _id: req.userId }, updateData);
    res.json({ message: "User updated successfully" });
};
