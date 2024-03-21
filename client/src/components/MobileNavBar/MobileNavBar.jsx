import React, { useEffect, useState } from "react";
import styles from "./mobilenav.module.css";
import home from "../../assets/home.svg";
import login from "../../assets/login.svg";
import cart from "../../assets/cart.svg";
import logout from "../../assets/logout.svg";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { changeStatus } from "../../redux/loginSlice";
function MobileNavBar() {
  const [navStatus, setNavStatus] = useState("home");
  const loginStatus = useSelector((state) => state.loginStatus.value);
  const location = useLocation();
  console.log(location.pathname);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleAuth = () => {
    if (loginStatus) {
      localStorage.removeItem("mic_jwToken");
      dispatch(changeStatus(false));
      return navigate("/");
    } else {
      return navigate("/auth");
    }
  };
  useEffect(() => {
    if (location.pathname === "/cart") {
      setNavStatus("cart");
    } else {
      setNavStatus("home");
    }
    // eslint-disable-next-line
  }, []);
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
            navigate("cart");
          }}
          className={`${styles.icon} ${
            navStatus === "cart" ? styles.active : ""
          }`}
        >
          <img style={{ position: "relative" }} src={cart} alt="cart" />
          <div className={styles.cartSize}>0</div>
          <div>Cart</div>
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
