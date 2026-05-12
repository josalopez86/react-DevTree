import { CorsOptions } from "cors";
import { envs } from './envs';


export const corsConfig: CorsOptions = {
    origin: function(origin, callback){

        const allowedUrl =  envs.ALLOWED_URLS;
        const isAPI =  envs.IS_API;

        if(isAPI){
            return callback(null, true);
        }

        if(allowedUrl.find(f => origin)){
            return callback(null, true);
        }

        return callback(new Error("CORS error"));
        
    }
}