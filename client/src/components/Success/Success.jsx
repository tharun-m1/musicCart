import React from "react";
import styles from "./success.module.css";
import useScreenSize from "../../customHooks/useScreenSize";
import MobileNavBar from "../MobileNavBar/MobileNavBar";
import confetti from "../../assets/confetti.svg";
import { useNavigate } from "react-router-dom";
function Success() {
  const screenSize = useScreenSize();
  const navigate = useNavigate();
  return (
    <>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <div className={styles.imgCont}>
            <img src={confetti} alt="confetti" />
          </div>
          <div>Order placed successfully!</div>
          <div>
            You will be receiving a confirmation email with order details
          </div>
          <button onClick={() => navigate("/")}>Go back to Home page</button>
        </div>
        {screenSize < 600 ? (
          <div className={styles.mobileNav}>
            <MobileNavBar />
          </div>
        ) : (
          <div className={styles.footer}>Musicart | All rights reserved</div>
        )}
      </div>
    </>
  );
}

export default Success;
