const express = require('express');
const router = express.Router();
const User = require("../../models/user.model");
const bcrypt = require('bcryptjs');

// Register Handle
router.post("/register", (req, res) => {
    const { name, email, password, confirmPassword } = req.body;
    User.findOne({ email: email })
        .then(user => {
            if(user) {
                return res.status(400).json({ errorMessage: "An account with this email already exists"});
            } else {
                const newUser = new User({
                    name,
                    email,
                    password
                });

                // Hash Password
                bcrypt.genSalt(10, (err, salt) => bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if(err) throw err;
                    newUser.password = hash;
                    newUser.save()
                        .then(user => {
                            res.status(200).json("User created!");
                        })
                        .catch(err => {
                            res.status(400).json({ errorMessage: "Unable to create user" });
                        });
                }))
            }
        })
});

module.exports = router;