require('dotenv').config();
const express = require('express');
const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token === null) {
        return res.status(401).json({ message: "No token" });
    }

    jwt.verify(token, process.env.JWT_SECRET_PASSWORD, (err, user) => {
        if (err) {
            return res.status(403).json({ message: "Unable to verify token" });
        }

        req.user = user;
        next();
    });
    
}

module.exports = {
    authenticateToken
};