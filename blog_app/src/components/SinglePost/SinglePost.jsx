import "./singlePost.css";
import testPhoto from "../../imgs/Blog-test.jpg";
import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../UserContext";
import axios from "axios";
const SinglePost = () => {
  const { id } = useParams();
  const [post, setPost] = useState({});
  const PF = "http://localhost:6991/images/";
  const { user } = useContext(UserContext);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [updateMode, setUpdateMode] = useState(false);

  useEffect(() => {
    const getAPost = async () => {
      const res = await axios.get(`/api/post/${id}`);
      setPost(res?.data);
      setTitle(res?.data?.title);
      setDesc(res?.data?.desc);
    };
    getAPost();
  }, []);
  return (
    <div className="singlePost">
      <div className="singlePostWrapper">
        <div className="singlePostImg-div">
          <img src={PF + post?.photo} alt="" className="singlePostImg" />
        </div>

        <h1 className="singlePostTitle">
          {title}
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
        <p className="singlePostDesc">{desc}</p>
      </div>
    </div>
  );
};

export default SinglePost;
