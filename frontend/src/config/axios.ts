import axios from 'axios'
import type { User } from '../types';

const apiUrl = import.meta.env.VITE_API_URL;

export const api = axios.create({
    baseURL: apiUrl,
});

const LocalStorageName= "AUTH_USER";

const storedToken = localStorage.getItem(LocalStorageName) ?? "";

if(storedToken){
    const userStored =JSON.parse(storedToken) as User;

    api.interceptors.request.use((config)=>{
        if(userStored){
            config.headers.Authorization=`Bearer ${userStored.token}`;
        }

        return config;
    });
}