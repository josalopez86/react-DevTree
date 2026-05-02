import express, { json } from 'express';
import {router} from "./router";
import { connectDB } from './coonfig/bd';

const app = express();

connectDB();

app.use(json());

//routing
app.use("/", router);


export default app;