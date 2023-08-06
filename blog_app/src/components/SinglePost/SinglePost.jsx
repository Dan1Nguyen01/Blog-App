import "./singlePost.css";
import testPhoto from "../../imgs/Blog-test.jpg";
import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../UserContext";
import axios from "axios";
const SinglePost = ({ post }) => {
  const PF = "http://localhost:6991/images/";

  const [updateMode, setUpdateMode] = useState(false);

  return (
    <div className="singlePost">
      <div className="singlePostWrapper">
        <div className="singlePostImg-div">
          <img src={PF + post?.photo} alt="" className="singlePostImg" />
        </div>

        <h1 className="singlePostTitle">
          {post?.title}
          <div className="singlePostEdit">
            <i className="singlePostIcon fa-solid fa-pen-to-square"></i>
            <i className="singlePostIcon fa-solid fa-trash"></i>
          </div>
        </h1>
        <div className="singlePostInfo">
          <span className="singlePostAuthor">
            Author: <b>{post?.username}</b>
          </span>

          <span className="singlePostDate">
            {new Date(post?.createdAt).toDateString()}
          </span>
        </div>
        <p className="singlePostDesc">{post?.desc}</p>
      </div>
    </div>
  );
};

export default SinglePost;
