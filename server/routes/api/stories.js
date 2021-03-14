const express = require('express');
const router = express.Router();
const {
    createStory,
    deleteStory,
    getStories,
    updateStory
} = require('../../controllers/stories');
const { authenticateToken } = require('../../middleware/authenticate.js');

// GET
router.get("/:userId", authenticateToken, getStories);

// POST
router.post("/:userId", authenticateToken, createStory);

// UPDATE
router.patch("/:userId/story/:storyId", authenticateToken, updateStory);

// DELETE
router.delete("/:userId/story/:storyId", authenticateToken, deleteStory);

module.exports = router;