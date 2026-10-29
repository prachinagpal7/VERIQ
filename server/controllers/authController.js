import userModel from "../models/userModel.js"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "../configs/config.js"
import sessionModel from "../models/sessionModel.js";
import crypto from "crypto";

export const signup = async (req, res) => {
    const {firstName, lastName, email, password} = req.body;
    if (!firstName || !lastName || !email || !password) {
        return res.status(400).json({
            message: "Please fill all fields"
        });
    }
    const isAlreadyRegistered = await userModel.findOne({ email: email })
    if(isAlreadyRegistered) {
        return res.status(409).json({
            message: "Email already exists"
        })
    } 
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await userModel.create({
        firstName, lastName, email, password: hashedPassword
    })
    const refreshToken = jwt.sign({
        id: user._id
    }, config.JWT_SECRET,
        {
            expiresIn: "7d"
        }
    )
    const refreshTokenHash = crypto.createHash("sha256").update(refreshToken).digest("hex");
    const session = await sessionModel.create({
        user: user._id,
        refreshTokenHash,
        ip: req.ip,
        userAgent: req.headers["user-agent"]
    })
    const accessToken = jwt.sign({
        id: user._id,
        sessionId: session._id
    }, config.JWT_SECRET,
        {
            expiresIn: "15m"
        }
    )
    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000
    })
    res.status(201).json({
        message: "User registered successfully",
        user: {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            streak: user.streak,
            credits: user.credits,
        },
        accessToken
    })
}

export const login = async (req, res) => {
    const {email, password} = req.body;
    if(!email || !password) {
        return res.status(400).json({
            message: "Please enter email and password"
        });
    }
    const user = await userModel.findOne({email})
    if(!user) {
        return res.status(401).json({
            message: "Invalid email or password"
        })
    } 
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if(!isPasswordValid){
        return res.status(401).json({
            message: "Invalid email or password"
        })
    }
    const refreshToken = jwt.sign({
        id: user._id
    }, config.JWT_SECRET,
        {
            expiresIn: "7d"
        }
    )
    const refreshTokenHash = crypto.createHash("sha256").update(refreshToken).digest("hex");
    const session = await sessionModel.create({
        user: user._id,
        refreshTokenHash,
        ip: req.ip,
        userAgent: req.headers["user-agent"]
    })
    const accessToken = jwt.sign({
        id: user._id,
        sessionId: session._id
    }, config.JWT_SECRET,
        {
            expiresIn: "15m"
        }
    )
    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000
    })
    res.status(201).json({
        message: "User login successfully",
        user: {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            streak: user.streak,
            credits: user.credits,
        },
        accessToken
    })
}

export const getMe = async (req, res) => {
    const user = await userModel.findById(req.user.id)
    res.status(200).json({
        message: "user fetched successfully",
        user: {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            streak: user.streak,
            credits: user.credits,
        }
    })
}

export const refreshToken = async (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    if(!refreshToken){
        return res.status(401).json({
            message: "refresh token not found"
        })
    }
    const decoded = jwt.verify(refreshToken, config.JWT_SECRET);
    const refreshTokenHash = crypto.createHash("sha256").update(refreshToken).digest("hex");
    const session = await sessionModel.findOne({
        refreshTokenHash,
        revoked: false
    })
    if(!session){
        return res.status(400).json({
            message: "Invalid refresh token"
        })
    }
    const accessToken = jwt.sign({
        id: decoded.id,
        sessionId: session._id
    }, config.JWT_SECRET,
        {
            expiresIn: "15m"
        }
    )
    const newRefreshToken = jwt.sign({
        id: decoded.id
    }, config.JWT_SECRET,
        {
            expiresIn: "7d"
        }
    )
    const newRefreshTokenHash = crypto.createHash("sha256").update(newRefreshToken).digest("hex");
    session.refreshTokenHash = newRefreshTokenHash;
    await session.save();
    res.cookie("refreshToken", newRefreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000
    })
    res.status(200).json({
        message: "Access token refreshed successfully",
        accessToken
    })
}

export const logout = async (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    if(!refreshToken){
        return res.status(400).json({
            message: "Refresh token not found"
        })
    }
    const refreshTokenHash = crypto.createHash("sha256").update(refreshToken).digest("hex");
    const session = await sessionModel.findOne({
        refreshTokenHash,
        revoked: false
    })
    if(!session){
        return res.status(400).json({
            message: "Invalid refresh token"
        })
    }
    session.revoked = true;
    await session.save();
    res.clearCookie("refreshToken")
    res.status(200).json({
        message: "Logged out successfully"
    })
    /*Delete revoked sessions older than 30 days.*/
}

export const logoutAll = async (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    if(!refreshToken){
        return res.status(400).json({
            message: "Refresh token not found"
        })
    }
    const decoded = jwt.verify(refreshToken, config.JWT_SECRET);
    await sessionModel.findMany({
        user: decoded.id,
        revoked: false
    }, {
        revoked: true
    })
    res.clearCookie("refreshToken")
    res.status(200).json({
        message: "Logged out from all devices successfully"
    })
}

export const role = async (req, res) => {
    const {role} = req.body;
    if(!["interviewee", "interviewer"].includes(role)){
        return res.status(400).json({
            message: "Invalid role"
        });
    }
    const user = await userModel.findByIdAndUpdate(
        req.user.id, {role}, {new: true}
    );
    res.status(200).json({
        message: "Role selected successfully",
        user: {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            role: user.role,
            streak: user.streak,
            credits: user.credits,
        }
    })
}