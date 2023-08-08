import { useContext, useState, useEffect } from "react";
import "./setting.css";
import { UserContext } from "../../UserContext";
import axios from "axios";
import CategoryUser from "../../components/Category User/CategoryUser";
import { useNavigate } from "react-router-dom";

const Setting = () => {
  const { user, setUser } = useContext(UserContext);
  const [username, setUsername] = useState(user?.username);
  const [email, setEmail] = useState(user?.email);
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [photo, setPhoto] = useState(user?.profilePic);
  const [intro, setIntro] = useState(user?.intro);
  const [returns, setReturns] = useState("");
  const [selected, setSelected] = useState([]);

  const handleFileChange = async (e) => {
    e.preventDefault();
    const selectedFile = e.target.files[0];

    if (selectedFile) {
      const formData = new FormData();
      formData.append("file", selectedFile);

      try {
        const response = await axios.post("/api/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        const uploadedFiles = response.data.data; // Access the uploadedFiles array directly

        if (Array.isArray(uploadedFiles) && uploadedFiles.length > 0) {
          setPhoto(uploadedFiles[uploadedFiles.length - 1]);
        } else {
          console.error(
            "Uploaded files data is missing or invalid:",
            uploadedFiles
          );
        }
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put("/api/user/update", {
        username,
        profilePic: photo,
        email,
        id: user._id,
        categories: selected.map((item) => item.id),
      });

      setReturns("Update Successfull");
    } catch (error) {
      setReturns(error.data);
    }
  };

  const handleUpdatePassword = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put("/api/user/updateP", {
        password,
        newPassword,
        id: user._id,
      });

      setReturns("Update Successfull");
      setPassword("");
      setNewPassword("");
    } catch (error) {
      setReturns(error.data);
    }
  };
  const handleRemoveCategory = (categoryId) => {
    const updatedSelected = selected.filter((item) => item.id !== categoryId);
    setSelected(updatedSelected);
  };

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const getAllCategories = async () => {
      try {
        const res = await axios.get("/api/category/");
        setCategories(res.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    getAllCategories();
  }, [categories.length]);

  const handleYoursRemoveCategory = (categoryId) => {
    console.log("Removing Category with ID:", categoryId);
    setUser((prevUser) => ({
      ...prevUser,
      categories: prevUser.categories.filter((id) => id !== categoryId),
    }));
  };

  const navigate = useNavigate();
  const handleDeleteUser = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.delete(`/api/user/delete/${user._id}`);
      setUser(null);
      navigate("/");
    } catch (err) {}
  };
  return (
    <>
      <CategoryUser
        selected={selected}
        setSelected={setSelected}
        categories={categories}
        setCategories={setCategories}
      />
      <div className="setting">
        <div className="settingWrapper">
          <div className="settingTitle">
            <span className="settingUpdateTitle">Update Your Account</span>
            <span className="settingDeleteTitle" onClick={handleDeleteUser}>
              Delete Your Account
            </span>
          </div>
          <form className="settingForm">
            <label htmlFor="">Profile Picture</label>
            <div className="settingProfilePic">
              {photo && (
                <div className="img-div">
                  <img className="writeImg" src={photo} alt="" />
                </div>
              )}

              <label htmlFor="fileInput">
                <i className="settingProfilePicIcon fa-solid fa-user"></i>
              </label>

              <input
                type="file"
                id="fileInput"
                hidden
                onChange={handleFileChange}
              />
            </div>
            <label htmlFor="">UserName</label>
            <input
              type="text"
              placeholder="abcdan"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <label htmlFor="">Email</label>
            <input
              type="email"
              placeholder="abcdan@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <div className="settingForm">
              <label htmlFor="">About Me</label>
              <textarea
                className="settingTextarea"
                rows="4"
                placeholder="Tell us about yourself..."
                value={intro}
                onChange={(e) => setIntro(e.target.value)}
              ></textarea>
            </div>

            {user?.categories?.length > 0 && (
              <div className="selectedCategories">
                <h3>Your Categories:</h3>
                <ul className="selectedCategoryList">
                  {user.categories.map((categoryId) => {
                    const category = categories.find(
                      (cat) => cat._id === categoryId
                    );
                    return (
                      <li key={categoryId} className="selectedCategoryItem">
                        {category ? category.name : "Unknown Category"}
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            handleYoursRemoveCategory(categoryId);
                          }}
                          className="removeButton"
                        >
                          <i className="fa-solid fa-circle-xmark"></i>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
            <div className="selectedCategories">
              <h3>New Categories:</h3>
              <ul className="selectedCategoryList">
                {selected.map((item, index) => (
                  <li key={index} className="selectedCategoryItem">
                    {item.name}
                    <button
                      onClick={() => handleRemoveCategory(item.id)}
                      className="removeButton"
                    >
                      <i className="fa-solid fa-circle-xmark"></i>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <button className="settingSubmit" onClick={handleUpdate}>
              Update
            </button>
          </form>
          {returns && <div>{returns}</div>}

          <form className="settingForm">
            <label htmlFor="">Password</label>
            <input
              type="password"
              placeholder="abcdan password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <label htmlFor="">New Password</label>
            <input
              type="password"
              placeholder="new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />

            <button className="settingSubmit" onClick={handleUpdatePassword}>
              Update Password
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Setting;
