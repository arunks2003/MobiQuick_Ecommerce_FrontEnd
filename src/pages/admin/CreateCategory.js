import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import toast from "react-hot-toast";
import axios from "axios";
import CategoryForm from "../../components/Form/CategoryForm";
import { Modal } from "antd";

const CreateCategory = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [updatedName, setUpdatedName] = useState("");

  //create a category
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API_URI}/api/v1/category/create-category`,
        { name }
      );
      if (data?.success) {
        toast.success(`${data.category.name} category is created`);
        getAllCategory();
      } else toast.error(data.message);
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong in input form.");
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
        // console.log(data.category);
      }
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong in fetching categories");
    }
  };

  //update category
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      // console.log(e);
      const { data } = await axios.put(
        `${process.env.REACT_APP_API_URI}/api/v1/category/update-category/${selected._id}`,
        { name: updatedName }
      );
      if (data.success) {
        toast.success(data.message);
        setSelected(null);
        setUpdatedName("");
        setVisible(false);
        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      console.log(err);
      toast.error("Something got wrong");
    }
  };

  //delete category
  const handleDelete = async (pid) => {
    try {
      // console.log(e);
      const { data } = await axios.delete(
        `${process.env.REACT_APP_API_URI}/api/v1/category/delete-category/${pid}`
      );
      if (data?.success) {
        toast.success(`Category is deleted`);
        getAllCategory();
      } else {
        toast.error(data?.message);
      }
    } catch (err) {
      console.log(err);
      toast.error("Something got wrong");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);
  return (
    <Layout title={"Dashboard-Create Category"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu></AdminMenu>
          </div>
          <div className="col-md-9">
            <h1>Manage Category</h1>
            <div className="w-75">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {categories?.map((c) => (
                    <>
                      <tr>
                        <td key={c._id}>{c.name}</td>
                        <td>
                          <button
                            className="btn btn-dark ms-2"
                            onClick={() => {
                              setVisible(true);
                              setUpdatedName(c.name);
                              setSelected(c);
                            }}
                          >
                            Edit
                          </button>
                          <button
                            className="btn btn-danger ms-2"
                            onClick={() => {
                              handleDelete(c._id);
                            }}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    </>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="p-3 w-50">
              <CategoryForm
                handleSubmit={handleSubmit}
                value={name}
                setValue={setName}
              />
            </div>
            <Modal
              onCancel={() => setVisible(false)}
              footer={null}
              visible={visible}
            >
              <CategoryForm
                value={updatedName}
                setValue={setUpdatedName}
                handleSubmit={handleUpdate}
              ></CategoryForm>
            </Modal>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateCategory;
