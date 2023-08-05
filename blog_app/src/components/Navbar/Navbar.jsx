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
          <li className="topListItem">
            <Link to="/">HOME</Link>
          </li>
          <li className="topListItem">ABOUT</li>
          <li className="topListItem">CONTACT</li>
          <li className="topListItem">
            <Link to="/newPost">WRITE</Link>
          </li>
          {user && (
            <li className="topListItem" onClick={logout}>
              LOGOUT
            </li>
          )}
        </ul>
      </div>
      <div className="topRight">
        {user ? (
          <Link to="/settings">
            <img
              className="topImg"
              src="https://images.pexels.com/photos/1858175/pexels-photo-1858175.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
              alt=""
            />
          </Link>
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
