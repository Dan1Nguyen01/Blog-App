import React from "react";
import "./navbar.css";

const Navbar = () => {
  return (
    <div className="top">
      <div className="topLeft">
        <i className="topIcon fa-brands fa-square-facebook"></i>
        <i className="topIcon fa-brands fa-square-instagram"></i>
        <i className="topIcon fa-brands fa-square-github"></i>
      </div>
      <div className="topCenter">
        <ul className="topList">
          <li className="topListItem">
            <a href="#home">Home</a>
          </li>
          <li className="topListItem">
            <a href="#home">About</a>
          </li>
          <li className="topListItem">
            <a href="#home">Contact</a>
          </li>
          <li className="topListItem">
            <a href="#home">Write</a>
          </li>
          <li className="topListItem">
            <a href="#home">Logout</a>
          </li>
        </ul>
      </div>
      <div className="topRight">
        <img
          className="topImg"
          src="https://images.pexels.com/photos/1858175/pexels-photo-1858175.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
          alt=""
        />
        <i className="topSearchIcon fa-solid fa-magnifying-glass"></i>
      </div>
    </div>
  );
};

export default Navbar;
