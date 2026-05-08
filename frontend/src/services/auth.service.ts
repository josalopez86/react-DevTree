import axios from "axios";
import type { RegisterForm, RequestResponse } from "../types";

const apiUrl = import.meta.env.VITE_API_URL;

export class AuthService{
    Register = async(data: RegisterForm): Promise<RequestResponse>=> {
        try{
            const url = `${apiUrl}/auth/register`;
            const response = await axios.post(url, data);

            if(response.status!==200){
                return {message:response.data.error, success:false };
            }

            return {message:response.data, success:true };

            

        }catch(error){
            if (axios.isAxiosError(error)) {
                return {message: error.response?.data.error, success:false };
            }
            return {message: "something went wrong!!", success:false };

        }

    }
}