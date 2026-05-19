import jwt, {JwtPayload} from "jsonwebtoken";
import { AuthUser } from "../models/authUser";
import { envs } from "./envs";


const jwtSecret = envs.JWT_SECRET;
export const generateJWT = (payload: JwtPayload): string =>{
    return jwt.sign(payload, jwtSecret, {
        expiresIn: "1d"
    });
}

export const validateJWT = (token: string) =>{
    try{
        if(!token){
            return "";
        }

        jwt.verify(token, jwtSecret);
        const payload = jwt.decode(token) as AuthUser;
        return payload;
    }catch(error){
        console.log(error);
        return null;

    }
    
}