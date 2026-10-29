import jwt from "jsonwebtoken";
import config from "../configs/config.js";

export const authMiddleware = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if(!token){
            return res.status(401).json({
                message: "Token not found"
            })
        }
        const decoded = jwt.verify(token, config.JWT_SECRET);
        if(!decoded){
            return res.status(401).json({
                message: "Invalid or expired token"
            })
        }
        req.user = decoded;
        next();
    } catch (error) {
        console.error("Auth middleware error:", error.message);
        return res.status(401).json({
            message: "Invalid or expired token"
        })
    }
}

export default authMiddleware;