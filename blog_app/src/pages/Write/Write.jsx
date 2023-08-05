import "./write.css";
import coffee from "../../imgs/coffe1.jpeg";
import { UserContext } from "../../UserContext";
import { useContext, useState } from "react";
const Write = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);
  const { user } = useContext(UserContext);
  return (
    <div className="write">
      <img src={coffee} alt="" className="writeImg" />
      <form action="" className="writeForm">
        <div className="writeFormGroup">
          <label htmlFor="fileInput">
            <i className="writeIcon fa-solid fa-plus"></i>
          </label>
          <input type="file" id="fileInput" hidden />
          <input
            type="text"
            placeholder="title"
            className="writeInput"
            autoFocus={true}
          />
        </div>

        <div className="writeFormGroup">
          <textarea
            name=""
            id=""
            cols="30"
            rows="10"
            placeholder="Tell your story..."
            type="text"
            className="writeInput writeText"
          ></textarea>
        </div>
        <button className="writeSubmit">Publish</button>
      </form>
    </div>
  );
};

export default Write;
