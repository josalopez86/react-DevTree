import { Navigate } from "react-router-dom";
import { AuthService } from "../services/auth.service";
import { useQuery } from "@tanstack/react-query";
import { DevTree } from "../components/DevTree";

const service = new AuthService();

const getUser = async() =>{

    const response = await service.GetAuthUser();
    if(!response.success){
        throw new Error(response.message);
    }

    console.log(response.data);

    return response.data;
}

export function AppLayout() {
    const {data, isLoading, isError} = useQuery({
        queryKey:['getUser'],
        queryFn: getUser,
        refetchOnWindowFocus:false,
        retry:1,
        staleTime: 1000 * 60 * 5} //milisegundos 
    );

    //service.GetAuthUser(userStored.token).then(f =>{ authUser = f.data!});

    if(isLoading){
       return <h1>Loading...</h1> 
    }

    if(isError){
        return <Navigate to={"/auth/login"}/>;
    }

    if(data) return (        
        <DevTree data = { data }/>
    )
}