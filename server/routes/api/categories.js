const express = require('express');
const router = express.Router();
const { 
    createCategory, 
    deleteCategory,
    getCategories 
} = require('../../controllers/categories');
const { authenticateToken } = require('../../middleware/authenticate.js');

// GET
router.get("/:userId", authenticateToken, getCategories);

// POST
router.post("/:userId", authenticateToken, createCategory);

// DELETE
router.delete("/:userId/:categoryId", authenticateToken, deleteCategory);

module.exports = router;