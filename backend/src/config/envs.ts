import 'dotenv/config';
import { get } from 'env-var';


export const envs = {

  PORT: get('PORT').required().asPortNumber(),
  MONGO_URL: get('MONGO_URL').required().asString(),
  MONGO_DB_NAME: get('MONGO_DB_NAME').required().asString(),
  ALLOWED_URLS: get('ALLOWED_URLS').required().asArray(),
  IS_API: process.argv.includes('--api'),
  JWT_SECRET: get('JWT_SECRET').required().asString(),
  CLOUDINARY_KEY: get('CLOUDINARY_KEY').required().asString(),
  CLOUDINARY_NAME: get('CLOUDINARY_NAME').required().asString(),
  CLOUDINARY_SECRET: get('CLOUDINARY_SECRET').required().asString(),
  CLOUDINARY_FOLDER: get('CLOUDINARY_FOLDER').required().asString(),
}



