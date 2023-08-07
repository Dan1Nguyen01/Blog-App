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

  const PF = "https://blog-5qcp4ev2p-dan1nguyen01.vercel.app/images/";
  const newUserImg = user
    ? user?.profilePic
    : "e528acc397a9780c1f75b382fafe9250.jpg";

  const newUserIntro = user ? (
    user?.intro
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
        <img src={PF + newUserImg} alt="" className="sidebarImg" />
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
