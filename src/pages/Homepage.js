import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import { useAuth } from "../context/auth";
import "./styles/homepage.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { Checkbox, Radio } from "antd";
import { Prices } from "../components/Prices";
import { useCart } from "../context/cart";
import toast from "react-hot-toast";

const Homepage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [check, setCheck] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [cart, setCart] = useCart();

  //get prodcut
  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URI}/api/v1/product/product-list/${page}`
      );
      setLoading(false);
      setProducts(data.products);
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };
  //get all categories
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URI}/api/v1/category/all-categories`
      );
      if (data.success) {
        setCategories(data.category);
        // console.log(data);
        // console.log(data.category);
        console.log(categories);
      }
    } catch (err) {
      console.log(err);
      // toast.error("Something went wrong in fetching categories");
    }
  };
  //handle the filters
  const handleFilter = (value, id) => {
    let all = [...check];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setCheck(all);
  };
  useEffect(() => {
    getAllCategory();
    getTotal();
  }, []);

  //getTotal Count
  const getTotal = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URI}/api/v1/product/product-count`
      );
      setTotal(data.total);
    } catch (error) {
      console.log(error);
    }
  };

  //load more
  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);
  //load more
  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URI}/api/v1/product/product-list/${page}`
      );
      setLoading(false);
      setProducts([...products, ...data?.products]);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  //filter products
  const filterProduct = async () => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API_URI}/api/v1/product/product-filters`,
        { check, radio }
      );
      setProducts(data.products);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (!check.length || !radio.length) {
      getAllProducts();
    }
  }, []);

  useEffect(() => {
    if (check.length || radio.length) {
      filterProduct();
    }
  }, [check, radio]);

  return (
    <Layout title="Shop Now-Best Offers">
      <div className="row mt-3 mb-3">
        <div className="col-md-2 ml-4">
          <h4 className="">Filter by category</h4>
          <div className="d-flex flex-column">
            {categories?.map((c) => (
              <Checkbox
                key={c._id}
                onChange={(e) => handleFilter(e.target.checked, c._id)}
              >
                {c.name}
              </Checkbox>
            ))}
          </div>
          <h4 className=" mt-4">Filter by Price</h4>
          <div className="d-flex flex-column">
            <Radio.Group onChange={(e) => setRadio(e.target.value)}>
              {Prices?.map((p) => (
                <div key={p._id}>
                  <Radio value={p.array}>{p.name}</Radio>
                </div>
              ))}
            </Radio.Group>
          </div>
          <div className="d-flex flex-column">
            <button
              className="btn btn-danger mt-3"
              style={{
                height: "1.5rem",
                width: "3rem",
                fontSize: "13px",
                padding: "0",
              }}
              onClick={() => window.location.reload()}
            >
              Clear
            </button>
          </div>
        </div>
        <div className="col-md-9">
          {/* {JSON.stringify(radio, null, 4)}
          {JSON.stringify(check, null, 4)} */}
          <h1 className="text-center">All Products</h1>
          <div className="d-flex flex-row flex-wrap gap-3">
            <div className="d-flex flex-row flex-wrap gap-3">
              {products?.map((product, index) => {
                return (
                  <div className="card custom-card" style={{ width: "18rem" }}>
                    <img
                      className="card-img-top custom-img"
                      src={`${process.env.REACT_APP_API_URI}/api/v1/product/product-photo/${product._id}`}
                      alt="Card image cap"
                    />
                    <div className="card-body">
                      <h5 className="card-title">{product.name}</h5>
                      <p className="card-text">
                        {product.description.substring(0, 30)}...
                      </p>
                      <p className="card-text">$ {product.price}</p>
                      <Link
                        to={`/product/${product.slug}`}
                        style={{ textDecoration: "none" }}
                      >
                        <button href="#" className="btn btn-secondary ms-1">
                          More Details
                        </button>
                      </Link>

                      <button
                        className="btn btn-success ms-1"
                        onClick={() => {
                          setCart([...cart, product]);
                          localStorage.setItem(
                            "cart",
                            JSON.stringify([...cart, product])
                          );
                          toast.success("Item Added to Cart");
                        }}
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="m-2 p-3">
            {products && products.length < total && (
              <button
                className="btn btn-warning"
                onClick={() => setPage(page + 1)}
              >
                {loading ? "Loading..." : "Load More"}
              </button>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Homepage;
