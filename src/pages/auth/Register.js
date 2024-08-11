import React, { useState } from "react";
import "../styles/register.css";
import registerImage from "../photos/register_img.jpg"; // Replace with the path to your image
import Layout from "../../components/Layout/Layout";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    ans: "",
  });
  const [confirmPassword, setConfirmPassword] = useState();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission logic here
    if (formData.password !== confirmPassword) {
      toast.error("Password and confirm password donot match");
    } else {
      try {
        const res = await axios.post(
          `${process.env.REACT_APP_API_URI}/api/v1/auth/register`,
          formData
        );
        if (res.data.success) {
          toast.success(res.data.message);
          navigate("/login");
        } else {
          toast.error(res.data.message);
          console.log("Error");
        }
      } catch (err) {
        // toast.error(res.data.message/);
        console.log("error in register.js", err);
      }
    }
  };

  return (
    <Layout title={"Register"}>
      <div className="register-container">
        <div
          className="register-image"
          style={{
            // display: "flex",
            width: "23rem",
            height: "23rem",
            marginTop: "7rem",
            marginRight: "4rem",
          }}
        >
          <img src={registerImage} alt="Register" />
        </div>
        <div className="register-form-container">
          <h2>Create an Account</h2>
          <form className="register-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Username"
                required
              />
            </div>
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
                type="number"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Phone Number"
                required
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Address"
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
            <div className="form-group">
              <input
                type="password"
                id="password"
                name="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm Password"
                required
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                id="ans"
                name="ans"
                value={formData.ans}
                onChange={handleChange}
                placeholder="Who is your favourite teacher?(security question)"
                required
              />
            </div>
            <button type="submit" className="submit-button">
              Register
            </button>
          </form>
          <div className="login-link">
            <p>
              Already Registered? <Link to="/login">Login</Link>
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Register;
