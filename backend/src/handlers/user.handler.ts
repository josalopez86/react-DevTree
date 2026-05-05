import { IUser, User } from "../models/User";
import { Request, Response } from "express";

export const getUsers = async(req: Request, res: Response)=>{
    const users = await User.find<IUser>()
  .skip(0)
  .limit(10);
    return res.json(users);
}