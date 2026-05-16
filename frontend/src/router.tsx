import { BrowserRouter, Routes, Route, } from "react-router-dom";
import { LoginView, ProfileView, RegisterView } from './views/index';
import { AuthLayout } from "./layouts/AuthLayout";
import { AppLayout } from "./layouts/AppLayout";
import { LinkTreeView } from "./views/LinkTreeView";

export default function Router()
{
  return (
    <BrowserRouter>
        <Routes>
            <Route element={<AuthLayout/>}>
                <Route path="auth/login" element={<LoginView/>} />
                <Route path="auth/register" element={<RegisterView/>} />
                {/* <Route path="*" element={<Navigate to="/auth/login" replace />} /> */}
            </Route>
            <Route path="/admin" element={<AppLayout/>}>
              <Route index={true} element={<LinkTreeView/>}/>
              <Route path="profile" element={<ProfileView/>}></Route>

            </Route>
        </Routes>
    </BrowserRouter>
  )
}
