import { useForm } from "react-hook-form";
import type { ProfileForm, User } from "../types";
import { useQueryClient } from "@tanstack/react-query";
import { Navigate } from "react-router-dom";
import { ErrorMessage } from "../components/ErrorMessage";


export function ProfileView() {

    const queryClient = useQueryClient();
    const data : User = queryClient.getQueryData(['getUser'])!;

    if(!data) return <Navigate to={"/auth/login"}/>
    
    console.log(data);

    const {register, handleSubmit, formState:{errors}} = useForm({defaultValues:{
        handle: data?.handle,
        description: data?.description
    }});

    const handleUserProfileForm = (formData: ProfileForm) =>{
        console.log(formData);
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
                    onChange={ () => {} }
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