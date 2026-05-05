import colors from 'colors';

import { envs } from "./config/envs";
import server from "./server";

const port = envs.PORT || 4000;
server.listen(port, ()=>{
    console.log(colors.bgWhite.white("Server running port: "+ port));
});