import Layout from "../components/Layout/Layout";
import React from "react";
import { useSearch } from "../context/search";
import { Link } from "react-router-dom";

const Search = () => {
  const [values, setValues] = useSearch();
  return (
    <Layout title={"Search results"}>
      <div className="container">
        <div className="text-center">
          <h1>Search Results</h1>
          <h6>
            {values?.results.length < 1
              ? "No results found"
              : "Showing results for " + values?.results.length}
          </h6>
          <div className="d-flex flex-row flex-wrap gap-3 mt-4">
            {values?.results.map((product, index) => {
              return (
                <Link
                  to={`/product/${product.slug}`}
                  style={{ textDecoration: "none" }}
                >
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
                      <button href="#" className="btn btn-secondary ms-1">
                        More Details
                      </button>
                      <button href="#" className="btn btn-success ms-1">
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Search;
