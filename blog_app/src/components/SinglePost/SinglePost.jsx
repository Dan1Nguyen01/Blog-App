import "./singlePost.css";
import testPhoto from "../../imgs/Blog-test.jpg";
const SinglePost = () => {
  return (
    <div className="singlePost">
      <div className="singlePostWrapper">
        <img src={testPhoto} alt="" className="singlePostImg" />
        <h1 className="singlePostTitle">
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
          <div className="singlePostEdit">
            <i className="singlePostIcon fa-solid fa-pen-to-square"></i>
            <i className="singlePostIcon fa-solid fa-trash"></i>
          </div>
        </h1>
        <div className="singlePostInfo">
          <span className="singlePostAuthor">
            Author: <b>Dan</b>
          </span>

          <span className="singlePostDate">1 hour ago</span>
        </div>
        <p className="singlePostDesc">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa sed
          reprehenderit itaque odio officia? Magnam illum id, sed repudiandae
          odit hic voluptates veritatis necessitatibus repellendus nemo iste
          blanditiis sint recusandae! Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Ipsa sed reprehenderit itaque odio officia? Magnam
          illum id, sed repudiandae odit hic voluptates veritatis necessitatibus
          repellendus nemo iste blanditiis sint recusandae! Lorem ipsum dolor
          sit amet consectetur adipisicing elit. Ipsa sed reprehenderit itaque
          odio officia? Magnam illum id, sed repudiandae odit hic voluptates
          veritatis necessitatibus repellendus nemo iste blanditiis sint
          recusandae! Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Ipsa sed reprehenderit itaque odio officia? Magnam illum id, sed
          repudiandae odit hic voluptates veritatis necessitatibus repellendus
          nemo iste blanditiis sint recusandae! Lorem ipsum dolor sit amet
          consectetur adipisicing elit. Ipsa sed reprehenderit itaque odio
          officia? Magnam illum id, sed repudiandae odit hic voluptates
          veritatis necessitatibus repellendus nemo iste blanditiis sint
          recusandae!
        </p>
      </div>
    </div>
  );
};

export default SinglePost;
