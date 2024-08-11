import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import { useCart } from "../../context/cart";
import { useAuth } from "../../context/auth";
import { useNavigate } from "react-router-dom";
import DropIn from "braintree-web-drop-in-react";
import "./styles.css";
import axios from "axios";
import toast from "react-hot-toast";

const CartPage = () => {
  const [cart, setCart] = useCart();
  const [auth] = useAuth();
  const navigate = useNavigate();
  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState("");
  const [loading, setLoading] = useState(false);

  //total price
  const totalPrice = () => {
    try {
      let total = 0;
      cart?.map((item) => {
        total = total + item.price;
      });
      return total.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleRemove = (pid) => {
    try {
      let myCart = [...cart];
      let i = myCart.findIndex((item) => item._id === pid);
      myCart.splice(i, 1);
      setCart(myCart);
      localStorage.setItem("cart", JSON.stringify(myCart));
    } catch (err) {
      console.log(err);
    }
  };

  //get payment gateway token
  const getToken = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URI}/api/v1/product/braintree/token`
      );
      setClientToken(data?.clientToken);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getToken();
  }, [auth?.token]);

  //handle payments
  const handlePayment = async () => {
    try {
      setLoading(true);
      const { nonce } = await instance.requestPaymentMethod();
      const { data } = await axios.post(
        `${process.env.REACT_APP_API_URI}/api/v1/product/braintree/payment`,
        {
          nonce,
          cart,
        }
      );
      setLoading(false);
      localStorage.removeItem("cart");
      setCart([]);
      navigate("/dashboard/user/orders");
      toast.success("Payment Completed Successfully ");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  return (
    <Layout>
      <h3 className="text-center bg-light p-2">
        {`Your Cart ${auth?.token && auth?.user?.name}`}
        <br />
        {cart?.length
          ? `You Have ${cart.length} items in your cart ${
              auth?.token ? "" : "please login to checkout"
            }`
          : " Your Cart Is Empty"}
      </h3>
      <main className="main">
        <div className="basket">
          <div className="basket-module">
            <label htmlFor="promo-code">Enter a promotional code</label>
            <input
              id="promo-code"
              type="text"
              name="promo-code"
              maxLength={5}
              className="promo-code-field"
              style={{ border: "1px solid" }}
            />
            <button className="promo-code-cta">Apply</button>
          </div>
          <div className="basket-labels">
            <ul>
              <li className="item item-heading">Item</li>
              <li className="price">Price</li>
              <li className="quantity">Quantity</li>
              <li className="subtotal">Subtotal</li>
            </ul>
          </div>
          {cart?.map((p, i) => (
            <div className="basket-product" key={i}>
              <div className="item">
                <div className="product-image">
                  <img
                    src={`${process.env.REACT_APP_API_URI}/api/v1/product/product-photo/${p._id}`}
                    alt="Placeholder Image"
                    className="product-frame"
                  />
                </div>
                <div className="product-details">
                  <h1>{p.name}</h1>
                  <p>
                    <strong>{p.category}</strong>
                  </p>
                  <p>{p.description}</p> {/* Corrected typo in 'description' */}
                </div>
              </div>
              <div className="price">{p.price}</div>
              <div className="quantity">
                <input type="number" min={1} className="quantity-field" />
              </div>
              <div className="subtotal">{p.price}</div>
              <div className="remove">
                <button onClick={() => handleRemove(p._id)}>Remove</button>{" "}
              </div>
            </div>
          ))}
        </div>

        <aside>
          <div className="summary">
            <div className="summary-total-items">
              <span className="total-items" /> Items in your Bag
            </div>
            <div className="summary-subtotal">
              <div className="subtotal-title">Subtotal</div>
              <div className="subtotal-value final-value" id="basket-subtotal">
                {totalPrice()}
              </div>
              <div className="summary-promo hide">
                <div className="promo-title">Promotion</div>
                <div className="promo-value final-value" id="basket-promo" />
              </div>
            </div>
            <div className="summary-delivery">
              <select
                name="delivery-collection"
                className="summary-delivery-selection"
              >
                <option value={0} selected="selected">
                  Select Collection or Delivery
                </option>
                <option value="collection">Collection</option>
                <option value="first-class">Royal Mail 1st Class</option>
                <option value="second-class">Royal Mail 2nd Class</option>
                <option value="signed-for">Royal Mail Special Delivery</option>
              </select>
            </div>
            <div className="summary-total">
              <div className="total-title">Total</div>
              <div className="total-value final-value" id="basket-total">
                {totalPrice()}
              </div>
            </div>
            <div className="summary-checkout">
              {auth?.token ? (
                <button className="checkout-cta">Go to Secure Checkout</button>
              ) : (
                <button
                  className="checkout-cta"
                  onClick={() =>
                    navigate("/login", {
                      state: "/cart",
                    })
                  }
                >
                  Login to checkout
                </button>
              )}
            </div>
          </div>
          {auth?.user?.address ? (
            <>
              <div className="mt-3 mb-5">
                <h4 className="fs-6 text-decoration-underline">
                  Current Address:
                </h4>
                <p className="text-1 mb-2">{auth?.user?.address}</p>
                <button
                  className="btn btn-outline-warning"
                  onClick={() => navigate("/dashboard/user/profile")}
                >
                  Update Address
                </button>
              </div>
            </>
          ) : (
            <div className="mb-3">
              {auth?.token ? (
                <button
                  className="btn btn-outline-warning"
                  onClick={() => navigate("/dashboard/user/profile")}
                >
                  Update Address
                </button>
              ) : (
                <div></div>
              )}
            </div>
          )}
          {!clientToken || !cart?.length || !auth?.token ? (
            ""
          ) : (
            <>
              {/* <br /> */}
              <DropIn
                options={{
                  authorization: clientToken,
                  paypal: {
                    flow: "vault",
                  },
                }}
                onInstance={(instance) => setInstance(instance)}
              />

              <button
                className="btn btn-primary"
                onClick={handlePayment}
                disabled={loading || !instance || !auth?.user?.address}
              >
                {loading ? "Processing ...." : "Make Payment"}
              </button>
            </>
          )}
        </aside>
      </main>
    </Layout>
  );
};

export default CartPage;
