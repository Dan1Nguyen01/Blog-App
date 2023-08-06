import React, { useEffect, useState } from "react";
import "./posts.css";
import Post from "../Post/Post";
import axios from "axios";
const Posts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getPosts = async () => {
      const res = await axios.get("/api/post");
      setPosts(res.data);
    };
    getPosts();
  }, []);
  return (
    <div className="posts">
      {posts &&
        posts.length > 0 &&
        posts.map((p) => (
          <div key={p._id}>
            <Post post={p} />
          </div>
        ))}
    </div>
  );
};

export default Posts;
