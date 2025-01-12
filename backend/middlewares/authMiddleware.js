import jwt from 'jsonwebtoken';
import User from '../models/UserModel.js';
import asyncHandler from './asyncHandler.js';

const authenticate = asyncHandler(async (req, res, next) =>{
    let token;
    //Read jwt token from cookies
    token = req.cookies.jwt;

    //if token present then verify it    
    if(token){
        try{
            const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decodedToken.userId).select("-password");
            next();

        }catch(err){
            res.status(401);
            throw new Error("Not authorized, no token");
        }
    }

})

const authorizeAdmin = (req, res, next) =>{
    if(req.user && req.user.isAdmin){
        next();
    }else{
        res.status(401).send("Not authorized as an admin.");
    }
}

export {authenticate, authorizeAdmin};