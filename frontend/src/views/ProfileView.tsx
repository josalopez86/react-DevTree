import { useForm } from "react-hook-form";
import type { ProfileForm, User } from "../types";
import { useQueryClient } from "@tanstack/react-query";
import { Navigate } from "react-router-dom";
import { ErrorMessage } from "../components/ErrorMessage";
import { AuthService } from "../services/auth.service";
import { toast } from "sonner";


export function ProfileView() {

    const queryClient = useQueryClient();
    const data : User = queryClient.getQueryData(['getUser'])!;

    if(!data) return <Navigate to={"/auth/login"}/>

    const {register, handleSubmit, formState:{errors}} = useForm<ProfileForm>({defaultValues:{
        handle: data?.handle,
        description: data?.description
    }});

    const authService = new AuthService();

    const handleChange = async(e: React.ChangeEvent<HTMLInputElement>)=>{

        if(e.target.files){
            const file = e.target.files[0]; 
            if(!file.type.includes("image")){
                toast.error("Should be an image.");
                e.target.value = ""; 
                return;
            }

            const response = await authService.UploadImage(file);
            if(response.success){                
                toast.success(`Image uploaded successfully.`);
                queryClient.setQueryData(["getUser"], (prevData: User)=>{
                    return{
                        ...prevData,
                        imageUrl: response.data

                    }
                });

            }else{
                toast.error(response.message);
            }
        }
    }
    const handleUserProfileForm = async(formData: ProfileForm) =>{
        const response = await authService.UpdateProfile(formData);
        if(response.success){
            toast.success(`${response.message}`);
            queryClient.invalidateQueries({queryKey: ["getUser"] });
        }else{
            toast.error(response.message);
        }
    }
    
    return (
        <form 
            className="bg-white p-10 rounded-lg space-y-5"
            onSubmit={handleSubmit(handleUserProfileForm)}
        >
            <legend className="text-2xl text-slate-800 text-center">Edit Information</legend>
            <div className="grid grid-cols-1 gap-2">
                <label
                    htmlFor="handle"
                >Handle:</label>
                <input
                    type="text"
                    className="border-none bg-slate-100 rounded-lg p-2"
                    placeholder="Handle or Username"
                    {...register('handle', {required:"Username is required."})}/>
                    {errors.handle && <ErrorMessage>{errors.handle.message}</ErrorMessage>}
            </div>

            <div className="grid grid-cols-1 gap-2">
                <label
                    htmlFor="description"
                >Description:</label>
                <textarea
                    className="border-none bg-slate-100 rounded-lg p-2 resize-none"
                    placeholder="Your Description"
                    rows={3}
                    {...register('description', {required:"Description is required."})}/>
                    {errors.description && <ErrorMessage>{errors.description.message}</ErrorMessage>}
            </div>

            <div className="grid grid-cols-1 gap-2">
                <label
                    htmlFor="image"
                >Image:</label>
                <input
                    id="image"
                    type="file"
                    name="handle"
                    className="border-none bg-slate-100 rounded-lg p-2"
                    accept="image/*"
                    onChange={ handleChange }
                />
            </div>

            <input
                type="submit"
                className="bg-cyan-400 p-2 text-lg w-full uppercase text-slate-600 rounded-lg font-bold cursor-pointer"
                value='Save'
            />
        </form>
    )
}