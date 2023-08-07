import React, { useContext } from "react";
import "./navbar.css";
import { Link, useNavigate } from "react-router-dom";
import camel from "../../imgs/logo.png";
import { UserContext } from "../../UserContext";
import axios from "axios";
const Navbar = () => {
  const { user, setUser } = useContext(UserContext);

  const navigate = useNavigate();

  const goHome = () => {
    return navigate("/");
  };

  const PF = "https://blog-5qcp4ev2p-dan1nguyen01.vercel.app/images/";
  const logout = async (e) => {
    e.preventDefault();
    await axios.post("/api/user/logout");
    setUser(null);
    navigate("/");
  };
  return (
    <div className="top">
      <div className="topLeft">
        <div className="logoDiv">
          <img src={camel} alt="" className="logoImg" onClick={goHome} />
        </div>

        <i className="topIcon fa-brands fa-square-facebook"></i>
        <i className="topIcon fa-brands fa-square-instagram"></i>
        <i className="topIcon fa-brands fa-square-github"></i>
      </div>
      <div className="topCenter">
        <ul className="topList">
          {user && (
            <li className="topListItem">
              <Link to="/">HOME</Link>
            </li>
          )}

          {user && (
            <li className="topListItem">
              <Link to="/myblog">MY BLOGS</Link>
            </li>
          )}

          {user && (
            <li className="topListItem">
              <Link to="/newPost">WRITE</Link>
            </li>
          )}
          {user && (
            <li className="topListItem" onClick={logout}>
              LOGOUT
            </li>
          )}
        </ul>
      </div>
      <div className="topRight">
        {user ? (
          user?.profilePic != "" ? (
            <Link to="/settings">
              <img className="topImg" src={PF + user?.profilePic} alt="" />
            </Link>
          ) : (
            <Link to="/settings">
              <i className="fa-solid fa-user"></i>
            </Link>
          )
        ) : (
          <ul className="topList">
            <li className="topListItem">
              <Link to="/login">LOGIN</Link>
            </li>
            <li className="topListItem">
              <Link to="/register">REGISTER</Link>
            </li>
          </ul>
        )}
        <i className="topSearchIcon fas fa-search"></i>
      </div>
    </div>
  );
};

export default Navbar;
