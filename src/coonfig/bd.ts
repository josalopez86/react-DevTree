import mongoose from 'mongoose';
import { envs } from './envs';

export const connectDB = async() =>{
    try{
        const url = `${envs.MONGO_URL}/${envs.MONGO_DB_NAME} `;
        const conection = await mongoose.connect(url);
        console.log("DB connected.");

    }catch( error){
        console.log({error});

    }
}