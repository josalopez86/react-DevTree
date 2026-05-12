import 'dotenv/config';
import { get } from 'env-var';


export const envs = {

  PORT: get('PORT').required().asPortNumber(),
  MONGO_URL: get('MONGO_URL').required().asString(),
  MONGO_DB_NAME: get('MONGO_DB_NAME').required().asString(),
  ALLOWED_URLS: get('ALLOWED_URLS').required().asArray(),
  IS_API: process.argv.includes('--api'),
  JWT_SECRET: get('JWT_SECRET').required().asString(),
}



