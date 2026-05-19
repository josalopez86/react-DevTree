import {Router} from "express";
import { IUser, User } from "../models/User";
import { getAuthUser, getUserByEmail, getUsers } from "../handlers/user.handler";
import { authenticate } from "../middleware/auth";

export const userRouter = Router();

userRouter.use(authenticate);

userRouter.get("/auth", getAuthUser);

userRouter.get("/:email", getUserByEmail);

userRouter.get("/users", getUsers);