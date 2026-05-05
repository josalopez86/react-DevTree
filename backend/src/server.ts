import express from 'express';
import { connectDB } from './config/bd';
import { authRouter } from './auth.router';
import { userRouter } from './user.router';

const app = express();

app.use(express.json());

//routing
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);

(async () => {
   await connectDB();
})();


export default app;