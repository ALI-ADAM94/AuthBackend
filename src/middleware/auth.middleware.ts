import {Request,Response ,NextFunction, RequestHandler}from "express";
import jwt from "jsonwebtoken";
interface Authrequest extends Request{
    user?:any
}
export const verifyToken:RequestHandler=(req:Authrequest,res,next)=>{

 const authHeader=req.headers.authorization;
 if(!authHeader || !authHeader.startsWith("Bearer")){
    return res.status(401).json({message:'unauthorized'});
 }
  const token=authHeader.split(' ')[1];
    try {
        const decoded =jwt.verify(token,process.env.JWT_SECRET as string);
        
        req.user=decoded;
        next();
    } catch (error) {
        console.error("Token verification error",error);
        return res.status(403).json({message:"Forbidden"});
    }
}

