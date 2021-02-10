const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const postSchema = new Schema({
    character: { type: String, required: true },
    pinyin: { type: String },
    english: { type: String },
    examples: Array,
    starred: { type: Boolean, default: false },
    date: { type: Date, default: Date.now }
}, {
    timestamps: true,
    bufferCommands: false
},
);

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
