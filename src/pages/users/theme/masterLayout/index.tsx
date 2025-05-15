import { Outlet } from "react-router-dom"
import Footer from "../footer"
import Header from "../header"

const MasterLayout = () => {
  return (
    <div>
      <Header/>
      <main>
        <Outlet/>
      </main>
      <Footer/>
    </div>
  )
}

export default MasterLayout
