import React, { useEffect, useState } from "react";
import "./yourpost.css";
import Post from "../../components/Post/Post";
import axios from "axios";
const YourPosts = () => {
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

      <Post />

      <Post />

      <Post />

      <Post />

      <Post />
    </div>
  );
};

export default YourPosts;
