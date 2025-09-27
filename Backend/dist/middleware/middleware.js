import jwt from "jsonwebtoken";
export const authenticateJWT = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1]; // "Bearer <token>"
    if (!token)
        return res.status(401).json({ error: "Token missing" });
    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        req.userEmail = payload.email; // ye sabhi controllers me accessible hoga
        next();
    }
    catch (err) {
        return res.status(403).json({ error: "Invalid token" });
    }
};
//# sourceMappingURL=middleware.js.map