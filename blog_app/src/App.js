import "./App.css";
import React from "react";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home/Home";
import Single from "./pages/Single/Single";
import Write from "./pages/Write/Write";
import Setting from "./pages/Settings/Setting";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:6991";
axios.defaults.withCredentials = true;
const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route index element={<Home />} />
          <Route path="/single:id" element={<Single />} />
          <Route path="/newpost" element={<Write />} />
          <Route path="/settings" element={<Setting />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
