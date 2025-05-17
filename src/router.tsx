import { Routes, Route } from "react-router-dom";
import MasterLayout from "./pages/users/theme/masterLayout";
import { ROUTERS } from "./utils/router";
import HomePage from "./pages/users/homePage";
import Login from "./pages/authentication/login";
import ForgotPassword from "./pages/authentication/forgotPassword";
import Register from "./pages/authentication/register";
import AboutUS from "./pages/users/aboutUS";

const renderUserRouter = () => {
  return (
    <div>
      <Routes>
        <Route element={<MasterLayout/>}>
          <Route path={ROUTERS.USER.HOME} element={<HomePage/>}/>
          <Route path={ROUTERS.USER.ABOUTUS} element={<AboutUS/>}/>
        </Route>
          <Route path={ROUTERS.AUTH.LOGIN} element={<Login/>}/>
          <Route path={ROUTERS.AUTH.FORGOTPASSWORD} element={<ForgotPassword/>}/>
          <Route path={ROUTERS.AUTH.REGISTER} element={<Register/>}/>
      </Routes>
    </div>
  )
};
const RouterCustom = () => {
  return renderUserRouter()
}
export default RouterCustom
