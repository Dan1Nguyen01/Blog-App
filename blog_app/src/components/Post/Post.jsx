import React from "react";
import "./post.css";
import { Link } from "react-router-dom";
const Post = ({ post }) => {
  const PF = "http://localhost:6991/images/";
  return (
    <div className="post">
      <img src={PF + post?.photo} alt="test" className="postImg" />
      <div className="postInfo">
        <div className="postCats">
          {post?.categories?.length > 0 &&
            post.categories.map((c) => (
              <span className="postCat" key={c?._id}>
                {c?.name}
              </span>
            ))}
        </div>
        <Link className="link" to={`/post/${post?._id}`}>
          <span className="postTitle">{post?.title}</span>
          <hr />
          <span className="postDate">
            {new Date(post?.createAt).toDateString()}
          </span>
          <p className="postDesc">{post?.desc}</p>
        </Link>
      </div>
    </div>
  );
};

export default Post;
