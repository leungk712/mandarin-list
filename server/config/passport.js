const LocalStrategy = require("passport-local").Strategy;
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const express = require("express");

const User = require("../models/user.model");

module.exports = (passport) => {
    passport.use(
        new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
            User.findOne({ email })
                .then((user) => {
                    if(!user) {
                        return done(null, false, { message: "That email is not registered" });
                    }

                    bcrypt.compare(password, user.password, (err, isMatch) => {
                        if(err) {
                            throw err;
                        }

                        if (isMatch) {
                            return done(null, user);
                        } else {
                            return done(null, false, { message: "Invalid credentials" });
                        }
                    });

                    const token = jwt.sign({ email: user.email, id: user._id }, 'test', { expiresIn: "1h"});
                    res.send("logged in yo!", user, token);
                    
                    res.status(200).json({ result: user, token });
                })
                .catch((err) => {
                    res.status(500).json({ message: "Something went wrong" });
                    throw new err;
                });
        })
    );

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });
      
    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => {
            done(err, user);
        });
    });
};

// Login controller
// const loginUser = async (req, res, next) => {
//     passport.authenticate('local', {
//         successRedirect: '/users/',
//         failureRedirect: '/users/fail',
//         successFlash: 'Welcome!',
//         failureFlash: 'Invalid email or password'
//     })(req, res, next);
// };