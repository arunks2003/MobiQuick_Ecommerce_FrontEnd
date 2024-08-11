import React from "react";
import Layout from "../components/Layout/Layout";
import { Link } from "react-router-dom";
import "./styles/pnf.css";

const PageNotFound = () => {
  return (
    <Layout title="404-Page Not Found">
      <div className="not-found-container">
        <h1 className="not-found-title">404</h1>
        <p className="not-found-message">Oops!!! Page Not Found</p>
        <Link to="/" className="not-found-link">
          Go Home
        </Link>
      </div>
    </Layout>
  );
};

export default PageNotFound;
