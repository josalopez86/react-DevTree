import { CorsOptions } from "cors";
import { envs } from './envs';


export const corsConfig: CorsOptions = {
    origin: function(origin, callback){

        const allowedUrl =  envs.ALLOWED_URLS;

        if(allowedUrl.find(f => origin)){
            return callback(null, true);
        }

        return callback(new Error("CORS error"));
        
    }
}