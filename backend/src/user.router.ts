import {Router} from "express";
import { IUser, User } from "./models/User";
import { getUser, getUsers } from "./handlers/user.handler";

export const userRouter = Router();

userRouter.get("/users", getUsers);

userRouter.get("/", getUser);