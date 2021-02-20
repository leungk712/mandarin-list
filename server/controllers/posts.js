const express = require('express');
const router = express.Router();
const Post = require('../models/post.model');

const getPosts = async (req, res) => {
    await Post.find()
    .then(posts => res.json(posts))
    .catch(err => res.status(400).json(`Error: ${err}`));
};

const getIndividualPost = async(req, res) => {
    await Post.findById(req.params.id)
    .then(post => res.json(post))
    .catch(err => res.status(400).json(`Error: ${err}`));
};

const createPost = async(req, res) => {
    const {
        categories,
        character,
        english,
        examples,
        pinyin,
        starred,
        date 
    } = req.body;

    const newPost = new Post({
        categories,
        character,
        pinyin,
        english,
        examples,
        starred,
        date
    });

    await newPost.save()
        .then(() => res.json('New post created!'))
        .catch(err => res.status(400).json(`Error: ${err}`));
};

const updatePost = async (req, res) => {
    const { 
        categories,
        character,
        english,
        examples,
        pinyin,
        starred,
        date 
    } = req.body;
    await Post.findByIdAndUpdate(req.params.id)
        .then(post => {
            post.categories = categories;
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
};

const deletePost = async (req, res) => {
    await Post.findByIdAndDelete(req.params.id)
    .then(() => res.json('Post successfully deleted!'))
    .catch(err => res.status(400).json(`Error: ${err}`));
};

module.exports = { createPost, deletePost, getPosts, getIndividualPost, updatePost }