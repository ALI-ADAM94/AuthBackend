import {Request,Response ,NextFunction, RequestHandler}from "express";
interface AuthRequest extends Request{
    user?:any
}

export const checkRole =(roles:string[])=>{
    return (req:AuthRequest , res:Response , next:NextFunction)=>{
        if(!roles.includes(req.user?.role)){
            res.status(403).json({message:"Forbidden"});
            return;
        }
        return next();
    }
}