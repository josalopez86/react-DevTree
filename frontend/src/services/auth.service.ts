import { isAxiosError } from "axios";
import { api } from "../config/axios";
import type { LogingForm, ProfileForm, RegisterForm, RequestResponse, RequestResponseData, User } from "../types";



export class AuthService{

    Register = async(data: RegisterForm): Promise<RequestResponse>=> {
        try{
            const url = `/auth/register`;
            const response = await api.post(url, data);

            if(response.status!==200){
                return {message:response.data.error, success:false };
            }

            return {message:response.data, success:true };

            

        }catch(error){
            if (isAxiosError(error)) {
                return {message: error.response?.data.error, success:false };
            }
            return {message: "something went wrong!!", success:false };
        }
    }

    Login = async(data: LogingForm): Promise<RequestResponseData<User>>=> {
        try{
            const url = `/auth/login`;
            const response = await api.post<User>(url, data);

            return { data:response.data, success:true , message: "Logged in."};
        }catch(error){
            if (isAxiosError(error)) {
                return {message: error.response?.data.error, success:false };
            }
            return {message: "something went wrong!!", success:false };
        }
    }

    GetAuthUser = async(): Promise<RequestResponseData<User>>=> {
        try{
            const url = `/user/auth`;
            const response = await api.get<User>(url);

            return { data: response.data, success:true , message: "Logged in."};
        }catch(error){
            if (isAxiosError(error)) {
                return {message: error.response?.data.error, success:false };
            }
            console.log(error);
            return {message: "something went wrong!!", success:false };
        }
    }

    UpdateProfile = async(data: ProfileForm): Promise<RequestResponseData<User>>=> {
        try{
            const url = `/auth/login`;
            const response = await api.post<User>(url, data);

            return { data:response.data, success:true , message: "Logged in."};
        }catch(error){
            if (isAxiosError(error)) {
                return {message: error.response?.data.error, success:false };
            }
            return {message: "something went wrong!!", success:false };
        }
    }
}