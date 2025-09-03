import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./page/Login";
import Main from "./page/Main";
import Register from "./page/Register";

function App() {
     return (
          <BrowserRouter>
               <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/main" element={<Main />} />
               </Routes>
          </BrowserRouter>
     );
}

export default App;
