import React from "react";
import "./modal.css";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Modal({ setOpenModal, id }) {
  const navigate = useNavigate();
  const deleteProduct = async () => {
    try {
      const { data } = await axios.delete(
        `${process.env.REACT_APP_API_URI}/api/v1/product/delete-product/${id}`
      );
      toast.success("Product DEleted Succfully");
      alert("Successfully delted the product");
      navigate("/dashboard/admin/products");
    } catch (err) {
      console.log(err);
      toast.error("Cannot delete item");
    }
  };
  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="titleCloseBtn">
          <button
            onClick={() => {
              setOpenModal(false);
            }}
          >
            X
          </button>
        </div>
        <div className="title">
          <p>Are You Sure You Want to Delete this product?</p>
        </div>
        <div className="footer" style={{ backgroundColor: "white" }}>
          <button
            onClick={() => {
              setOpenModal(false);
            }}
            id="cancelBtn"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              deleteProduct();
              setOpenModal(false);
            }}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
