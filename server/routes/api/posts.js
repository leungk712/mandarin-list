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
    const { character, pinyin, english, examples, starred, date } = req.body;

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
    const { character, pinyin, english, examples, starred, date } = req.body;
    Post.findByIdAndUpdate(req.params.id)
        .then(post => {
            post.character = character;
            post.pinyin = pinyin;
            post.english = english;
            post.examples = examples;
            post.starred = starred;
            post.date = Date.parse(date);

            post.save()
                .then(() => res.json('Post updated!'))
                .catch(err => res.status(400).json(`Error: ${err}`))
        })
        .catch(err => res.status(400).json(`Error: ${err}`));
});

router.route("/update-mandarin-list").put((req, res) => {
    Post.updateMany(req)
        .then(() => res.json('Mandarin list order updated!'))
        .catch(err => res.statusMessage(500).json(`Error: ${err}`));
});

// DELETE
router.route("/:id").delete((req, res) => {
    Post.findByIdAndDelete(req.params.id)
        .then(() => res.json('Post deleted.'))
        .catch(err => res.status(400).json(`Error: ${err}`));
});

module.exports = router;
