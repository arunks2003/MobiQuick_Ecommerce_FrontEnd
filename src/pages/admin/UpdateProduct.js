import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import axios from "axios";
import toast from "react-hot-toast";
import { Select } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import Modal from "../../components/Modal/Modal.js";
const { Option } = Select;

const UpdateProduct = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const [photo, setPhoto] = useState("");
  const [id, setId] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteApproved, setDeleteApproved] = useState(false);

  //GET  Single product
  const getSingleProduct = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URI}/api/v1/product/get-product/${params.slug}`
      );
      console.log(data);

      setName(data.product.name);
      setId(data.product._id);
      setDescription(data.product.description);
      setPrice(data.product.price);
      setId(data.product._id);
      setPrice(data.product.price);
      setQuantity(data.product.quantity);
      setShipping(data.product.shipping);
      setCategory(data.product.category._id);
    } catch (err) {
      toast.error("Can't fetch product.");
      console.log("Din't fetched single product");
    }
  };
  useEffect(() => {
    getSingleProduct();
  }, []);

  //update product
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      photo && productData.append("photo", photo);
      productData.append("category", category);
      const { data } = await axios.put(
        `${process.env.REACT_APP_API_URI}/api/v1/product/update-product/${id}`,
        productData
      );
      if (data?.success) {
        toast.success("Product Created Successfully");
        navigate("/dashboard/admin/products");
      } else {
        toast.error(data?.message || "Failed to create product");
      }
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong");
    }
  };

  //delete product
  //delete a product
  const handleDelete = async () => {
    try {
      setModalOpen(true);
      // let answer = window.prompt("Are You Sure want to delete this product ? ");
      // if (!deleteApproved) return;
      // else {
      //   const { data } = await axios.delete(
      //     `${process.env.REACT_APP_API_URI}/api/v1/product/delete-product/${id}`
      //   );
      //   toast.success("Product DEleted Succfully");
      //   navigate("/dashboard/admin/products");
      // }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  //get all category
  //read all category
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URI}/api/v1/category/all-categories`
      );
      if (data.success) {
        setCategories(data.category);
        console.log(categories);
      }
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong in fetching categories");
    }
  };
  useEffect(() => {
    getAllCategory();
  }, []);
  return (
    <>
      {modalOpen && <Modal setOpenModal={setModalOpen} id={id} />}
      <Layout title={"Dashboard-Create Product"}>
        <div className="container-fluid m-3 p-3">
          <div className="row">
            <div className="col-md-3">
              <AdminMenu></AdminMenu>
            </div>
            <div className="col-md-9">
              <h1>Update ProduCt</h1>
              <div className="m-1">
                <Select
                  bordered={false}
                  placeholder="Select a category"
                  size="large"
                  showSearch
                  className="form-select mb-3"
                  value={category}
                  onChange={(value) => {
                    setCategory(value);
                  }}
                >
                  {categories?.map((c) => (
                    <Option key={c._id} value={c._id}>
                      {c.name}
                    </Option>
                  ))}
                </Select>
                <div className="mb-3">
                  <label className="btn btn-outline-secondary">
                    {photo ? photo.name : "Upload Photo"}
                    <input
                      type="file"
                      name="photo"
                      accept="images/*"
                      onChange={(e) => {
                        setPhoto(e.target.files[0]);
                      }}
                      hidden
                    />
                  </label>
                </div>
                <div className="mb-3">
                  {photo && (
                    <div
                      className="text-center border border-dark p-1"
                      style={{ width: "fit-content" }}
                    >
                      {photo ? (
                        <img
                          src={URL.createObjectURL(photo)}
                          alt="product_photo"
                          height={"200px"}
                          className="img img-responsive"
                        />
                      ) : (
                        <img
                          src={`${process.env.REACT_APP_API_URI}/api/v1/product/product-photo/${id}`}
                          alt="product_photo"
                          height={"200px"}
                          className="img img-responsive"
                        />
                      )}
                    </div>
                  )}
                </div>
                <div className="mb-3">
                  <label htmlFor="">Name of Product: </label>
                  <input
                    type="text"
                    value={name}
                    placeholder="eg: books"
                    className="form-control"
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="">Description of Product: </label>
                  <textarea
                    type="text"
                    value={description}
                    placeholder="eg: ABC is xyz utility product"
                    className="form-control"
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="">Price: </label>
                  <input
                    type="number"
                    value={price}
                    placeholder="eg: $10"
                    className="form-control"
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="">Quantity: </label>
                  <input
                    type="number"
                    value={quantity}
                    placeholder=""
                    className="form-control"
                    onChange={(e) => setQuantity(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="">Shipping: </label>
                  <Select
                    placeholder="Select Shipping "
                    size="large"
                    showSearch
                    className="form-select mb-3"
                    onChange={(value) => {
                      setShipping(value);
                    }}
                    value={shipping ? "Yes" : "No"}
                  >
                    <Option value="0">No</Option>
                    <Option value="1">Yes</Option>
                  </Select>
                </div>
                <div className="mb-3">
                  <button className="btn btn-dark" onClick={handleUpdate}>
                    UPDATE PRODUCT
                  </button>
                </div>
                <div className="mb-3">
                  <button className="btn btn-danger" onClick={handleDelete}>
                    DELETE PRODUCT
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default UpdateProduct;
