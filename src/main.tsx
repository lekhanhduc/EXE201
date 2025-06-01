import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import RouterCustom from "./router.tsx";
import ScrollToTop from "./component/scrollToTop/index.tsx";
import ChatBox from "./component/chatBox/index.tsx";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <ScrollToTop />
    <RouterCustom />
    <ChatBox/>
  </BrowserRouter>
);
