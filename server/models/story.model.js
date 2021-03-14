const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const storySchema = new Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true
});

const Story = mongoose.model('Story', storySchema);

module.exports = Story;