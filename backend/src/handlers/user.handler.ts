import { IUser, User } from "../models/User";
import { Request, Response } from "express";

export const getUsers = async(req: Request, res: Response)=>{

  const users = await User.find<IUser>()
  .skip(0)
  .limit(10);
    return res.json(users);
}

export const getAuthUser = async(req: Request, res: Response)=>{

  const {user: {email}} = (req as any);

  const user = await User.findOne<IUser>({email: email});
  if(!user){
    return res.status(404).json("Couldn't find user.");
  }

  return res.json({
    name: user.name,
    email: user.email,
    handle: user.handle
  });
}

export const getUserByEmail = async(req: Request, res: Response)=>{

  const email = req.query?.email as string ?? "-";
    const user = await User.findOne<IUser>({email: email}).select("name email handle");//.select("-password")
    if(!user){
      return res.status(401).json("Couldn't find user.");
    }

    return res.json(user);
}