const validPostFields = [
  "title",
  "slug",
  "summary",
  "content",
  "cover_image_url",
];

export function validatePostFields(req, res, next) {
  const {
    title,
    slug,
    summary,
    content,
    cover_image_url,
  } = req.body;

  // Check required fields.
  if (typeof title !== "string" || !title.trim()) {
    return res.status(400).json({
      error: "Title is required and must be a non-empty string",
    });
  }

  if (typeof slug !== "string" || !slug.trim()) {
    return res.status(400).json({
      error: "Slug is required and must be a non-empty string",
    });
  }

  // Check for fields that the API does not accept.
  const invalidFields = Object.keys(req.body).filter(
    (field) => !validPostFields.includes(field)
  );

  if (invalidFields.length > 0) {
    return res.status(400).json({
      error: `Invalid fields: ${invalidFields.join(", ")}`,
    });
  }

  if (title.trim().length > 200) {
    return res.status(400).json({
      error: "Title must be 200 characters or fewer",
    });
  }

  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug.trim())) {
    return res.status(400).json({
      error:
        "Slug can only contain lowercase letters, numbers, and single hyphens",
    });
  }

  if (
    summary !== undefined &&
    (typeof summary !== "string" || !summary.trim())
  ) {
    return res.status(400).json({
      error: "Summary must be a non-empty string",
    });
  }

  if (
    content !== undefined &&
    (typeof content !== "string" || !content.trim())
  ) {
    return res.status(400).json({
      error: "Content must be a non-empty string",
    });
  }

  if (
    cover_image_url !== undefined &&
    cover_image_url !== null &&
    (typeof cover_image_url !== "string" ||
      !cover_image_url.trim())
  ) {
    return res.status(400).json({
      error: "Cover image URL must be a non-empty string or null",
    });
  }

  // Normalize values before passing them to the controller.
  req.body.title = title.trim();
  req.body.slug = slug.trim();

  if (typeof summary === "string") {
    req.body.summary = summary.trim();
  }

  if (typeof content === "string") {
    req.body.content = content.trim();
  }

  if (typeof cover_image_url === "string") {
    req.body.cover_image_url = cover_image_url.trim();
  }

  next();
}

export function validateCreatePost(req, res, next) {
  if (!req.body.title || !req.body.slug) {
    return res.status(400).json({
      error: "Title and slug are required fields",
    });
  }
  return validPostFields(req, res, next);
}

export function validateUpdatePost(req, res, next) {
  if (!req.body.title && !req.body.slug && !req.body.summary && !req.body.content && !req.body.cover_image_url) {
    return res.status(400).json({
      error: "At least one field (title, slug, summary, content, cover_image_url) must be provided for update",
    });

    next();
  }
}