require('dotenv').config();
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

const secret = process.env.JWT_SECRET_PASSWORD;

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });

        if (!existingUser) {
            return res.status(404).json({ status: 404, message: "User does not exist.", error: null });
        }

        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);

        if (!isPasswordCorrect) {
            return res.status(400).json({ status: 400, message: "Invalid credentials. Please try again.", error: null });
        }

        const token = jwt.sign({ email: existingUser.email, id: existingUser._id, }, secret, { expiresIn: 3600 });

        res.status(200).json({ status: 200, message: "Log in successful!", user: existingUser, token });
    } catch(err) {
        res.status(500).json({ status: 500, message: "Uh oh. Something went wrong. Try again later.", error: err });
    }
};

const registerUser = async (req, res) => {
    const {
        firstName,
        lastName,
        email,
        password,
        confirmPassword
    } = req.body;

    try {
        if (!firstName || !lastName || !email || !password || !confirmPassword) {
            return res.status(404).json({ status: 404, message: "Please fill in all fields.", error: null });
        };

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ status: 404, message: "An account with this email already exists.", error: null });
        }

        if (password !== confirmPassword) {
            return res.status(400).json({ status: 404, message: "Passwords do not match.", error: null });
        };

        const hashedPassword = await bcrypt.hash(password, 12);

        const user = await User.create({ firstName, lastName, email, password: hashedPassword });

        const token = jwt.sign({ ...user }, secret, { expiresIn: 3600 });

        res.status(200).json({ status: 200 });
    } catch(err) {
        res.status(500).json({ status: 500, message: "Uh oh! Something went wrong.", error: err });
    }
};

module.exports = { loginUser, registerUser };