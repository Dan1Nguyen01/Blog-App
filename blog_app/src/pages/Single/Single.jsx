import { useEffect, useState } from "react";
import AuthorSidebar from "../../components/Author Sidebar/AuthorSidebar";
import SinglePost from "../../components/SinglePost/SinglePost";
import "./single.css";
import { useParams } from "react-router-dom";
import axios from "axios";

const Single = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [title, setTitle] = useState(""); // Add this state for title
  const [desc, setDesc] = useState(""); // Add this state for description

  useEffect(() => {
    const getAPost = async () => {
      const res = await axios.get(`/api/post/${id}`);
      setPost(res.data);
      setTitle(res.data.title); // Set initial title state
      setDesc(res.data.desc); // Set initial description state
    };
    getAPost();
  }, []);

  return (
    <div className="single">
      <SinglePost
        post={post}
        title={title}
        setTitle={setTitle}
        desc={desc}
        setDesc={setDesc}
      />
      <AuthorSidebar post={post} />
    </div>
  );
};

export default Single;
