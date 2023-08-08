import React, { useContext, useEffect, useState } from "react";
import "./sidebar.css";
import axios from "axios";
import { UserContext } from "../../UserContext";
const Sidebar = () => {
  const [cates, setCates] = useState([]);
  const { user } = useContext(UserContext);
  useEffect(() => {
    const getCates = async () => {
      const res = await axios.get("/api/category");
      setCates(res.data);
    };
    getCates();
  }, []);

  const newUserImg = user
    ? user?.profilePic
    : "https://images.unsplash.com/photo-1558980395-2f289089d3ec?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80";

  const newUserIntro = user ? (
    user.intro
  ) : (
    <div className="introParagraphs">
      <p>
        Embark on a journey of insights and inspiration at Camel Blog App. Join
        our community of curious minds and passionate writers, where every post
        is a gateway to new ideas.
      </p>
      <p>
        From captivating stories to practical advice, our blog covers diverse
        topics that matter to you. Explore, engage, and connect with fellow
        readers as we bring you fresh perspectives and thought-provoking
        content.
      </p>
      <p>
        Discover a world of knowledge, creativity, and connection right here at
        Camel Blog App. Happy reading!
      </p>
      <p>
        Sincerely,
        <br />
        The Camel Blog App Team (Dan Nguyen)
      </p>
    </div>
  );

  return (
    <div className="sidebar">
      <div className="sidebarItem">
        <span className="sidebarTitle">About Me</span>
        <img src={newUserImg} alt="" className="sidebarImg" />
        {newUserIntro}
      </div>
      <div className="sidebarItem">
        {user && <span className="sidebarTitle">Categories</span>}
        <ul className="sidebarList">
          {user?.categories?.length > 0 &&
            user?.categories.map((categoryId, index) => {
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

export default Sidebar;
