const jwt = require("jsonwebtoken");

// Middleware to protect routes by verifying the JWT token
const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  // If there's no token, return 401 Unauthorized
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Add the user ID from the token to the request object
    req.userId = decoded.userId;

  
    next();
  } catch (error) {
    // If the token is invalid or expired, return 403 Forbidden
    res.status(403).json({ message: "Invalid token" });
  }
};

module.exports = authMiddleware;
