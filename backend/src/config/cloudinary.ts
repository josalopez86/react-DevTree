import { v2 as cloudinary } from 'cloudinary';
import { envs } from './envs';

    // Configuration
cloudinary.config({ 
    cloud_name: envs.CLOUDINARY_NAME, 
    api_key: envs.CLOUDINARY_KEY, 
    api_secret: envs.CLOUDINARY_SECRET // Click 'View API Keys' above to copy your API secret
});

export {cloudinary};