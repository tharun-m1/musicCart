import React, { useEffect, useState } from "react";
import styles from "./cart.module.css";
import useScreenSize from "../../customHooks/useScreenSize";
import backButton from "../../assets/backButton.svg";
import { Navigate, useNavigate } from "react-router-dom";
import SummaryMobile from "../../components/SummaryMobile/SummaryMobile";
import { useDispatch, useSelector } from "react-redux";
import { changeFormStatus } from "../../redux/formStatus";
import Summary from "../../components/Summary/Summary";
import bag from "../../assets/bag.svg";
function Cart() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const screenSize = useScreenSize();
  const [cost, setCost] = useState(0);
  const cartItems = useSelector((state) => state.cart.value);
  const totalAmount = () => {
    let sum = 0;
    if (cartItems.length === 0) return 0;
    for (let i = 0; i < cartItems.length; i++) {
      sum = sum + cartItems[i].price * cartItems[i].quantity;
    }
    return sum;
  };
  useEffect(() => {
    setCost(totalAmount() + 45);
    // eslint-disable-next-line
  }, [cartItems]);
  if (!localStorage.getItem("mic_jwToken")) {
    dispatch(changeFormStatus("login"));
    return <Navigate to="/auth" />;
  }
  const handlePlaceOrder = () => {
    return navigate("/checkout");
  };
  return (
    <>
      {cartItems?.length > 0 ? (
        <div className={styles.container}>
          <div className={styles.backBtnCont}>
            {screenSize <= 600 ? (
              <img onClick={() => navigate("/")} src={backButton} alt="back" />
            ) : (
              <button onClick={() => navigate("/")}>Back to products</button>
            )}
          </div>
          {screenSize > 600 ? (
            <div className={styles.caption}>
              <div className={styles.imgCont}>
                {" "}
                <img src={bag} alt="bag" />{" "}
              </div>
              <div>My Cart</div>
            </div>
          ) : (
            ""
          )}
          {screenSize <= 600
            ? cartItems?.map((item) => {
                return (
                  <div className={styles.mobileSummary}>
                    {" "}
                    <SummaryMobile key={item._id} data={item} />{" "}
                  </div>
                );
              })
            : ""}
          {screenSize > 600 ? (
            <div className={styles.summary}>
              <div>
                {cartItems.map((item) => {
                  return <Summary key={item._id} data={item} />;
                })}
              </div>

              <div className={styles.cartOverview}>
                <div>
                  <strong>PRICE DETAILS</strong>{" "}
                </div>
                <div>
                  <div>TOTAL MRP</div>
                  <div>
                    {"\u20b9"}
                    {cost}
                  </div>
                </div>
                <div>
                  <div>Discount on MRP</div>
                  <div>{"\u20b9"}0</div>
                </div>
                <div>
                  <div>Convenience fee</div>
                  <div>{"\u20b9"}45</div>
                </div>
                <div className={styles.total}>
                  <div>
                    <strong>Total Amount</strong>
                  </div>
                  <div>
                    {"\u20b9"}
                    {cost}
                  </div>
                </div>
                <div className={styles.orderBtnCont}>
                  <button onClick={handlePlaceOrder}>Place Order</button>
                </div>
              </div>
            </div>
          ) : (
            ""
          )}
          {screenSize < 600 ? (
            <div style={{ border: "1px solid black", marginTop: "20px" }}></div>
          ) : (
            ""
          )}
          {screenSize < 600 ? (
            <div
              style={{
                marginTop: "20px",
                fontFamily: "Roboto Medium",
                letterSpacing: "0.5px",
              }}
            >
              Total Amount{" "}
              <strong>
                {" "}
                {"\u20b9"}
                {cost}
              </strong>
            </div>
          ) : (
            ""
          )}
          {screenSize > 600 ? (
            <div className={styles.count}>
              <div>{cartItems.length} Item</div>
              <div>
                {"\u20b9"}
                {cost}
              </div>
            </div>
          ) : (
            ""
          )}
          {screenSize < 600 ? (
            <div className={styles.orderBtnCont}>
              <button onClick={handlePlaceOrder}>Place Order</button>
            </div>
          ) : (
            ""
          )}
        </div>
      ) : (
        <div
          style={{
            height: "50vh",
            fontFamily: "Roboto Bold",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <h2>No Items in Cart</h2>
        </div>
      )}
    </>
  );
}

export default Cart;
