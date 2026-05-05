import {Router} from "express";
import { createAccount, logIn } from "./handlers/auth.handler";
import { body } from "express-validator";
import { handleInputErrors } from "./middleware/validation";

export const authRouter = Router();

authRouter.post("/register",
    body('handle').notEmpty().withMessage("Handle is required"),
    body('name').notEmpty().withMessage("Name is required"),
    body('email').isEmail().withMessage("Invalid email"),
    body('password').isLength({min: 8, max:15}).withMessage("Password is required. Min:8, Max:15"),
    handleInputErrors,
    createAccount);
authRouter.post("/login",
    body('email').isEmail().withMessage("Invalid email"),
    body('password').isLength({min: 8, max:15}).withMessage("Password is required."),
    handleInputErrors,
    logIn);

