const express = require("express");
const router = express.Router();
const { getPosts, getPostById, getPostBySlug, updatePost, createPost, deletePost } = require("../controllers/posts.controller");

router.get("/", (req, res) => {getPosts(req, res)});
router.get("/:id", (req, res) => {getPostById(req, res)});
router.get("/slug/:slug", (req, res) => {getPostBySlug(req, res)});
router.post("/", (req, res) => {createPost(req, res)});
router.put("/:id", (req, res) => {updatePost(req, res)});
router.delete("/:id", (req, res) => {deletePost(req, res)});

module.exports = router;