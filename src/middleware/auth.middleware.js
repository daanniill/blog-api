export function requireAuth (req, res, next) {
  const providedKey = req.get("x-api-key");
  const adminKey = process.env.ADMIN_API_KEY;

  if (!providedKey || providedKey !== adminKey) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  next();
}