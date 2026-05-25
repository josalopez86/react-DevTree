
export type User ={
    name: string,
    email: string,
    handle: string,
    token: string,
    description: string
 }

 export type RegisterForm = Pick<User, "handle" | "email" | "name" > & {
    password: string,
    password_confirmation: string
 }

 export type LogingForm = Pick<User, "email"> & {
    password: string
 }

 export type ProfileForm = Pick<User, "handle" | "description">

 export type RequestResponse ={
    message: string,
    success: boolean,
   
 }

 export type RequestResponseData<T> =  RequestResponse & {
    data?: T
 }