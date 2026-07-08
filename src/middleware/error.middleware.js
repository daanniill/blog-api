export function notFoundHandler(req, res, next) {
  const error = new Error(
    `Route not found: ${req.method} ${req.originalUrl}`
  )
  error.statusCode = 404;
  next(error);
}

export function errorHandler(err, req, res, next) {
  console.error(err);
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(statusCode).json({ error: message });
}