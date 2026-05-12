import { useForm } from "react-hook-form"
import { Link } from "react-router-dom"
import { ErrorMessage } from "../components/ErrorMessage";
import type { LogingForm } from "../types";
import { toast } from "sonner";
import { AuthService } from "../services/auth.service";

export const LoginView = () => {
  const initialValues: LogingForm = {
    email:"test@test.com",
    password: "123456789"
  }
  const {register, handleSubmit, reset, formState:{errors}} = useForm({defaultValues:initialValues});
  const authService = new AuthService();

  const handleLogin = async(formData: LogingForm)=>{
    console.log("test");
    const response = await authService.Login(formData);
        if(response.success){
            toast.success(`${response.message}:  ${response.data?.name}`);
        }else{
            toast.error(response.message);
        }

  }

  return (
    <>
        <h1 className="text-4xl text-white font-bold">Login</h1>

        <form 
          onSubmit={handleSubmit(handleLogin)}
          className="bg-white px-5 py-5 rounded-lg space-y-10 mt-5"
          noValidate
      >
          <div className="grid grid-cols-1 space-y-3">
              <label htmlFor="email" className="text-2xl text-slate-500">E-mail</label>
              <input
                  id="email"
                  type="email"
                  placeholder="Email de Registro"
                  className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400"
                  {...register("email", {
                      required: "Email is required",
                      pattern: {
                          value: /\S+@\S+\.\S+/,
                          message: "Invalid email",
                      },
                  })}
              />
              {errors.email && (
                  <ErrorMessage>{errors.email.message}</ErrorMessage>
              )}
          </div>
          <div className="grid grid-cols-1 space-y-3">
              <label htmlFor="password" className="text-2xl text-slate-500">Password</label>
              <input
                  id="password"
                  type="password"
                  placeholder="Password"
                  className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400"
                  {...register("password", {
                      required: "Password is required",
                  })}
              />
              {errors.password && (
                  <ErrorMessage>{errors.password.message}</ErrorMessage>
              )}
          </div>

          <input
              type="submit"
              className="bg-cyan-400 p-3 text-lg w-full uppercase text-slate-600 rounded-lg font-bold cursor-pointer"
              value='Log In'
          />
      </form>

        <nav className="mt-10">
            <Link to="/auth/register" className="text-center text-white text-lg block">
                Create Account
            </Link>
        </nav>
    </>
  )
}
