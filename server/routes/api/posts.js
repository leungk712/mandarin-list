const express = require('express');
const router = express.Router();
const Post = require('../../models/post.model');
const {
    createPost,
    deletePost,
    getPosts,
    getIndividualPost,
    updatePost 
} = require('../../controllers/posts');

// GET
router.get("/", getPosts);

router.get("/:id", getIndividualPost);

// POST
router.post("/", createPost);

// UPDATE
router.put("/:id", updatePost);


// @TODO unsure if able to implement draggable solution in mongodb?
// router.route("/update-mandarin-list").put((req, res) => {
//     Post.updateMany(req)
//         .then(() => res.json('Mandarin list order updated!'))
//         .catch(err => res.statusMessage(500).json(`Error: ${err}`));
// });

// DELETE
router.delete("/:id", deletePost);

module.exports = router;
