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

export default createUser;