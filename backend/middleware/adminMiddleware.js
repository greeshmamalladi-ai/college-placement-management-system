const adminMiddleware = (req, res, next) => {
  if (!req.student || req.student.role !== "admin") {
    return res.status(403).json({
      message: "Access denied. Admins only."
    });
  }

  next();
};

module.exports = adminMiddleware;