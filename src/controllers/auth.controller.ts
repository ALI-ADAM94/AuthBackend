import {Request,Response} from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.model";
interface Authrequest extends Request{
    user?:any
}
// registerUser
export const registerUser =async(req:Request,res:Response):Promise<any>=>{
    try {
        const {email,password ,role}=req.body;
        if(!email || !password){
            return res.status(400).json({message:"Please provide email and password"});
        }
        const existingUser =await User.findOne({email});
        if(existingUser){
            return res.status(400).json({message:"User already exists"});
        }
        const hashPassword = await bcrypt.hash(password,10);
        const newUser=await  User.create({
            email,
            password:hashPassword,
            role:role || 'user'
        });
        return res.status(201).json({message:"User created Successfully",user:newUser});

    } catch (error) {
        console.error("Error Registering user:",error);    
        return res.status(500).json({message:"Internal server error"}); 
    }
}
// loginUser 
export const loginUser =async(req:Request,res:Response):Promise<any>=>{
    try {
        const {email,password} =req.body;
        if(!email || !password ){
            return res.status(400).json({messga:"Please provide email and password "});
        }
        const user=await User.findOne({email});
        if(!user){
            return res.status(400).json({message:"Invalid email or password"});
        }
        const isMatch = await bcrypt.compare(password,user.password);
        
        if(!isMatch){
              return res.status(400).json({message:"Invalid email or password"});
        }
        const token= jwt.sign({userId:user._id,role:user.role},process.env.JWT_SECRET||"G69HWODN'YJD14" as string ,{expiresIn:"1h"});
        return res.status(200).json({message:"Login Successfully",token,user:user})
    } catch (error) {
        console.error("Error logging in user :",error);
    }
}
// getUser
export const getUser =async(req:Authrequest,res:Response):Promise<any>=>{
try {
    const userId=req.user.userId;
    const user =await User.findById(userId).select("-password");
    if(!user){
        return res.status(404).json({message:"User not found"});
    }
    return res.status(200).json({ user });
} catch (error) {
    console.error("Error getting user:",error);
    return res.status(500).json({message:"internal server error"});
}
}