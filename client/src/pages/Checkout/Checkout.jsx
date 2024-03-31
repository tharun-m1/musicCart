import React, { useEffect, useState } from "react";
import styles from "./checkout.module.css";
import useScreenSize from "../../customHooks/useScreenSize";
import backButton from "../../assets/backButton.svg";
import { Navigate, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import logo from "../../assets/logo.svg";
import { ToastContainer, toast } from "react-toastify";
import Loading from "../../components/Loading/Loading";
import { addInvoice } from "../../api/invoice";
import { deleteCart } from "../../api/cart";
import { updateCart } from "../../redux/cartSlice";

function Checkout() {
  const screenSize = useScreenSize();
  const [cost, setCost] = useState(0);
  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState("");
  const [paymentMode, setpaymentMode] = useState(null);
  const navigate = useNavigate();
  const checkoutItems = useSelector((state) => state.cart.value);
  const dispatch = useDispatch();
  const [imgIdx, setImgIdx] = useState(0);

  const calculate = () => {
    let sum = 0;
    if (checkoutItems?.length === 0) return 0;
    for (let i = 0; i < checkoutItems?.length; i++) {
      sum = sum + checkoutItems[i]?.price * checkoutItems[i]?.quantity;
    }
    return sum;
  };
  const handlePlaceOrder = async () => {
    try {
      if (address.length === 0) {
        return toast.error("Enter valid address");
      }
      if (!paymentMode) {
        return toast.error("Select a payment mode");
      }
      const items = checkoutItems.map((item) => {
        const { productName, colour, availability, image } = item;
        return { productName, colour, availability, image };
      });
      const totalCost = cost + 45;
      const payload = {
        address,
        paymentMode,
        items,
        totalCost,
      };

      setLoading(true);
      await addInvoice(payload);
      const res = await deleteCart();
      dispatch(updateCart(res.data.data));
      setLoading(false);
      return navigate("/success");
    } catch (err) {
      console.log(err);
      if (err.response >= 500) {
        localStorage.removeItem("mic_jwToken");
        return navigate("/auth");
      }
    }
  };
  useEffect(() => {
    setCost(calculate());
    // eslint-disable-next-line
  }, []);
  if (!localStorage.getItem("mic_jwToken")) {
    return <Navigate to="/auth" />;
  }
  return (
    <>
      {loading ? <Loading /> : ""}
      <div className={styles.logo}>
        <img src={logo} alt="logo" /> Musicart
      </div>
      <div className={styles.container}>
        <ToastContainer />
        <div className={styles.backBtnCont}>
          {screenSize <= 600 ? (
            <img
              onClick={() => navigate("/cart")}
              src={backButton}
              alt="back"
            />
          ) : (
            <button onClick={() => navigate("/cart")}>Back to cart</button>
          )}
        </div>
        <div className={styles.caption}>Checkout</div>
        <div className={styles.wrapper}>
          <div className={styles.left}>
            <div className={styles.address}>
              <div>1. Delivery Address</div>
              <div>
                <textarea
                  onChange={(e) => setAddress(e.target.value)}
                  name="address"
                  placeholder="Address"
                  rows={3}
                ></textarea>
              </div>
            </div>
            <div className={styles.mode}>
              <div>2. Payment method</div>
              <div>
                <select
                  onChange={(e) => setpaymentMode(e.target.value)}
                  name="mode"
                >
                  <option disabled selected>
                    Mode of payment
                  </option>
                  <option value="cod">Pay on Delivery</option>
                  <option value="upi">UPI</option>
                  <option value="card">Card</option>
                </select>
              </div>
            </div>
            <div className={styles.review}>
              <div>3. Review items and delivery</div>
              <div className={styles.itemImg}>
                {checkoutItems?.map((item, idx) => {
                  return (
                    <div key={item.image}>
                      {" "}
                      <img
                        style={{
                          borderWidth: idx === imgIdx ? "2px" : "",
                        }}
                        onClick={() => setImgIdx(idx)}
                        src={item.image}
                        alt="headphone"
                      />
                    </div>
                  );
                })}
              </div>
            </div>
            <div className={styles.details}>
              <div>{checkoutItems[imgIdx]?.productName}</div>
              <div>Colour : {checkoutItems[imgIdx]?.colour}</div>
              <div>{checkoutItems[imgIdx]?.availability}</div>
              <div>
                Estimated delivery : <br />
                Monday - FREE Standard Delivery
              </div>
              {screenSize < 768 ? (
                <>
                  <div>Order Summary</div>
                  <div className={styles.items}>
                    <div>Items</div>
                    <div>
                      {"\u20b9"}
                      {cost}
                    </div>
                  </div>
                  <div className={styles.delivery}>
                    <div>Delivery</div>
                    <div>
                      {"\u20b9"}
                      {45}
                    </div>
                  </div>
                  <div className={styles.total}>
                    <div>Order Total: </div>
                    <div>
                      {"\u20b9"}
                      {cost + 45}
                    </div>
                  </div>
                </>
              ) : (
                ""
              )}
              {screenSize < 768 ? (
                <div className={styles.orderBtnCont}>
                  <button onClick={handlePlaceOrder}>Place Order</button>
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
          {screenSize >= 768 ? (
            <div className={styles.right}>
              <div>
                <div className={styles.rightBtnCont}>
                  <button onClick={handlePlaceOrder}>Place your order</button>
                  <div>
                    By placing your order, you agree to Musicart privacy notice
                    and conditions of use.
                  </div>
                </div>
                <div className={styles.summary}>
                  <div>Order Summary</div>
                  <div className={styles.items}>
                    <div>Items</div>
                    <div>
                      {"\u20b9"}
                      {cost}
                    </div>
                  </div>
                  <div className={styles.delivery}>
                    <div>Delivery</div>
                    <div>
                      {"\u20b9"}
                      {45}
                    </div>
                  </div>
                  <div className={styles.total}>
                    <div>Order Total: </div>
                    <div>
                      {"\u20b9"}
                      {cost + 45}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
        {screenSize >= 768 ? (
          <div className={styles.bottomBtnCont}>
            <div>
              <button onClick={handlePlaceOrder}>Place your Order</button>
            </div>
            <div className={styles.rightSection}>
              <div>
                Order Total : {"\u20b9"}
                {3500}
              </div>
              <div>
                By placing your order, you agree to Musicart privacy notice and
                conditions of use.
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
}

export default Checkout;
