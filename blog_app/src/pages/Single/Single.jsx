import { useEffect, useState } from "react";
import AuthorSidebar from "../../components/Author Sidebar/AuthorSidebar";
import Sidebar from "../../components/Sidebar/Sidebar";
import SinglePost from "../../components/SinglePost/SinglePost";
import "./single.css";
import { useParams } from "react-router-dom";
import axios from "axios";
const Single = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [authorData, setAuthorData] = useState(null);
  useEffect(() => {
    const getAPost = async () => {
      const res = await axios.get(`/api/post/${id}`);
      setPost(res.data);
    };
    getAPost();
  }, []);

  return (
    <div className="single">
      <SinglePost post={post} />
      <AuthorSidebar post={post} />
    </div>
  );
};

export default Single;
