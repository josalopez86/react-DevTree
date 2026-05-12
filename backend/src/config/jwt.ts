import jwt, {JwtPayload} from "jsonwebtoken";
import { AuthUser } from "../models/authUser";
import { envs } from "./envs";


const jwtSecret = envs.JWT_SECRET;
export const generateJWT = (payload: JwtPayload): string =>{
    return jwt.sign(payload, jwtSecret, {
        expiresIn: "1d"
    });

}