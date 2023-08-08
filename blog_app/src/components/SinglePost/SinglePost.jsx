import "./singlePost.css";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { UserContext } from "../../UserContext";
import axios from "axios";

const SinglePost = ({ post, title, setTitle, desc, setDesc }) => {
  const [updateMode, setUpdateMode] = useState(false);

  const { user } = useContext(UserContext);

  const navigate = useNavigate();
  const handleDelete = async (e) => {
    e.preventDefault();
    const res = await axios.delete(`/api/post/delete/${post._id}`, {
      data: { username: user.username },
    });
    navigate("/");
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`/api/post/updatePost/${post._id}`, {
        title: title,
        desc: desc,
      });
      setUpdateMode(false);
    } catch (err) {}
  };

  return (
    <div className="singlePost">
      <div className="singlePostWrapper">
        <div className="singlePostImg-div">
          <img src={post?.photo} alt="" className="singlePostImg" />
        </div>
        {updateMode ? (
          <input
            type="text"
            value={title}
            className="singlePostTitleInput"
            autoFocus
            onChange={(e) => setTitle(e.target.value)}
          />
        ) : (
          <h1 className="singlePostTitle">
            {post?.title}
            {user?.username === post?.username && (
              <div className="singlePostEdit">
                <i
                  className="singlePostIcon fa-solid fa-pen-to-square"
                  onClick={() => setUpdateMode(true)}
                ></i>
                <i
                  className="singlePostIcon fa-solid fa-trash"
                  onClick={handleDelete}
                ></i>
              </div>
            )}
          </h1>
        )}

        <div className="singlePostInfo">
          <span className="singlePostAuthor">
            Author: <b>{post?.username}</b>
          </span>

          <span className="singlePostDate">
            {new Date(post?.createdAt).toDateString()}
          </span>
        </div>
        {updateMode ? (
          <textarea
            className="singlePostDescInput"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
        ) : (
          <p className="singlePostDesc">{post?.desc}</p>
        )}
        {updateMode && (
          <button className="singlePostButton" onClick={handleUpdate}>
            Update
          </button>
        )}
      </div>
    </div>
  );
};

export default SinglePost;
