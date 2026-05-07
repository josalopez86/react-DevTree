import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { LoginView, RegisterView } from './views/index';
import { AuthLayout } from "./layouts/AuthLayout";

export default function Router()
{
  return (
    <BrowserRouter>
        <Routes>
            <Route element={<AuthLayout/>}>
                <Route path="auth/login" element={<LoginView/>} />
                <Route path="auth/register" element={<RegisterView/>} />
                <Route path="*" element={<Navigate to="/auth/login" replace />} />
            </Route>

        </Routes>
    </BrowserRouter>
  )
}
