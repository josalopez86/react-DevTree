import{ NextFunction, Request, Response} from "express";
import { validateJWT } from "../config/jwt";
import { IUser } from "../models/User";

declare global{
  namespace express{
    interface Request{
      user: IUser
    }
  }
}

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  const bearer = req.headers.authorization;
  
  if(!bearer){
    return res.status(401).json("User unauthorized.");
  }

  const [, token] = bearer.split(" ");

  const data = validateJWT(token);

  if(!data){
    return res.status(401).json("Couldn't authorize the user.");
  }

  (req as any).user = data;
  
  next();
}