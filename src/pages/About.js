import React from "react";
import Layout from "../components/Layout/Layout";
import aboutImage from "./photos/about_img.jpg";
import "./styles/about.css";

const About = () => {
  return (
    <Layout title="About-us Ecommerce">
      <div className="about-container">
        <div className="about-image">
          <img src={aboutImage} alt="About Us" />
        </div>
        <div className="about-content">
          <h2>About Us</h2>
          <p>
            Welcome to our eCommerce site! We are dedicated to providing you
            with the best products and services. Our mission is to offer
            high-quality items at competitive prices while ensuring excellent
            customer service.
          </p>
          <p>
            Our team is passionate about what we do, and we are always striving
            to improve our offerings. Thank you for choosing us for your
            shopping needs. We look forward to serving you!
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default About;
