import { useEffect, useState } from "react";
import { social } from "../data/social";
import { DevTreeInput } from "../components/DevTreeInput";
import { isValidURL } from "../utils";
import { toast } from 'sonner';
import { useQueryClient } from "@tanstack/react-query";
import { AuthService } from "../services/auth.service";
import type { SocialNetwork, User } from "../types";


export const LinkTreeView = () => {
  const queryclient = useQueryClient();
  const dataUser: User = queryclient.getQueryData(["getUser"])!;
  const links:SocialNetwork[] = JSON.parse(dataUser.links);
  const [devTreeLinks, setDevTreeLinks] = useState(social);
  const authService = new AuthService();

  useEffect(()=>{
    const updatedLink = devTreeLinks.map(item=>{
      const userLink = links.find(f=>f.name === item.name);
      if(userLink){
        item.enabled = userLink.enabled;
        item.url = userLink.url;
      }
      return item;
    });
    setDevTreeLinks(updatedLink);
  }, []);

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>)=>{
    const updatedLink = devTreeLinks.map(link=> link.name === e.target.name ? {...link, url:e.target.value } : link);
    setDevTreeLinks(updatedLink);
    queryclient.setQueriesData({queryKey:["getUser"]}, (prevData: User)=>{
      return {
        ...prevData,        
        links: JSON.stringify(updatedLink)
      };
    });
  }

  const handleEnableLink = (value: boolean, name: string)=>{
    const updatedLink = devTreeLinks.map(link=> {
      if(link.name === name){
        if(value && !isValidURL(link.url)){
          toast.error("Invalid URL.");
          return link;
        }
        link.enabled = value;
      }      
      return link;
    });
    setDevTreeLinks(updatedLink);
    queryclient.setQueriesData({queryKey:["getUser"]}, (prevData: User)=>{
      return {
        ...prevData,
        links: JSON.stringify(updatedLink)
      };
    });
  }

  const handleSaveLinks = async() =>{
    const dataUser: User = queryclient.getQueryData(["getUser"])!;
    const response = await authService.UpdateProfile(dataUser);
        if(response.success){
            toast.success(`${response.message}`);
        }else{
            toast.error(response.message);
        }
  }
  
  return (
    <>
      <div className="space-y-5">
        {
          devTreeLinks.map(item=>{
            return <DevTreeInput key={item.name} 
                    item={item}
                    handleUrlChange = {handleUrlChange}
                    handleEnableLink = {handleEnableLink} />
          })
        }
        <input type="button"
            onClick={handleSaveLinks}
            className="bg-cyan-400 p-2 text-lg w-full uppercase text-slate-600 rounded-lg font-bold cursor-pointer"
            value='Save'
        />
      </div>
    </>
  )
}
