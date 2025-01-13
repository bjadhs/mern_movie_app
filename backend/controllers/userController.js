import User from '../models/UserModel.js';
import asyncHandler from '../middlewares/asyncHandler.js';
import bcrypt from 'bcryptjs';
import createToken from '../utils/createToken.js';

const createUser = asyncHandler(async (req, res) =>{
    const { username, email, password } = req.body;

    if(!username || !email || !password){
        res.status(400);
        throw new Error("Please fill all the fields");
    }
    
    //User already exists
    const existingUser = await User.findOne({email});
    if(existingUser){
        res.status(400);
        throw new Error("User already exists");
    }

    //Hashing the password
    const salt = await bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({username, email, password: hashedPassword});
    
    try{
        await newUser.save();
        createToken(res, newUser._id);

        res.status(201).json(newUser);

    }catch(err){
        console.error(`Error in creating user: ${err.message}`);
        res.status(500);
        throw new Error("Error in creating user");

    }

})

const loginUser = asyncHandler(async (req,res) =>{
    const { email, password } = req.body;
    const existingUser = await User.findOne({email});

    if(existingUser){
        const validPassword =  bcrypt.compare(password, existingUser.password);
        if(validPassword){
            createToken(res, existingUser._id);
            res.status(201).json(existingUser);
        }else{
            res.status(401);
            throw new Error("Invalid credentials");
        }
    }else{
        res.status(400);
        throw new Error("User does not exist");
    }

})

const logoutUser = asyncHandler(async (req, res) =>{
    res.cookie('jwt', {
        expires: new Date(Date.now() + 10 * 1000),
        httpOnly: true
    })
    res.status(200).json({message: "Logged out successfully"});
})

const getAllUsers = asyncHandler(async (req, res) =>{
    const users = await User.find({});
    res.status(200).json(users);
})




export { createUser, loginUser, logoutUser, getAllUsers };