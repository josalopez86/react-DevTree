import { useForm } from "react-hook-form"
import { Link } from "react-router-dom"
import { ErrorMessage } from "../components/ErrorMessage";
import type { RegisterForm } from "../types";
import { AuthService } from '../services/auth.service';
import { SuccessMessage } from "../components/SuccessMessage";
import { useState } from "react";


export const RegisterView = () => {
    
    const initialValues: RegisterForm = {
        name:"test",
        email:"test@test.com",
        handle:"test123",
        password:"12345678",
        password_confirmation:"12345678",
    };

    const [success, setsuccess] = useState(false);
    const [message, setmessage] = useState("");

    const authService = new AuthService();

    const {register, watch, handleSubmit, formState:{errors} } = useForm({ defaultValues: initialValues});

    const password = watch("password");

    const handleRegisater = async(formData: RegisterForm) =>{
        const response = await authService.Register(formData);
        setmessage(response.message);
        setsuccess(response.success);


    }

  return (
    <>
        <h1 className="text-4xl text-white font-bold">Create Account</h1>

        <form onSubmit={handleSubmit(handleRegisater)}
            className="bg-white px-5 py-5 rounded-lg space-y-5 mt-5">
            <div className="grid grid-cols-1 space-y-3">
                <label htmlFor="name" className="text-2xl text-slate-500">Name</label>
                <input
                    id="name"
                    type="text"
                    placeholder="Name"
                    className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400"
                    {...register("name", {required: "Name is required"})}/>

                {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
            </div>
            <div className="grid grid-cols-1 space-y-3">
                <label htmlFor="email" className="text-2xl text-slate-500">E-mail</label>
                <input
                    id="email"
                    type="email"
                    placeholder="Email"
                    className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400"
                    {...register("email", {required: "Email is required", 
                                            pattern: { value: /\S+@\S+\.\S+/,  message: "Invalid email"}})}/>
                    {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
            </div>
            <div className="grid grid-cols-1 space-y-3">
                <label htmlFor="handle" className="text-2xl text-slate-500">User name</label>
                <input
                    id="handle"
                    type="text"
                    placeholder="User name"
                    className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400"
                    {...register("handle", {required: "User name is required"})}/>
                    {errors.handle && <ErrorMessage>{errors.handle.message}</ErrorMessage>}
            </div>
            <div className="grid grid-cols-1 space-y-3">
                <label htmlFor="password" className="text-2xl text-slate-500">Password</label>
                <input
                    id="password"
                    type="password"
                    placeholder="Password"
                    className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400"
                    {...register("password", {required: "Password is required", 
                                                minLength:{value: 8, message:"Min 8 characters"}, 
                                                maxLength: {value: 15, message:"Max 15 characters"}})}/>
                    {errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}
            </div>

            <div className="grid grid-cols-1 space-y-3">
                <label htmlFor="password_confirmation" className="text-2xl text-slate-500">Confirm Password</label>
                <input
                    id="password_confirmation"
                    type="password"
                    placeholder="Confirm Password"
                    className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400"
                    {...register("password_confirmation", {required: "Confirmation password is required",
                                                            validate: (value)=> value ===password || "Passwords don't match"
                    })}/>
                    {errors.password_confirmation && <ErrorMessage>{errors.password_confirmation.message}</ErrorMessage>}
            </div>

            {!success && message && <ErrorMessage>{message}</ErrorMessage>}
            {success && message && <SuccessMessage>{message}</SuccessMessage>}

            <input
                type="submit"
                className="bg-cyan-400 p-3 text-lg w-full uppercase text-slate-600 rounded-lg font-bold cursor-pointer"
                value='Create Account'/>  
        </form>

        <nav className="mt-10">
            <Link to="/auth/login" className="text-center text-white text-lg block">
                Login
            </Link>
        </nav>
    </>
  )
}
