import { envs } from "./coonfig/envs";
import server from "./server";

const port = envs.PORT || 4000;
server.listen(port, ()=>{
    console.log("Server running port: ", port);
});