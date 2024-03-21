import React, { useEffect, useState } from "react";
import styles from "./home.module.css";
import MobileNavBar from "../../components/MobileNavBar/MobileNavBar";
import search from "../../assets/search.svg";
import phone from "../../assets/phone.svg";
import logo from "../../assets/logo.svg";
import cart2 from "../../assets/cart2.svg";
import { useDispatch, useSelector } from "react-redux";
import { changeFormStatus } from "../../redux/formStatus";
import { Outlet, useNavigate } from "react-router-dom";
import { changeStatus } from "../../redux/loginSlice";
import useScreenSize from "../../customHooks/useScreenSize";
// import Select from "react-select";
function Home() {
  const loginStatus = useSelector((state) => state.loginStatus.value);
  // eslint-disable-next-line
  const [name, setName] = useState("Tharun");
  const [showMenuItms, setShowMenuItems] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const screenSize = useScreenSize();
  const getName = () => {
    const arr = name.split(" ");
    if (arr.length === 1) {
      return arr[0][0].toUpperCase();
    }
    if (arr.length > 1) {
      return arr[0][0].toUpperCase() + arr[1][0].toUpperCase();
    }
  };
  const handleLogout = (e) => {
    e.stopPropagation();
    localStorage.removeItem("mic_jwToken");
    return window.location.reload();
  };
  useEffect(() => {
    const jwToken = localStorage.getItem("mic_jwToken");
    if (!jwToken) {
      dispatch(changeStatus(false));
    } else {
      dispatch(changeStatus(true));
    }
  });
  return (
    <>
      <div className={styles.container}>
        <div style={{ position: "sticky", top: "0" }} className={styles.header}>
          <div>
            <img src={phone} alt="phone number" />
            912121131313
          </div>
          <div className={styles.middle}>
            Get 50% off on selected items &nbsp; | &nbsp; Shop Now
          </div>

          {loginStatus === false ? (
            <div>
              <div>
                <span
                  onClick={() => {
                    dispatch(changeFormStatus("login"));
                    navigate("/auth");
                  }}
                >
                  Login
                </span>
                &nbsp;| &nbsp;
                <span
                  onClick={() => {
                    dispatch(changeFormStatus("signup"));
                    navigate("/auth");
                  }}
                >
                  Signup
                </span>{" "}
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
        <div className={styles.upperSection}>
          <div className={styles.searchContainer}>
            <div className={styles.wrapper}>
              <div className={styles.iconCont}>
                <img src={search} alt="search" />
              </div>
              <div className={styles.inputCont}>
                <input
                  placeholder="Search Musicart"
                  type="text"
                  name="product"
                />
              </div>
            </div>
          </div>

          <div className={styles.logoSection}>
            <div className={styles.logo}>
              <div>
                <img src={logo} alt="logo" />
              </div>
              <div>Musicart</div>
            </div>
            <div onClick={() => navigate("/")}>Home</div>
            {loginStatus ? <div className={styles.invoice}>Invoice</div> : ""}
            {loginStatus ? (
              <div onClick={() => navigate("cart")} className={styles.cartBtn}>
                <img src={cart2} alt="cart" />
                view cart {0}
              </div>
            ) : (
              ""
            )}
            {loginStatus ? (
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  setShowMenuItems(!showMenuItms);
                }}
                className={styles.menu}
              >
                {getName()}
                {showMenuItms ? (
                  <div className={styles.menuItems}>
                    <div onClick={(e) => e.stopPropagation()}>
                      {name.toUpperCase()}
                    </div>
                    <div onClick={(e) => handleLogout(e)}>Logout</div>
                  </div>
                ) : (
                  ""
                )}
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
        <Outlet />
        {screenSize < 600 ? (
          <div className={styles.mobileNav}>
            <MobileNavBar />
          </div>
        ) : (
          ""
        )}
        <div className={styles.footer}>Musicart | All rights reserved</div>
      </div>
    </>
  );
}

export default Home;
