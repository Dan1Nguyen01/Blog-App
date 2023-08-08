import React, { useContext, useEffect, useState } from "react";
import "./authorSidebar.css";
import me from "../../imgs/AI-2.jpg";
import axios from "axios";
import { UserContext } from "../../UserContext";
const AuthorSidebar = ({ post }) => {
  const [cates, setCates] = useState([]);
  const [authorData, setAuthorData] = useState(null);
  const username = post?.username;

  useEffect(() => {
    const getCates = async () => {
      const res = await axios.get("/api/category");
      setCates(res.data);
    };
    getCates();
  }, []);

  useEffect(() => {
    const getAuthor = async () => {
      try {
        console.log("author right here: " + username);
        const res = await axios.get("/api/user/", { username });
        setAuthorData(res.data);
        console.log("data right here " + res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getAuthor();
  }, [username]);

  return (
    <div className="sidebar">
      <div className="sidebarItem">
        <span className="sidebarTitle">About Author</span>
        <img src={authorData?.profilePic} alt="" className="sidebarImg" />
        <h3>{authorData?.username}</h3>
        <p>{authorData?.intro}</p>
      </div>
      <div className="sidebarItem">
        <span className="sidebarTitle">Categories</span>
        <ul className="sidebarList">
          {authorData?.categories?.length > 0 &&
            authorData?.categories.map((categoryId, index) => {
              const category = cates.find((cat) => cat._id === categoryId);
              return (
                <li className="sidebarListItem" key={index}>
                  {category ? category.name : "Unknown Category"}
                </li>
              );
            })}
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
