import { validationResult } from 'express-validator';
import { checkPassword, hashPassword } from '../config/auth';
import { getSlug } from '../config/slug';
import { User } from "../models/User";
import { Request, Response } from "express";

export const createAccount = async(req: Request, res: Response)=>{

    const {email, password, handle} = req.body;
    req.body.handle = getSlug(handle);

    const exist = await User.findOne({email: email});

    if(exist){
        return res.status(400).json({error: "Email already exist."});

    }

    const handleExist = await User.findOne({handle: req.body.handle});

    if(handleExist){
        return res.status(400).json({error: `Handle already exist: ${req.body.handle}`});

    }
    
    req.body.password = await hashPassword(password);    

    await User.create(req.body);
    return res.json(`User created.`);
}

export const logIn = async(req: Request, res: Response)=>{
    const {email, password} = req.body;
    const error = "User or password incorrect.";
    
    const userExist = await User.findOne({email: email});

    if(!userExist){
        return res.status(400).json({error: error});
    }
    
    if(await checkPassword(password, userExist.password) == false){
        return res.status(400).json({error: error});
    }

    return res.json(userExist);
}