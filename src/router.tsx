import { Routes, Route } from "react-router-dom";
import MasterLayout from "./pages/users/theme/masterLayout";
import { ROUTERS } from "./utils/router";
import HomePage from "./pages/users/homePage";

const renderUserRouter = () => {
  return (
    <div>
      <Routes>
        <Route element={<MasterLayout/>}>
          <Route path={ROUTERS.USER.HOME} element={<HomePage/>}/>
        </Route>
      </Routes>
    </div>
  )
};
const RouterCustom = () => {
  return renderUserRouter()
}
export default RouterCustom
