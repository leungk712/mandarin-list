const express = require('express');
const Story = require('../models/story.model');

const getStories = async (req, res) => {
    await Story.find({ user: req.params.userId })
        .then(stories => res.status(200).json({ status: 200, stories }))
        .catch(err => res.status(400).json({ status: 400, message: `Error: ${err}` }));
};

const createStory = async (req, res) => {
    const { title, content, user } = req.body;

    const newStory = new Story({ title, content, user });

    await newStory.save()
        .then(() => res.status(200).json({ status: 200, message: 'New story created!' }))
        .catch((err) => res.status(400).json({ status: 400, message: `Error: ${err}` }));
};

const updateStory = async (req, res) => {
    const { title, content, user } = req.body;

    await Story.findByIdAndUpdate({ user: req.params.userId, _id: req.params.storyId })
        .then(story => {
            story.title = title;
            story.content = content;
            story.user = user;

            story.save()
                .then(() => res.status(200).json({ status: 200, message: 'Story updated!' }))
                .catch(err => res.status(400).json({ status: 400, message: `Error: ${err}` }));
        })
        .catch(err => res.status(400).json({ message: `Error: ${err}` }));
};

const deleteStory = async (req, res) => {
    await Story.findByIdAndDelete({ user: req.params.userId, _id: req.params.storyId })
        .then(() => res.status(200).json({ status: 200, message: 'Story successfully deleted!'}))
        .catch(err => res.status(400).json({ status: 400, message: `Error: ${err}` }));
};

module.exports = {
    createStory,
    deleteStory,
    getStories,
    updateStory
}