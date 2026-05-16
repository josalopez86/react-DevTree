import jwt, {JwtPayload} from "jsonwebtoken";
import { AuthUser } from "../models/authUser";
import { envs } from "./envs";
import { error } from 'node:console';


const jwtSecret = envs.JWT_SECRET;
export const generateJWT = (payload: JwtPayload): string =>{
    return jwt.sign(payload, jwtSecret, {
        expiresIn: "1d"
    });
}

export const validateJWT = (token: string) =>{
    try{
        jwt.verify(token, jwtSecret);
        const payload = jwt.decode(token);
        console.log(payload);
        return payload;
    }catch(error){
        console.log(error);
        return new Error("Couldn't get the authentication.");

    }
    
}