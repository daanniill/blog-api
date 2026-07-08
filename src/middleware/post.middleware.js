const validPostFields = [
  "title",
  "slug",
  "summary",
  "content",
  "cover_image_url"
]

function validatePostFields(req, res, next) {
  const { title, slug, summary, content, cover_image_url } = req.body;

  if (!title || !slug) {
    return res.status(400).json({ error: "Title and slug are required" });
  }

  // Check for invalid fields in the request body
  const invalidFields = Object.keys(req.body).filter(
    (field) => !validPostFields.includes(field)
  );
  if (invalidFields.length > 0) {
    return res.status(400).json({ error: `Invalid fields: ${invalidFields.join(", ")}` });
  }

  // Check individual field types
  if (title) {
    if (typeof title !== "string" || !title.trim()) {
      return res.status(400).json({ error: "Title must be a non-empty string" });
    } else if (title.length > 200) {
      return res.status(400).json({ error: "Title must be 200 characters or fewer" });
    }
  }

  if (slug) {
    if (typeof slug !== "string" || !slug.trim()) {
      return res.status(400).json({ error: "Slug must be a non-empty string" });
    } else if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
      return res.status(400).json({ error: "Slug must be a valid format" });
    }
  }

  if (summary) {
    if (typeof summary !== "string" || !summary.trim()) {
      return res.status(400).json({ error: "Summary must be a non-empty string" });
    }
  }

  if (content) {
    if (typeof content !== "string" || !content.trim()) {
      return res.status(400).json({ error: "Content must be a non-empty string" });
    }
  }

  if (cover_image_url) {
    if (typeof cover_image_url !== "string" || !cover_image_url.trim()) {
      return res.status(400).json({ error: "Cover image URL must be a non-empty string" });
    }
  }

  if (errors.length > 0) {
    return res.status(400).json({ error: errors });
  }

  next();
}