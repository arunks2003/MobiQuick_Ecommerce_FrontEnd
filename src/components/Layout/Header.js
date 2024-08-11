// Header.js
import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import "./styles.css"; // For styling
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useAuth } from "../../context/auth";
import toast from "react-hot-toast";
import { useSearch } from "../../context/search";
import axios from "axios";
import useCategory from "../../custom-hooks/useCategory";
import { useCart } from "../../context/cart";
import { Badge } from "antd";

const Header = () => {
  const [auth, setAuth] = useAuth();
  const [values, setValues] = useSearch("");
  const categories = useCategory();
  const [cart] = useCart();
  const [cartItem, setCartItem] = useState(0);

  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    toast.success("Logout Successfull");
  };
  const navigate = useNavigate();
  const handleClick = async (e) => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URI}/api/v1/product//search/${values.keyword}`
      );
      setValues({ ...values, results: data });
      navigate("/search");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <header className="header">
      <div className="header__container">
        <div className="header__logo">
          <Link to="/">MobiQuick</Link>
        </div>
        <nav className="header__nav">
          <ul>
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/about">About</NavLink>
            </li>
            <li>
              <NavLink to="/contact">Contact</NavLink>
            </li>
          </ul>
        </nav>
        <div className="header__search">
          <input
            type="search"
            placeholder="Search for products"
            value={values.keyword}
            onChange={(e) => {
              setValues({ ...values, keyword: e.target.value });
            }}
          />
          <button type="button" onClick={handleClick}>
            Search
          </button>
        </div>
        <div className={"header__user-options" + (auth ? " gap-3" : "")}>
          <div className="dropdown show mr-4">
            <Link
              className="btn btn-warning dropdown-toggle"
              // to={"/categories"}
              role="button"
              id="dropdownMenuLink"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Category
            </Link>
            <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
              <Link
                to={`/categories`}
                className="dropdown-item text-uppercase text-success"
              >
                All categories
              </Link>
              {categories.map((c) => {
                return (
                  <Link
                    to={`/category/${c.slug}`}
                    className="dropdown-item text-uppercase"
                  >
                    {c.name}
                  </Link>
                );
              })}
            </div>
          </div>
          <NavLink
            to="/cart"
            className="header__cart"
            style={{ textDecoration: "none" }}
          >
            <Badge
              count={cart?.length}
              showZero
              style={{ backgroundColor: "white", color: "green" }}
            >
              <ShoppingCartIcon style={{ color: "white" }} />
            </Badge>
          </NavLink>

          {!auth.user ? (
            <>
              <NavLink to="/register" className="header__login">
                Register
              </NavLink>
              <NavLink to="/login" className="header__login">
                Login
              </NavLink>
            </>
          ) : (
            <>
              <div class="dropdown">
                <button
                  class="btn btn-secondary dropdown-toggle"
                  type="button"
                  id="dropdownMenuButton"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  {auth?.user.name}
                </button>
                <div
                  className="dropdown-menu"
                  aria-labelledby="dropdownMenuButton"
                >
                  <Link
                    className="dropdown-item"
                    to={`/dashboard/${
                      auth?.user?.role === 1 ? "admin" : "user"
                    }`}
                  >
                    Dashboard
                  </Link>
                  <a className="dropdown-item" href="#">
                    <NavLink
                      onClick={handleLogout}
                      to="/login"
                      className="text-dark"
                    >
                      Logout
                    </NavLink>
                  </a>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
