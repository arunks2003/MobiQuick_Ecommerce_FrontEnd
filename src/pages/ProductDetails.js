import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import "./ProductDetails.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const ProductDetails = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);

  //initalp details
  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params?.slug]);
  //get products
  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URI}/api/v1/product/get-product/${params.slug}`
      );
      setProduct(data?.product);
      getSimilarProduct(data?.product._id, data?.product.category._id);
    } catch (error) {
      console.log(error);
    }
  };

  const getSimilarProduct = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URI}/api/v1/product/related-product/${pid}/${cid}`
      );
      setRelatedProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout>
      <div className="main-wrapper">
        <div className="container">
          <div className="product-div">
            <div className="product-div-left">
              <div
                className="img-container"
                style={{ width: "100px", marginLeft: "100px" }}
              >
                <img
                  src={`${process.env.REACT_APP_API_URI}/api/v1/product/product-photo/${product._id}`}
                  alt="watch"
                />
              </div>
              {/* <div className="hover-container">
                <div>
                  <img src="images/w1.png" />
                </div>
                <div>
                  <img src="images/w2.png" />
                </div>
                <div>
                  <img src="images/w3.png" />
                </div>
                <div>
                  <img src="images/w4.png" />
                </div>
                <div>
                  <img src="images/w5.png" />
                </div>
              </div> */}
            </div>
            <div className="product-div-right">
              <span className="product-name">{product.name}</span>
              <p>Category: {product.category?.name}</p>
              <span className="product-price">$ {product.price}</span>
              <div className="product-rating">
                <span>
                  <FontAwesomeIcon icon={faStar} />
                </span>
                <span>
                  <FontAwesomeIcon icon={faStar} />
                </span>
                <span>
                  <FontAwesomeIcon icon={faStar} />
                </span>
                <span>
                  <FontAwesomeIcon icon={faStar} />
                </span>
                <span>
                  <i className="fas fa-star-half-alt" />
                </span>
                <span>(350 ratings)</span>
              </div>
              <p className="product-description">{product.description}</p>
              <div className="btn-groups">
                <button type="button" className="add-cart-btn">
                  <i className="fas fa-shopping-cart" />
                  add to cart
                </button>
                <button type="button" className="buy-now-btn">
                  <i className="fas fa-wallet" />
                  buy now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row container">
        <h4 className="mb-3 mt-3">Similar Products: </h4>
        {relatedProducts.length < 1 && (
          <p className="text-center">No Similar Products found</p>
        )}
        <div className="d-flex flex-wrap mb-3">
          <div className="d-flex flex-row flex-wrap gap-3">
            {relatedProducts?.map((p) => (
              <div className="card custom-card" style={{ width: "18rem" }}>
                <img
                  className="card-img-top custom-img"
                  src={`${process.env.REACT_APP_API_URI}/api/v1/product/product-photo/${p._id}`}
                  alt="Card image cap"
                />
                <div className="card-body">
                  <h5 className="card-title">{p.name}</h5>
                  <p className="card-text">
                    {p.description.substring(0, 30)}...
                  </p>
                  <p className="card-text">$ {p.price}</p>
                  <button
                    href="#"
                    className="btn btn-secondary ms-1"
                    onClick={() => navigate(`/product/${p.slug}`)}
                  >
                    More Details
                  </button>
                  <button href="#" className="btn btn-success ms-1">
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* {JSON.stringify(product, null, 4)} */}
    </Layout>
  );
};

export default ProductDetails;
