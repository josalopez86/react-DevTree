import mongoose, { Document, Schema } from 'mongoose';

export interface IUser{
    name: string,
    email: string,
    password: string,
    handle: string,
    description: string, 
    imageUrl: string,
    links: string
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
    },
    description: {
        type: String,
        default:"",
        trim : true
    },
    imageUrl: {
        type: String,
        default:"",
    },
    links: {
        type: String,
        default:"[]",
    }

});

export const User = mongoose.model<IUser>("Users", userSchema);