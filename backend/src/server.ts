import express from 'express';
import cors from "cors";
import { connectDB } from './config/bd';
import { authRouter } from './routes/auth.router';
import { userRouter } from './routes/user.router';
import { corsConfig } from './config/cors';
import { envs } from './config/envs';

const app = express();
const allowedUrls =  envs.ALLOWED_URLS;

app.use(cors(corsConfig));
//app.use(cors({origin: allowedUrls}));

app.use(express.json());

//routing
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);

(async () => {
   await connectDB();
})();


export default app;