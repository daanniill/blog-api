const express = require("express");
const router = express.Router();
const { getPosts, getPostById, getPostBySlug, updatePost, createPost, deletePost } = require("../controllers/posts.controller");
const { asyncHandler } = require("../middleware/asyncHandler");
const { validateCreatePost, validateUpdatePost } = require("../middleware/post.middleware");
const { requireAuth } = require("../middleware/auth.middleware");

router.get("/", asyncHandler(getPosts));
router.get("/:id", asyncHandler(getPostById));
router.get("/slug/:slug", asyncHandler(getPostBySlug));
router.post("/", requireAuth, validateCreatePost, asyncHandler(createPost));
router.patch("/:id", requireAuth, validateUpdatePost, asyncHandler(updatePost));
router.delete("/:id", requireAuth, asyncHandler(deletePost));

module.exports = router;