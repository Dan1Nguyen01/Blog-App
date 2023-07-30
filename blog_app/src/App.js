import "./App.css";
import React from "react";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home/Home";
import Single from "./pages/Single/Single";
const App = () => {
  return (
    <div>
      <Navbar />
      {/* <Home /> */}
      <Single />
    </div>
  );
};

export default App;
