const express = require('express');
const Category = require('../models/category.model');
const Post = require('../models/post.model');

const getCategories = async (req, res) => {
    await Category.find({ user: req.params.userId })
        .then(categories => res.status(200).json({ status: 200, categories }))
        .catch(err => res.status(400).json({ status: 400, message: "Unable to get categories", error: err }));
};

const createCategory = async (req, res) => {
    const  { name, user } = req.body;

    const newCategory = new Category({ name, user });

    await newCategory.save()
        .then(() => res.status(200).json({ status: 200, message: 'New category created!' }))
        .catch((err) => res.status(400).json({ status: 400, message: "Unable to create category", error: err }));
};

const updateCategory = async (req, res) => {
    const { name, user } = req.body;

    await Category.findByIdAndUpdate({ user: req.params.userId, _id: req.params.categoryId })
        .then(category => {
            category.user = user,
            category.name = name

            category.save()
                .then(() => res.status(200).json({ status: 200, message: "Category updated!" }))
                .catch(err => res.status(400).json({ status: 400, message: "Unable to update category", error: err }));
        })
        .catch(err => res.status(400).json({ status: 400, message: "Unable to find category", error: err }));
};

const deleteCategory = async (req, res) => {
    await Category.findByIdAndDelete(req.params.categoryId)
        .then(() => res.status(200).json({ status: 200, message: 'Category successfully deleted' }))
        .catch((err) => res.status(400).json({ status: 400, message: "Unable to delete category", error: err }));
};

module.exports = {
    createCategory,
    deleteCategory,
    getCategories,
    updateCategory
}