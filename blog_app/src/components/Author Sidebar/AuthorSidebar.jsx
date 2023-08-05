import React, { useContext, useEffect, useState } from "react";
import "./authorSidebar.css";
import me from "../../imgs/AI-2.jpg";
import axios from "axios";
import { UserContext } from "../../UserContext";
const AuthorSidebar = () => {
  const [cates, setCates] = useState([]);
  const { user } = useContext(UserContext);
  useEffect(() => {
    const getCates = async () => {
      const res = await axios.get("/api/category");
      setCates(res.data);
    };
    getCates();
  }, []);
  return (
    <div className="sidebar">
      <div className="sidebarItem">
        <span className="sidebarTitle">About Author</span>
        <img src={me} alt="" className="sidebarImg" />
        <p>
          test test test test test testtest testtest testtesttesttesttesttest
          test test test vtest test test test
        </p>
      </div>
      <div className="sidebarItem">
        <span className="sidebarTitle">Categories</span>
        <ul className="sidebarList">
          <li className="sidebarListItem">Life</li>
          <li className="sidebarListItem">Music</li>
          <li className="sidebarListItem">Style</li>
          <li className="sidebarListItem">Sport</li>
          <li className="sidebarListItem">Tech</li>
        </ul>
      </div>

      <div className="sidebarItem">
        <span className="sidebarTitle">Follow me</span>
        <div className="sidebarSocial">
          <i className="sidebarIcon fa-brands fa-square-facebook"></i>
          <i className="sidebarIcon fa-brands fa-square-instagram"></i>
          <i className="sidebarIcon fa-brands fa-square-github"></i>
        </div>
      </div>
    </div>
  );
};

export default AuthorSidebar;
