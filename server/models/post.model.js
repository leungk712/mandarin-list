const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const postSchema = new Schema({
    categories: { type: [String], required: true },
    character: { type: String, required: true },
    pinyin: { type: String, required: true },
    english: { type: String, required: true },
    examples: { type: Array },
    starred: { type: Boolean, default: false },
    date: { type: Date, default: Date.now },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true
},
);

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
