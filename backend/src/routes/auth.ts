import { Router } from "express";
import { logIn, logOut, signUp } from "../controllers/auth.js";
import { verifyJWT } from "../middlewares/verifyjwt.js";
import { makeAdmin } from "../controllers/makeadmin.ts";
import{makeUser } from "../controllers/makeuser.ts"
import { verifyAdmin } from "../middlewares/verifyAdmin.ts";

const router = Router();

// Public routes
router.post("/signup", signUp);
router.post("/login", logIn);

// Protected routes
router.post("/logout", verifyJWT, logOut);

// Role routes (Protected)
router.patch("/users/:userId/make-admin", verifyJWT, verifyAdmin, makeAdmin);
router.patch("/users/:userId/make-user", verifyJWT, verifyAdmin, makeUser);
// Future routes
// router.get("/me", verifyJWT, getCurrentUser);
// router.put("/profile", verifyJWT, updateProfile);
// router.post("/change-password", verifyJWT, changePassword);

export default router;
