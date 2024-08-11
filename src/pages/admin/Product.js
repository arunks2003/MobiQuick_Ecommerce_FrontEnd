import React, { useState, useEffect } from "react";
import AdminMenu from "../../components/Layout/AdminMenu.js";
import Layout from "../../components/Layout/Layout.js";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import "./styles/product.css";

const Product = () => {
  const [products, setProducts] = useState([]);
  //get all producst
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URI}/api/v1/product/get-product`
      );
      setProducts(data.products);
    } catch (err) {
      console.log(err);
      toast.err("Cannot fetch Products");
    }
  };
  useEffect(() => {
    getAllProducts();
  }, []);
  return (
    <Layout>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu></AdminMenu>
          </div>
          <div className="col-md-9">
            <h1>All Product List</h1>
            <div className="d-flex flex-row flex-wrap gap-3">
              {products.map((product, index) => {
                return (
                  <Link
                    key={product._id}
                    to={`/dashboard/admin/product/${product.slug}`}
                    style={{ textDecoration: "none" }}
                  >
                    <div
                      className="card custom-card"
                      style={{ width: "18rem" }}
                    >
                      <img
                        className="card-img-top custom-img"
                        src={`${process.env.REACT_APP_API_URI}/api/v1/product/product-photo/${product._id}`}
                        alt="Card image cap"
                      />
                      <div className="card-body">
                        <h5 className="card-title">{product.name}</h5>
                        <p className="card-text">{product.description}</p>
                        <a href="#" className="btn btn-secondary">
                          Go somewhere
                        </a>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Product;
