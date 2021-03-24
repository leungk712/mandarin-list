const express = require('express');
const router = express.Router();
const {
    createPost,
    deletePost,
    getPosts,
    getIndividualPost,
    updatePost 
} = require('../../controllers/posts');
const { authenticateToken } = require('../../middleware/authenticate.js');

// GET
router.get("/:userId", getPosts);

router.get("/:userId/post/:postId", authenticateToken, getIndividualPost);

// POST
router.post("/:userId", authenticateToken, createPost);

// UPDATE
router.put("/:userId/post/:postId", authenticateToken, updatePost);

// DELETE
router.delete("/:userId/post/:postId", authenticateToken, deletePost);

module.exports = router;

// @TODO unsure if able to implement draggable solution in mongodb?
// router.route("/update-mandarin-list").put((req, res) => {
//     Post.updateMany(req)
//         .then(() => res.json('Mandarin list order updated!'))
//         .catch(err => res.statusMessage(500).json(`Error: ${err}`));
// });
