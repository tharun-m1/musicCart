import React, { useEffect, useState } from "react";
import styles from "./home.module.css";
import MobileNavBar from "../../components/MobileNavBar/MobileNavBar";
import search from "../../assets/search.svg";
import phone from "../../assets/phone.svg";
import logo from "../../assets/logo.svg";
import cart2 from "../../assets/cart2.svg";
import { useDispatch, useSelector } from "react-redux";
import { changeFormStatus } from "../../redux/formStatus";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { changeStatus } from "../../redux/loginSlice";
import useScreenSize from "../../customHooks/useScreenSize";
import { updateCart } from "../../redux/cartSlice";
import Loading from "../../components/Loading/Loading";
import { getUser } from "../../api/user";
import { searchProduct } from "../../redux/search";

function Home() {
  const loginStatus = useSelector((state) => state.loginStatus.value);
  const cartSize = useSelector((state) => {
    let size = 0;
    for (let el of state.cart.value) {
      size += el.quantity;
    }
    return size;
  });
  const location = useLocation();
  // eslint-disable-next-line
  const [userName, setUserName] = useState("");
  const [showMenuItms, setShowMenuItems] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const screenSize = useScreenSize();

  const getName = () => {
    const arr = userName?.split(" ");
    if (arr.length === 1) {
      return arr[0][0]?.toUpperCase();
    }
    if (arr.length > 1) {
      return arr[0][0]?.toUpperCase() + arr[1][0]?.toUpperCase();
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
    // eslint-disable-next-line
  }, []);
  useEffect(() => {
    async function getUserData() {
      try {
        setLoading(true);
        const response = await getUser();
        setUserName(response.data.data.name);
        dispatch(updateCart(response.data.data.cart));
        setLoading(false);
      } catch (err) {
        setLoading(false);
        console.log(err);
        localStorage.removeItem("mic_jwToken");
        return navigate("/auth");
      }
    }
    const jwToken = localStorage.getItem("mic_jwToken");
    if (jwToken) {
      getUserData();
    }
    // eslint-disable-next-line
  }, []);
  return (
    <>
      <div className={styles.container}>
        {loading ? <Loading /> : ""}

        {location.pathname !== "/success" ? (
          <div
            style={{ position: "sticky", top: "0", zIndex: "8" }}
            className={styles.header}
          >
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
            {loginStatus && location.pathname !== "/" ? (
              <div>
                <span
                  onClick={() => {
                    localStorage.removeItem("mic_jwToken");
                    navigate("/auth");
                  }}
                >
                  Logout
                </span>
              </div>
            ) : (
              ""
            )}
          </div>
        ) : (
          ""
        )}
        <div className={styles.upperSection}>
          {window.location.pathname !== "/checkout" &&
          window.location.pathname !== "/success" &&
          location.pathname !== "/invoices" ? (
            <div className={styles.searchContainer}>
              <div className={styles.wrapper}>
                <div className={styles.iconCont}>
                  <img src={search} alt="search" />
                </div>
                <div className={styles.inputCont}>
                  <input
                    onChange={(e) => dispatch(searchProduct(e.target.value))}
                    placeholder="Search Musicart"
                    type="text"
                    name="product"
                  />
                </div>
              </div>
            </div>
          ) : (
            ""
          )}

          <div className={styles.logoSection}>
            <div className={styles.logo}>
              <div>
                <img src={logo} alt="logo" />
              </div>
              <div>Musicart</div>
            </div>
            {location.pathname !== "/success" ? (
              <div onClick={() => navigate("/")}>Home</div>
            ) : (
              ""
            )}
            {loginStatus && location.pathname === "/" ? (
              <div
                onClick={() => navigate("/invoices")}
                className={styles.invoice}
              >
                Invoice
              </div>
            ) : (
              <div className={styles.invoice}>
                {location.pathname !== "/" ? location.pathname : ""}
              </div>
            )}
            {loginStatus && location.pathname !== "/success" ? (
              <div onClick={() => navigate("cart")} className={styles.cartBtn}>
                <img src={cart2} alt="cart" />
                view cart {location.pathname === "/cart" ? "" : cartSize}
              </div>
            ) : (
              ""
            )}
            {loginStatus && location.pathname === "/" ? (
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
                      {userName.toUpperCase()}
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
