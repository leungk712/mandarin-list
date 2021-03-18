const express = require('express');
const Category = require('../models/category.model');

const getCategories = async (req, res) => {
    await Category.find({ user: req.params.userId })
        .then(categories => res.json(categories))
        .catch(err => res.status(400).json({ message: `Error: ${err}` }));
};

const createCategory = async (req, res) => {
    const  { name, user } = req.body;

    const newCategory = new Category({ name, user });

    await newCategory.save()
        .then(() => res.json({ message: 'New category created!' }))
        .catch((err) => res.status(400).json({ message: `Error: ${err}` }));
};

const updateCategory = async (req, res) => {
    const { name, user } = req.body;

    await Category.findByIdAndUpdate({ user: req.params.userId, _id: req.params.categoryId })
        .then(category => {
            category.user = user,
            category.name = name

            category.save()
                .then(() => res.json('Category updated!'))
                .catch(err => res.status(400).json(`Error: ${err}`));
        })
        .catch(err => res.status(400).json({ mesasge: `Error: ${err}` }));
};

const deleteCategory = async (req, res) => {
    await Category.findByIdAndDelete(req.params.categoryId)
        .then(() => res.json({ message: 'Category successfully deleted' }))
        .catch((err) => res.status(400).json({ message: `Error: ${err}` }));
};

module.exports = {
    createCategory,
    deleteCategory,
    getCategories,
    updateCategory
}