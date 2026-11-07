import express, { Router } from "express";

import {getUser, registerUser} from "../controllers/auth.controller";
import{loginUser} from"../controllers/auth.controller";
import {verifyToken} from "../middleware/auth.middleware";
import { checkRole } from "../middleware/role.middleware";
import User from "../models/user.model";
const authRoutes =express.Router();
// Endpoints 
//  POST /api/auth/register
authRoutes.post('/register',registerUser);
//  POST /api/auth/login
authRoutes.post('/login',loginUser);
// verfiy Token
authRoutes.get('/protected',verifyToken,(req,res)=>{
    res.json({message:"Protected route"});
});
// check roles is admin or user 
authRoutes.get('/admin',verifyToken,checkRole(['admin','user']),(req,res)=>{
res.json({message:"Admin route Hello"})
});
// getUser
authRoutes.get('/me',verifyToken,getUser);
export default authRoutes;