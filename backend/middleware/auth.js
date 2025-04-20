import jwt from "jsonwebtoken";

const authMiddleware = async (req, res, next) => {
    const { token } = req.headers;

    if (!token) {
        return res.json({ success: false, message: "Not Authorized. Please login again." });
    }

    try {
        const token_decode = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = token_decode.id; // correct this line
        next();
    } catch (error) {
        console.error("Auth Middleware Error:", error);
        res.json({ success: false, message: "Invalid or expired token" });
    }
};

export default authMiddleware;
