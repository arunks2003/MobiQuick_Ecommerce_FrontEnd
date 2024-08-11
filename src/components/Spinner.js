import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Spinner = ({ path = "login" }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [cnt, setCnt] = useState(3);
  useEffect(() => {
    const interval = setInterval(() => {
      setCnt((prevVal) => --prevVal);
    }, 1000);
    cnt === 0 && navigate(`/${path}`, { state: location.pathname });
    return () => clearInterval(interval);
  }, [cnt, navigate, location, path]);
  return (
    <div
      className="d-flex flex-row justify-content-center align-items-center"
      style={{ height: "100vh" }}
    >
      <h2>Redirecting to you in {cnt} seconds.</h2>
      <div className="spinner-grow text-dark" role="status">
        <span className="sr-only" />
      </div>
    </div>
  );
};

export default Spinner;
