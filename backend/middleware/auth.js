import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  try {
    const token = req.headers.token;
    if (!token) return res.status(401).json({ success: false, message: "No token provided" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id; //  This is essential
    next();
  } catch (err) {
    console.log("Auth error:", err);
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }
};

export default authMiddleware;
