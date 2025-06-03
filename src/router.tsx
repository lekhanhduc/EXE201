import { Routes, Route } from "react-router-dom";
import MasterLayout from "./pages/users/theme/masterLayout";
import { ROUTERS } from "./utils/router";
import HomePage from "./pages/users/homePage";
import Login from "./pages/authentication/login";
import ForgotPassword from "./pages/authentication/forgotPassword";
import Register from "./pages/authentication/register";
import AboutUS from "./pages/users/aboutUS";
import ContactUS from "./pages/users/contactUS";
import FestivalEvent from "./pages/users/event/festivalEvent";
import OurPatner from "./pages/users/ourPatner";
import EventList from "./pages/users/event/eventList";
import EventType from "./pages/users/event/eventType";
import EventDetails from "./pages/users/event/eventDetails";
import DecideEvent from "./pages/users/decide";
import PurchaseForm from "./pages/users/purchaseForm";
import Payment from "./pages/users/payment";
import Profile from "./pages/users/profile";
import Cart from "./pages/users/cart";
import CallbackGoogle from "./component/googleLogin";


const renderUserRouter = () => {
  return (
    <div>
      <Routes>
        <Route element={<MasterLayout />}>
          <Route path={ROUTERS.USER.HOME} element={<HomePage />} />
          <Route path={ROUTERS.USER.ABOUTUS} element={<AboutUS />} />
          <Route path={ROUTERS.USER.CONTACTUS} element={<ContactUS />} />
          <Route path={ROUTERS.USER.EVENTTYPE} element={<EventType />} />
          <Route path={ROUTERS.USER.FESTIVALEVENT} element={<FestivalEvent />} />
          <Route path={ROUTERS.USER.OURPATNER} element={<OurPatner />} />
          <Route path={ROUTERS.USER.EVENTLIST} element={<EventList />} />
          <Route path={ROUTERS.USER.EVENTDETAILS} element={<EventDetails />} />
          <Route path={ROUTERS.USER.DECIDEEVENT} element={<DecideEvent />} />
          <Route path={ROUTERS.USER.PURCHASE} element={<PurchaseForm />} />
          <Route path={ROUTERS.USER.PAYMENT} element={<Payment />} />
          <Route path={ROUTERS.USER.PROFILE} element={<Profile />} />
          <Route path={ROUTERS.USER.MYCART} element={<Cart />} />
        </Route>
        <Route path={ROUTERS.AUTH.LOGIN} element={<Login />} />
        <Route
          path={ROUTERS.AUTH.FORGOTPASSWORD}
          element={<ForgotPassword />}
        />
        <Route path={ROUTERS.AUTH.REGISTER} element={<Register />} />
        <Route path={ROUTERS.AUTH.GOOGLE_CALLBACK} element={<CallbackGoogle />} />
      </Routes>


    </div>
  );
};
const RouterCustom = () => {
  return renderUserRouter();
};
export default RouterCustom;
