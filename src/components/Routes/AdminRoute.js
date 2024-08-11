import React from "react";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/auth";
import { Outlet } from "react-router-dom";
import axios from "axios";
import Spinner from "../Spinner.js";

const AdminRoute = () => {
  const [ok, setOk] = useState(false);
  const [auth, setAuth] = useAuth();

  useEffect(() => {
    const authCheck = async () => {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URI}/api/v1/auth/admin-auth`
      );
      if (res.data.ok) {
        setOk(true);
      } else {
        setOk(false);
      }
    };
    if (auth?.token) authCheck();
  }, [auth?.token]);
  return ok ? <Outlet /> : <Spinner path="" />;

  //   <Outlet/> for nested routes functional
};

export default AdminRoute;

//lec 13 Private Routes Location History and Redirect Eco
//link: https://www.youtube.com/watch?v=E9A9rnBBsps&list=PLuHGmgpyHfRzhGkSUfY0vpi67X64g0mXB&index=13
