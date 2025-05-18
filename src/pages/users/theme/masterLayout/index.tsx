import { Outlet } from "react-router-dom";
import Footer from "../footer";
import Header from "../header";
import "./"
const MasterLayout = () => {
  return (
    <div className="layout">
      <Header />
      <main className="main-content">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MasterLayout;
