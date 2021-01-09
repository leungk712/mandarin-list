const express = require('express');
const moment = require('moment');
const router = express.Router();
require('dotenv').config();
const Post = require('../../models/post.model');


// GET
router.route("/").get((req, res) => {
    Post.find()
        .then(posts => res.json(posts))
        .catch(err => res.status(400).json(`Error: ${err}`));
});

router.route("/:id").get((req, res) => {
    Post.findById(req.params.id)
        .then(post => res.json(post))
        .catch(err => res.status(400).json(`Error: ${err}`));
});

// POST
router.route("/").post((req, res) => {
    const chineseCharacter = req.body.chineseCharacter;
    const example = req.body.example;
    const starred = req.body.starred;
    const date = Date.parse(req.body.date);

    const newPost = new Post({
        chineseCharacter,
        example,
        starred,
        date
    });

    newPost.save()
        .then(() => res.json('New post created!'))
        .catch(err => res.status(400).json(`Error: ${err}`));
});

// UPDATE

router.route("/:id").patch((req, res) => {
    Post.findByIdAndUpdate(req.params.id)
        .then(post => {
            post.chineseCharacter = req.body.chineseCharacter;
            post.example = req.body.example;
            post.starred = req.body.starred;
            post.date = Date.parse(req.body.date);

            post.save()
                .then(() => res.json('Post updated!'))
                .catch(err => res.status(400).json(`Error: ${err}`))
        })
        .catch(err => res.status(400).json(`Error: ${err}`));
});

// DELETE

router.route("/:id").delete((req, res) => {
    Post.findByIdAndDelete(req.params.id)
        .then(() => res.json('Post deleted.'))
        .catch(err => res.status(400).json(`Error: ${err}`));
});

module.exports = router;
