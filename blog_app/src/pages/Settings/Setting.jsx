import Sidebar from "../../components/Sidebar/Sidebar";
import "./setting.css";

const Setting = () => {
  return (
    <div className="setting">
      <div className="settingWrapper">
        <div className="settingTitle">
          <span className="settingUpdateTitle">Update Your Account</span>
          <span className="settingDeleteTitle">Delete Your Account</span>
        </div>
        <form action="" className="settingForm">
          <label htmlFor="">Profile Picture</label>
          <div className="settingProfilePic">
            <img src="" alt="" />

            <label htmlFor="fileInput">
              <i className="settingProfilePicIcon fa-solid fa-user"></i>
            </label>

            <input type="file" id="fileInput" hidden />
          </div>
          <label htmlFor="">UserName</label>
          <input type="text" placeholder="abcdan" />
          <label htmlFor="">Email</label>
          <input type="email" placeholder="abcdan@gmail.com" />

          <label htmlFor="">Password</label>
          <input type="password" placeholder="abcdan password" />
          <button className="settingSubmit">Update</button>
        </form>
      </div>
      <Sidebar />
    </div>
  );
};

export default Setting;
