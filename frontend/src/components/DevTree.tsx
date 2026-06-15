import { Link, Outlet } from "react-router-dom"
import type { SocialNetwork, User } from "../types"
import NavigationTabs from "./NavigationTabs"
import { Toaster } from "sonner"
import { useEffect, useState } from "react"
import { DevTreeLink } from "./DevTreeLink"

type devTreeProps = {
    data?: User

}

export const DevTree = ({data}: devTreeProps) => {

    const links: SocialNetwork[] = JSON.parse(data?.links!);
    const [enableLinks, setEnableLinks] = useState(links.filter(f=> f.enabled));

    useEffect(()=>{
        setEnableLinks(links.filter(f=> f.enabled));
    },[data]);
    

return (
    <>
            <header className="bg-slate-800 py-5">
                <div className="mx-auto max-w-5xl flex flex-col md:flex-row items-center md:justify-between">
                    <div className="w-full p-5 lg:p-0 md:w-1/3">
                        <img src="/logo.svg" className="w-full block" />
                    </div>
                    <div className="md:w-1/3 md:flex md:justify-end">
                    <h1 className="text-sm text-white mt-2 pr-2">{data?.email}</h1>
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
                            to={`/${data?.handle}`}
                            target="_blank"
                            rel="noreferrer noopener"
                        >Visit My Profile: /{`${data?.handle}`}</Link>
                    </div>

                    <div className="flex flex-col md:flex-row gap-10 mt-10">
                        <div className="flex-1 ">
                            <Outlet />
                        </div>
                        <div className="w-full md:w-96 bg-slate-800 px-5 py-10 space-y-6">
                            <p className="text-4xl text-center text-white">{data?.handle}</p>
                            { data?.imageUrl && <img src={data?.imageUrl} alt="Profile image" className="mx-auto max-w[250px]"/>}
                            <p className="text-center text-lg font-black text-white">
                                {data?.description}
                            </p>
                            <div className="mt-20 flex flex-col gap-5">
                                {
                                    enableLinks.map((link)=>{
                                        return <DevTreeLink key={link.name} link = {link}/>
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </main>
            </div>
            <Toaster position="top-right" />
        </>
  )
}
