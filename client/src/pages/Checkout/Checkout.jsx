import React from "react";
import styles from "./checkout.module.css";
import useScreenSize from "../../customHooks/useScreenSize";
import backButton from "../../assets/backButton.svg";
import { useNavigate } from "react-router-dom";
function Checkout() {
  const screenSize = useScreenSize();
  const navigate = useNavigate();
  return (
    <>
      <div className={styles.container}>
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
        <div className={styles.left}></div>
      </div>
    </>
  );
}

export default Checkout;
