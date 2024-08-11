import "./App.css";
import Layout from "./components/Layout/Layout";
import { Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Policy from "./pages/Policy";
import PageNotFound from "./pages/PageNotFound";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import Dashboard from "./pages/user/Dashboard";
import Private from "./components/Routes/Private";
import ForgotPass from "./pages/auth/ForgotPass";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminRoute from "./components/Routes/AdminRoute";
import CreateCategory from "./pages/admin/CreateCategory";
import CreateProduct from "./pages/admin/CreateProduct";
import Users from "./pages/admin/Users";
import Orders from "./pages/user/Orders";
import Profile from "./pages/user/Profile";
import Product from "./pages/admin/Product";
import UpdateProduct from "./pages/admin/UpdateProduct";
import Search from "./pages/Search";
import ProductDetails from "./pages/ProductDetails";
import Categories from "./pages/categories/Categories";
import CategoryProduct from "./pages/categories/CategoryProduct";
import CartPage from "./pages/Cart/CartPage";
import AdminOrders from "./pages/admin/AdminOrders";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage></Homepage>}></Route>
        <Route path="/categories" element={<Categories></Categories>}></Route>
        <Route path="/cart" element={<CartPage></CartPage>}></Route>
        <Route
          path="/category/:slug"
          element={<CategoryProduct></CategoryProduct>}
        ></Route>
        <Route
          path="/product/:slug"
          element={<ProductDetails></ProductDetails>}
        ></Route>
        <Route path="/search" element={<Search></Search>}></Route>
        <Route path="/register" element={<Register></Register>}></Route>
        {/* created a nested route */}
        <Route path="/dashboard" element={<Private />}>
          <Route path="user" element={<Dashboard></Dashboard>}></Route>
          <Route path="user/orders" element={<Orders></Orders>}></Route>
          <Route path="user/profile" element={<Profile></Profile>}></Route>
        </Route>
        {/*  */}
        <Route path="/dashboard" element={<AdminRoute></AdminRoute>}>
          <Route
            path="admin"
            element={<AdminDashboard></AdminDashboard>}
          ></Route>
          <Route
            path="admin/orders"
            element={<AdminOrders></AdminOrders>}
          ></Route>
          <Route
            path="admin/create-category"
            element={<CreateCategory></CreateCategory>}
          ></Route>
          <Route
            path="admin/create-product"
            element={<CreateProduct></CreateProduct>}
          ></Route>
          <Route
            path="admin/product/:slug"
            element={<UpdateProduct></UpdateProduct>}
          ></Route>
          <Route path="admin/products" element={<Product></Product>}></Route>

          <Route path="admin/users" element={<Users></Users>}></Route>
        </Route>
        <Route path="/about" element={<About></About>}></Route>
        <Route
          path="/forgot-password"
          element={<ForgotPass></ForgotPass>}
        ></Route>
        <Route path="/contact" element={<Contact></Contact>}></Route>
        <Route path="/policy" element={<Policy></Policy>}></Route>
        <Route path="/login" element={<Login></Login>}></Route>
        <Route path="*" element={<PageNotFound></PageNotFound>}></Route>
      </Routes>
    </>
  );
}

export default App;
