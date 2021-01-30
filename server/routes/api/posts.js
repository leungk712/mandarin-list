const express = require('express');
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
    const character = req.body.character;
    const pinyin = req.body.pinyin;
    const english = req.body.english;
    const examples = req.body.examples;
    const starred = req.body.starred;
    const date = Date.parse(req.body.date);

    const newPost = new Post({
        character,
        pinyin,
        english,
        examples,
        starred,
        date
    });

    newPost.save()
        .then(() => res.json('New post created!'))
        .catch(err => res.status(400).json(`Error: ${err}`));
});

// UPDATE
router.route("/:id").put((req, res) => {
    Post.findByIdAndUpdate(req.params.id)
        .then(post => {
            post.character = req.body.character;
            post.pinyin = req.body.pinyin;
            post.english = req.body.english;
            post.examples = req.body.examples;
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
