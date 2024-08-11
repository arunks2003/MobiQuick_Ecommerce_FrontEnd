import React, { useState } from "react";
import "./styles.css";
import toast from "react-hot-toast";

const CategoryForm = ({ handleSubmit, value, setValue }) => {
  return (
    <form className="category-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="name">Category Name</label>
        <input
          type="text"
          id="name"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          required
        />
      </div>
      <button type="submit" className="btn btn-secondary">
        Submit
      </button>
    </form>
  );
};

export default CategoryForm;
