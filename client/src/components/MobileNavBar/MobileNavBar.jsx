import React, { useEffect, useState } from "react";
import styles from "./mobilenav.module.css";
import home from "../../assets/home.svg";
import login from "../../assets/login.svg";
import invoices from "../../assets/invoices.svg";
import cart from "../../assets/cart.svg";
import logout from "../../assets/logout.svg";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { changeStatus } from "../../redux/loginSlice";
function MobileNavBar() {
  const [navStatus, setNavStatus] = useState("home");
  const loginStatus = useSelector((state) => state.loginStatus.value);
  const cartSize = useSelector((state) => {
    let size = 0;
    for (let el of state.cart.value) {
      size += el.quantity;
    }
    return size;
  });
  const location = useLocation();
  // console.log(location.pathname);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleAuth = () => {
    if (loginStatus) {
      localStorage.removeItem("mic_jwToken");
      dispatch(changeStatus(false));
      navigate("/");
      return window.location.reload();
    } else {
      return navigate("/auth");
    }
  };
  useEffect(() => {
    if (location.pathname === "/cart" || location.pathname === "/success") {
      setNavStatus("cart");
    } else if (location.pathname === "/") {
      setNavStatus("home");
    } else if (location.pathname === "/invoices") {
      setNavStatus("invoices");
    }
    // eslint-disable-next-line
  }, [location]);
  return (
    <>
      <div className={styles.container}>
        <div
          onClick={() => {
            setNavStatus("home");
            navigate("/");
          }}
          className={`${styles.icon} ${
            navStatus === "home" ? styles.active : ""
          }`}
        >
          <img src={home} alt="home" />
          <div>Home</div>
        </div>
        <div
          onClick={() => {
            setNavStatus("cart");
            navigate("/cart");
          }}
          className={`${styles.icon} ${
            navStatus === "cart" ? styles.active : ""
          }`}
        >
          <img style={{ position: "relative" }} src={cart} alt="cart" />
          <div className={styles.cartSize}>{cartSize}</div>
          <div>Cart</div>
        </div>
        <div
          onClick={() => {
            setNavStatus("invoices");
            navigate("/invoices");
          }}
          className={`${styles.icon} ${
            navStatus === "invoices" ? styles.active : ""
          }`}
        >
          <img src={invoices} alt="invoices" />
          <div>Invoices</div>
        </div>
        <div onClick={handleAuth} className={styles.icon}>
          <img
            src={loginStatus ? logout : login}
            alt={loginStatus ? "logout" : "login"}
          />
          <div>{loginStatus ? "Logout" : "Login"}</div>
        </div>
      </div>
    </>
  );
}

export default MobileNavBar;
