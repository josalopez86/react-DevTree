import { cloudinary } from "../config/cloudinary";
import { getSlug } from "../config/slug";
import { IUser, User } from "../models/User";
import { Request, Response } from "express";
import formidable  from "formidable";

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
    handle: user.handle,
    description: user.description,
    imageUrl: user.imageUrl,
    links: user.links
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

export const updateProfile = async(req: Request, res: Response)=>{
  try{
    const {user: {email}} = (req as any);
    let {handle, description, links} = req.body;
    handle = getSlug(handle);

    const validateUser = await User.findOne<IUser>({email: { $ne: email },
    handle: handle});
    
    if(validateUser){
      return res.status(400).json("Handle already used.");
    }

    const user = await User.updateOne({email: email},{description: description, handle: handle, links: links} );

    if(!user){
      return res.status(404).json("Couldn't found the user.");
    }
    if(user.modifiedCount > 0){
      return res.json("User updated.");
    }
    return res.status(400).json("Couldn't update the user.");
  }
  catch(error){
    console.log(error);
    return res.status(500).json("Unhandled error. Try again.");
  }
}

export const uploadImage = async(req: Request, res: Response)=>{
  try{
    const form = formidable({multiples: false});
    form.parse(req, async (error, fields, files)=>{
      const filePath = files.file?.[0].filepath; 
      if(!filePath){
        return res.status(400).json("File is required.");
      }
      try{
        const result = await cloudinary.uploader.upload(filePath, {folder:"devtree"});
        const {user: {email}} = (req as any);
        const user = await User.updateOne({email: email},{imageUrl: result.secure_url} );
        if(!user){
          return res.status(404).json("Couldn't found the user.");
        }

        res.json({image: result.secure_url});
      }
      catch(error){
        console.log(error);
        return res.status(400).json("Couldn't upload the image");
      }

    });
  }catch(error)
  {
    console.log(error);
    return res.status(500).json("Unhandled error. Try again.");
  }
}