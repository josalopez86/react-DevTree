import {Router} from "express";

export const router = Router();

router.post("/auth/register", (req, res)=>{

    var {email, name} = req.body;
    res.json(`Hello ${email} ${name}`);
});

