const pool = require("../config/db");

module.exports = {
  async getPosts(req, res) {
    try {
      const results = await pool.query("SELECT * FROM posts");
      res.status(200).json(results.rows);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
  async getPostById(req, res) {
    const id = parseInt(req.params.id);
    try {
      const results = await pool.query("SELECT * FROM posts WHERE id = $1", [id]);
      if (results.rows.length === 0) {
        res.status(404).json({ error: "Post not found" });
      } else {
        res.status(200).json(results.rows[0]);
      }
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
  async getPostBySlug(req, res) {
    const slug = req.params.slug;
    try {
      const results = await pool.query("SELECT * FROM posts WHERE slug = $1", [slug]);
      if (results.rows.length === 0) {
        res.status(404).json({ error: "Post not found" });
      } else {
        res.status(200).json(results.rows[0]);
      }
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
  async createPost(req, res) {
    const { id, title, slug, summary, content, cover_image_url } = req.body;
    if (!id || !title || !slug) {
      return res.status(400).json({ error: "id, title, and slug are required" });
    }
    try {
      const results = await pool.query(
        "INSERT INTO posts (id, title, slug, summary, content, cover_image_url) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
        [id, title, slug, summary, content, cover_image_url]
      );
      res.status(201).json(results.rows[0]);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
  async updatePost(req, res) {
    const id = parseInt(req.params.id);
    const { title, slug, summary, content, cover_image_url } = req.body;
    try {
      const results = await pool.query(
        "UPDATE posts SET title = $1, slug = $2, summary = $3, content = $4, cover_image_url = $5 WHERE id = $6 RETURNING *",
        [title, slug, summary, content, cover_image_url, id]
      );
      if (results.rows.length === 0) {
        res.status(404).json({ error: "Post not found" });
      } else {
        res.status(200).json(results.rows[0]);
      }
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
  async deletePost(req, res) {
    const id = parseInt(req.params.id);
    try {
      const results = await pool.query("DELETE FROM posts WHERE id = $1 RETURNING *", [id]);
      if (results.rows.length === 0) {
        res.status(404).json({ error: "Post not found" });
      } else {
        res.status(200).json({ message: "Post deleted successfully" });
      }
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
};
