import React from "react";
import "./post.css";
import testPic from "../../imgs/AI-2.jpg";
const Post = () => {
  return (
    <div className="post">
      <img src={testPic} alt="test" className="postImg" />
      <div className="postInfo">
        <div className="postCats">
          <span className="postCat">Music</span>
          <span className="postCat">Music</span>
        </div>

        <span className="postTitle">
          Lorem ipsum dolor sit amet consectetur
        </span>
        <hr />
        <span className="postDate">1 hour ago</span>
        <p className="postDesc">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Cupiditate
          distinctio unde fuga corporis facilis, quaerat ea tempore quidem,
          nihil fugit eveniet vero animi? Inventore non architecto odit
          doloremque corrupti quaerat.
        </p>
      </div>
    </div>
  );
};

export default Post;
