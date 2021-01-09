const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const postSchema = new Schema({
    chineseCharacter: { type: String, required: true },
    example: Array,
    starred: { type: Boolean, default: false },
    date: { type: Date, default: Date.now }
}, {
    timestamps: true
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
