import { IUser, User } from "../models/User";
import { Request, Response } from "express";

export const getUsers = async(req: Request, res: Response)=>{
    const users = await User.find<IUser>()
  .skip(0)
  .limit(10);
    return res.json(users);
}

export const getUser = async(req: Request, res: Response)=>{

  const email = req.query?.email as string ?? "-";
    const user = await User.findOne<IUser>({email: email});
    if(!user){
      return res.status(401).json("Couldn't find user.");
    }

    return res.json({
      name: user.name,
      email: user.email,
      handle: user.handle
    });
}