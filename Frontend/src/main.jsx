import { BrowserRouter } from "react-router-dom";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import ShopContextWrapper from "./context/ShopContext"

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <ShopContextWrapper>
      <App />
    </ShopContextWrapper>
  </BrowserRouter>,
);
