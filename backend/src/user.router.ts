import {Router} from "express";
import { IUser, User } from "./models/User";
import { getUsers } from "./handlers/user.handler";

export const userRouter = Router();

userRouter.get("/", getUsers);