import "./write.css";
import coffee from "../../imgs/coffe1.jpeg";
import { UserContext } from "../../UserContext";
import { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import CategoryTable from "../../components/Category Table/CategoryTable";

const Write = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);
  const [selected, setSelected] = useState([]);
  const { user } = useContext(UserContext);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handlePost = async (e) => {
    e.preventDefault();
    try {
      try {
        const res = await axios.post("/api/post/newPost", {
          title,
          desc,
          photo: file,
          categories: selected.map((item) => item.id),
        });
        navigate("/post/" + res.data._id);
      } catch (error) {
        console.error("Error in post request:", error);
      }
    } catch (error) {
      setError(error);
    }
  };

  const handleFileChange = (e) => {
    e.preventDefault();
    const selectedFile = e.target.files[0];

    if (selectedFile) {
      const formData = new FormData();
      formData.append("file", selectedFile);

      axios
        .post("/api/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          console.log("Upload response:", response); // Log the entire response object

          const uploadedFiles = response.data; // Access the uploadedFiles array directly

          if (Array.isArray(uploadedFiles) && uploadedFiles.length > 0) {
            setFile(uploadedFiles[uploadedFiles.length - 1]);
          } else {
            console.error(
              "Uploaded files data is missing or invalid:",
              uploadedFiles
            );
          }
        })
        .catch((error) => {
          console.error("Error uploading file:", error);
        });
    }
  };

  return (
    <>
      <CategoryTable selected={selected} setSelected={setSelected} />
      <div className="write">
        {file && (
          <div className="img-div">
            <img className="writeImg" src={file} alt="Imaged is Here" />
          </div>
        )}
        <form className="writeForm" onSubmit={handlePost}>
          <div className="writeFormGroup">
            <label htmlFor="fileInput">
              <i className="writeIcon fa-solid fa-plus"></i>
            </label>
            <div className="button-div">
              <input
                type="file"
                id="fileInput"
                hidden
                onChange={handleFileChange}
              />
            </div>
            <input
              type="text"
              placeholder="title"
              className="writeInput"
              autoFocus={true}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
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
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            ></textarea>
          </div>
          <button className="writeSubmit">Publish</button>
        </form>
      </div>
    </>
  );
};

export default Write;
