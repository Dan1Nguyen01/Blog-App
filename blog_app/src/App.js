import "./App.css";
import React from "react";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home/Home";
import Single from "./pages/Single/Single";
import Write from "./pages/Write/Write";
import Setting from "./pages/Settings/Setting";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import { UserContextProvider } from "./UserContext";
import { BrowserRouter, Routes, Route, HashRouter } from "react-router-dom";
import axios from "axios";
import MyBlogs from "./pages/My Blogs/MyBlogs";

axios.defaults.baseURL = "https://fine-erin-colt-tie.cyclic.app";
axios.defaults.withCredentials = true;
const App = () => {
  return (
    <div>
      <UserContextProvider>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route index element={<Home />} />
            <Route path="/myblog" element={<MyBlogs />} />
            <Route path="/post/:id" element={<Single />} />
            <Route path="/newpost" element={<Write />} />
            <Route path="/settings" element={<Setting />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </BrowserRouter>
      </UserContextProvider>
    </div>
  );
};

export default App;
