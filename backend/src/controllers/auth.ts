import type { Request, Response } from "express";

import user from "../models/user.js";

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

    const options = {
        httpOnly:true,
        secure:process.env.NODE_ENV === "production",
        sameSite: "strict" as const ,
    };



    return res.status(201)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json({
      success: true,
       message: "User created successfully",
       user: newUser,

    });

    



  } 
  catch (error) {
    console.log("this message from auth api", error)
    return res.status(500).json({
      success: false,
      message: "internal server error",
    });
  }
};
