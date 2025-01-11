import Genre from '../models/genreModel.js';
import asyncHandler from '../middlewares/asyncHandler.js';

const createGenre = asyncHandler(async (req,res) =>{
    try{
        const name = req.body;
        if(!name){
            res.status(400).json('Name is required');
        }
        const existingGenre = await Genre.findOne({name});
        if(existingGenre){
            res.status(400).json('Genre already exists');
        }
        const genre = await new Genre({name}).save();
    }catch(error){
        res.status(400).json({message: error.message});
    }
});

export {createGenre};