import mongoose, { Schema } from 'mongoose';

export interface IUser{
    name: string,
    email: string,
    password: string,
    handle: string
}

const userSchema = new Schema({
    name: {
        type: String,
        require: true,
        trim : true
    },
    email: {
        type: String,
        unique: true,
        require: true,
        trim : true,
        lowercase: true
    },
    handle: {
        type: String,
        unique: true,
        require: true,
        trim : true,
        lowercase: true
    },
    password: {
        type: String,
        require: true,
        trim : true
    }
});

export const User = mongoose.model<IUser>("Users", userSchema);