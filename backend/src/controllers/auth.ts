import type { Request, Response } from "express";

import user from "../models/user.js";
import bcrypt from "bcrypt";

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict" as const,
};

export const signUp = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "all fields are required",
      });
    }

    const existingUser = await user.findOne({ email });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "user already exists",
      });
    }

    const newUser = await user.create({
      name,
      email,
      password,
    });

    const accessToken = newUser.generateAccessToken();
    const refreshToken = newUser.generateRefreshToken();

    newUser.refreshToken = refreshToken;
    await newUser.save({
      validateBeforeSave: false,
    });

    return res
      .status(201)
      .cookie("accessToken", accessToken, cookieOptions)
      .cookie("refreshToken", refreshToken, cookieOptions)
      .json({
        success: true,
        message: "User created successfully",
        user: newUser,
      });
  } catch (error) {
    console.log("this message from auth api", error);
    return res.status(500).json({
      success: false,
      message: "internal server error",
    });
  }
};

export const logIn = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "all fields are required",
      });
    }

    const existingUser = await user.findOne({ email }).select("+password");

    if (!existingUser) {
      return res.status(409).json({
        success: false,
        message: "email or passwors is wrong",
      });
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password,
    );
    if (!isPasswordCorrect) {
      return res.status(409).json({
        success: false,
        message: "email or password is wrong",
      });
    }

    const accessToken = existingUser.generateAccessToken();
    const refreshToken = existingUser.generateRefreshToken();

    existingUser.refreshToken = refreshToken;
    await existingUser.save({
      validateBeforeSave: false,
    });

    return res
      .status(200)
      .cookie("accessToken", accessToken, cookieOptions)
      .cookie("refreshToken", refreshToken, cookieOptions)
      .json({
        success: true,
        message: "User logIn successfully",
        user: {
          _id: existingUser._id,
          name: existingUser.name,
          email: existingUser.email,
          role: existingUser.role,
        },
      });
  } catch (error) {
    console.log("this message from auth api", error);
    return res.status(500).json({
      success: false,
      message: "internal server error",
    });
  }
};

export const logOut = async (req: Request, res: Response) => {
  try {
     const userId = req.user!._id;

     await user.findByIdAndUpdate(
        userId,
        {
          $unset: {
            refreshToken : 1,
          },
        },
        {
          new: true,
        }

     );

     return res.status(200)
     .clearCookie("accessToken", cookieOptions)
     .clearCookie("refreshToken", cookieOptions).json({
      success: true ,
      message: "loged out successfully"
     })

  } catch (error) {
    console.log("this message from auth api", error);
    return res.status(500).json({
      success: false,
      message: "internal server error",
    });
  }
};