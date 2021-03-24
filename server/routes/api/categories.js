const express = require('express');
const router = express.Router();
const { 
    createCategory, 
    deleteCategory,
    getCategories,
    updateCategory 
} = require('../../controllers/categories');
const { authenticateToken } = require('../../middleware/authenticate.js');

// GET
router.get("/:userId", authenticateToken, getCategories);

// POST
router.post("/:userId", authenticateToken, createCategory);

// UPDATE
router.put("/:userId/:categoryId", authenticateToken, updateCategory);

// DELETE
router.delete("/:userId/:categoryId", authenticateToken, deleteCategory);

module.exports = router;