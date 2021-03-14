const express = require('express');
const Post = require('../models/post.model');

const getPosts = async (req, res) => {
    await Post.find({ user: req.params.userId })
        .then(posts => res.json(posts))
        .catch(err => res.status(400).json({ message: `Error: ${err}` }));
};

const getIndividualPost = async (req, res) => {
    await Post.findById({ user: req.params.userId, _id: req.params.postId })
        .then(post => res.json(post))
        .catch(err => res.status(400).json({ message: `Error: ${err}` }));
};

const createPost = async (req, res) => {
    const {
        categories,
        character,
        english,
        examples,
        pinyin,
        starred,
        user,
        date 
    } = req.body;

    const newPost = new Post({
        categories,
        character,
        pinyin,
        english,
        examples,
        starred,
        user,
        date
    });

    await newPost.save()
        .then(() => res.json({ message: 'New post created!' }))
        .catch(err => res.status(400).json({ message: `Error: ${err}` }));
};

const updatePost = async (req, res) => {
    const { 
        categories,
        character,
        english,
        examples,
        pinyin,
        starred,
        user,
        date 
    } = req.body;
    await Post.findByIdAndUpdate({ user: req.params.userId, _id: req.params.postId })
        .then(post => {
            post.categories = categories;
            post.character = character;
            post.pinyin = pinyin;
            post.english = english;
            post.examples = examples;
            post.starred = starred;
            post.user = user,
            post.date = Date.parse(date);

            post.save()
                .then(() => res.json('Post updated!'))
                .catch(err => res.status(400).json(`Error: ${err}`));
        })
        .catch(err => res.status(400).json({ mesasge: `Error: ${err}` }));
};

const deletePost = async (req, res) => {
    await Post.findByIdAndDelete({ user: req.params.userId, _id: req.params.postId })
    .then(() => res.json('Post successfully deleted!'))
    .catch(err => res.status(400).json({ message: `Error: ${err}` }));
};

module.exports = { 
    createPost, 
    deletePost, 
    getPosts, 
    getIndividualPost, 
    updatePost 
}