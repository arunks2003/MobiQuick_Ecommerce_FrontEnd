import React, { useState } from "react";
import "../styles/login.css";
import loginImg from "../photos/login_img.avif"; // Replace with the path to your image
import Layout from "../../components/Layout/Layout";
import { useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/auth";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [auth, setAuth] = useAuth();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission logic here
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URI}/api/v1/auth/login`,
        formData
      );
      if (res.data.success) {
        toast.success(res.data.message);
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        localStorage.setItem("auth", JSON.stringify(res.data));
        navigate(location.state || "/");
      } else {
        toast.error(res.data.message);
        console.log("Error");
      }
    } catch (err) {
      toast("There was some error");
      console.log("error in login.js", err);
    }
  };
  return (
    <Layout title={"Login"}>
      <div className="register-container" style={{ marginTop: "105px" }}>
        <div className="register-image">
          <img
            src={loginImg}
            alt="Login"
            style={{ height: "21rem", width: "20rem", marginRight: "2rem" }}
          />
        </div>
        <div className="register-form-container">
          <h2>Login your Account</h2>
          <form className="register-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                required
              />
            </div>

            <div className="form-group">
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                required
              />
            </div>
            <button type="submit" className="submit-button">
              Login
            </button>
            <p>
              <Link to="/forgot-password">Forgot Password?</Link>
            </p>
          </form>
          <div className="login-link">
            <p>
              Not Registered? <Link to="/register">Register</Link>
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
