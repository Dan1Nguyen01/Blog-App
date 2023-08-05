import { Link, Navigate, useNavigate } from "react-router-dom";
import "./login.css";
import { useContext, useState } from "react";
import axios from "axios";
import { UserContext } from "../../UserContext";

const Login = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const login = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/user/login", {
        email,
        password,
      });
      setUser(res.data);
      navigate("/");
    } catch (error) {
      setError(error.response.data.error);
    }
  };
  return (
    <div className="login">
      <span className="loginTitle">Login</span>
      <form className="loginForm" onSubmit={login}>
        <label>Email</label>
        <input
          className="registerInput"
          type="text"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label>Password</label>
        <input
          className="registerInput"
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="loginButton">Login</button>
      </form>
      <button className="loginRegisterButton">
        <Link to={"/register"}>Register</Link>
      </button>
      <div>{error && <p>{error}</p>}</div>
    </div>
  );
};

export default Login;
