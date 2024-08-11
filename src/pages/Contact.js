import React, { useState } from "react";
import Layout from "../components/Layout/Layout";
import contactImage from "./photos/contact_img.jpg";
import "./styles/contact.css";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log(formData);
  };
  return (
    <Layout title="Contact-Us">
      <div className="contact-us-container">
        <div className="contact-image">
          <img src={contactImage} alt="Contact Us" />
        </div>
        <div className="contact-content">
          <h2>Contact Us</h2>
          <p>
            We would love to hear from you! Whether you have a question about
            our products, services, pricing, or anything else, our team is ready
            to answer all your questions.
          </p>
          <form className="contact-form">
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={(e) => {
                  handleChange(e);
                }}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={(e) => {
                  handleChange(e);
                }}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={(e) => {
                  handleChange(e);
                }}
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="submit-button"
              onClick={handleSubmit}
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
