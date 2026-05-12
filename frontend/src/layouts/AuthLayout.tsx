import { Outlet } from "react-router-dom"
import { ToasterPopup } from "../config/toasterPopup"



export const AuthLayout = () => {

  return (
    <>
      <div className="bg-slate-800 min-h-screen">
          <div className="max-w-lg mx-auto pt-10 px-5">
              <img src="/logo.svg" alt="Logo image"/>
              <div className="py-10">
                  <Outlet/>
              </div>
          </div>
      </div>
      <ToasterPopup/>
    </>
  )
}
