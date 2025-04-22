const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.headers.token;

  if (!token) {
    return res.status(401).json({ message: "No token provided." });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      // Detailed error message to help debug the issue
      return res.status(401).json({
        message: "Invalid or malformed token.",
        error: err.message,
      });
    }
    req.user = decoded; // Attach the decoded info to the request
    next();
  });
};
