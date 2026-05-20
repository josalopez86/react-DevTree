import { Link, Navigate, Outlet } from "react-router-dom";
import { Toaster } from "sonner";
import NavigationTabs from "../components/NavigationTabs";
import { AuthService } from "../services/auth.service";
import { useQuery } from "@tanstack/react-query";

const service = new AuthService();

const getUser = async() =>{

    const response = await service.GetAuthUser();
    if(!response.success){
        throw new Error(response.message);
    }

    return response;
}

export function AppLayout() {
    const {data, isLoading, isError} = useQuery({
        queryKey:["getUser"],
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

    console.log("Entro...");

    return (
        <>
            <header className="bg-slate-800 py-5">
                <div className="mx-auto max-w-5xl flex flex-col md:flex-row items-center md:justify-between">
                    <div className="w-full p-5 lg:p-0 md:w-1/3">
                        <img src="/logo.svg" className="w-full block" />
                    </div>
                    <div className="md:w-1/3 md:flex md:justify-end">
                    <h1 className="text-sm text-white mt-2 pr-2">{data?.data?.email}</h1>
                        <button
                            className=" bg-lime-500 p-2 text-slate-800 uppercase font-black text-xs rounded-lg cursor-pointer"
                            onClick={() => {}}
                        >
                            Log out
                        </button>
                    </div>
                </div>
            </header>
            <div className="bg-gray-100  min-h-screen py-10">
                <main className="mx-auto max-w-5xl p-10 md:p-0">
                    <NavigationTabs/>

                    <div className="flex justify-end">
                        <Link 
                            className="font-bold text-right text-slate-800 text-2xl"
                            to={''}
                            target="_blank"
                            rel="noreferrer noopener"
                        >Visit My Profile</Link>
                    </div>

                    <div className="flex flex-col md:flex-row gap-10 mt-10">
                        <div className="flex-1 ">
                            <Outlet />
                        </div>
                        <div className="w-full md:w-96 bg-slate-800 px-5 py-10 space-y-6">

                        </div>
                    </div>
                </main>
            </div>
            <Toaster position="top-right" />
        </>
    )
}