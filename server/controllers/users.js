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
            return res.status(404).json({ message: "User does not exist" });
        }

        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);

        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign({ email: existingUser.email, id: existingUser._id, }, secret, { expiresIn: "1h"});

        res.status(200).json({ message: "Log in successful", user: existingUser, token });
    } catch(err) {
        res.status(500).json({ message: "Something went wrong" });
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
            return res.status(404).json({ message: "Please fill in all fields" });
        };

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ message: "An account with this email already exists" });
        }

        if (password !== confirmPassword) {
            return res.status(400).json({ message: "Passwords do not match" });
        };

        const hashedPassword = await bcrypt.hash(password, 12);

        const user = await User.create({ firstName, lastName, email, password: hashedPassword });

        const token = jwt.sign({ ...user }, secret, { expiresIn: "1h" });

        res.status(200).json({ user, token });
    } catch(err) {
        res.status(500).json({ message: "Something went wrong" });
    }
};

module.exports = { loginUser, registerUser };