import express from 'express';
import {router} from "./router";

const app = express();

//routing
app.use("/", router);


export default app;