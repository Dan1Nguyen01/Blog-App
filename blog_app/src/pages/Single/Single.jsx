import AuthorSidebar from "../../components/Author Sidebar/AuthorSidebar";
import Sidebar from "../../components/Sidebar/Sidebar";
import SinglePost from "../../components/SinglePost/SinglePost";
import "./single.css";

const Single = () => {
  return (
    <div className="single">
      <SinglePost />
      <AuthorSidebar />
    </div>
  );
};

export default Single;
