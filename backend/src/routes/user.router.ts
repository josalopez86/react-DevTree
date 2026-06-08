import {Router} from "express";
import { getAuthUser, getUserByEmail, getUsers, updateProfile, uploadImage } from "../handlers/user.handler";
import { authenticate } from "../middleware/auth";
import { body } from "express-validator";
import { handleInputErrors } from "../middleware/validation";

export const userRouter = Router();

userRouter.use(authenticate);

userRouter.get("/auth", getAuthUser);

userRouter.get("/users", getUsers);

userRouter.post("/image", uploadImage);

userRouter.get("/:email", getUserByEmail);

userRouter.patch("/",
    body('handle').notEmpty().withMessage("Handle is required"),
    body('description').notEmpty().withMessage("Description is required"),
    handleInputErrors,
    updateProfile);