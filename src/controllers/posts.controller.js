const pool = require("../config/db");

module.exports = {
  getPosts(req, res) {
    try {
      pool.query("SELECT * FROM posts", (error, results) => {
        if (error) {
          throw error;
        }
        res.status(200).json(results.rows);
      });
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
  getPostById(req, res) {
    const id = parseInt(req.params.id);
    try {
      pool.query("SELECT * FROM posts WHERE id = $1", [id], (error, results) => {
        if (error) {
          throw error;
        }
        if (results.rows.length === 0) {
          res.status(404).json({ error: "Post not found" });
        } else {
          res.status(200).json(results.rows[0]);
        }
      });
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
  getPostBySlug(req, res) {
    const slug = req.params.slug;
    try {
      pool.query("SELECT * FROM posts WHERE slug = $1", [slug], (error, results) => {
        if (error) {
          throw error;
        }
        if (results.rows.length === 0) {
          res.status(404).json({ error: "Post not found" });
        } else {
          res.status(200).json(results.rows[0]);
        }
      });
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
  createPost(req, res) {
    const { id, title, slug, summary, content, cover_image_url } = req.body;
    try {
      pool.query(
        "INSERT INTO posts (id, title, slug, summary, content, cover_image_url) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
        [id, title, slug, summary, content, cover_image_url],
        (error, results) => {
          if (error) {
            throw error;
          }
          res.status(201).json(results.rows[0]);
        }
      );
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
  updatePost(req, res) {
    const id = parseInt(req.params.id);
    const { title, slug, summary, content, cover_image_url } = req.body;
    try {
      pool.query(
        "UPDATE posts SET title = $1, slug = $2, summary = $3, content = $4, cover_image_url = $5 WHERE id = $6 RETURNING *",
        [title, slug, summary, content, cover_image_url, id],
        (error, results) => {
          if (error) {
            throw error;
          }
          if (results.rows.length === 0) {
            res.status(404).json({ error: "Post not found" });
          } else {
            res.status(200).json(results.rows[0]);
          }
        }
      );
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
  deletePost(req, res) {
    const id = parseInt(req.params.id);
    try {
      pool.query("DELETE FROM posts WHERE id = $1 RETURNING *", [id], (error, results) => {
        if (error) {
          throw error;
        }
        if (results.rows.length === 0) {
          res.status(404).json({ error: "Post not found" });
        } else {
          res.status(200).json({ message: "Post deleted successfully" });
        }
      });
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  } 
};