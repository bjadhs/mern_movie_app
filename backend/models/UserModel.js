import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        maxLen: 32,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minLen: 8,
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false,
    }
}, {timestamps: true});

export default mongoose.model('User', userSchema);

