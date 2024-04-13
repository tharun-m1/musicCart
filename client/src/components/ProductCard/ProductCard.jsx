import React, { useState } from "react";
import styles from "./productcard.module.css";
import { useNavigate } from "react-router-dom";
import cartBtn from "../../assets/cartBtn.svg";
import { addToCart } from "../../api/products";
import { useDispatch } from "react-redux";
import { updateCart } from "../../redux/cartSlice";
import { toast } from "react-toastify";
import useScreenSize from "../../customHooks/useScreenSize";
import "react-toastify/dist/ReactToastify.css";
function ProductCard({ data, view }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [adding, setAdding] = useState(false);
  const screenSize = useScreenSize();
  const handleAddToCart = async (e) => {
    e.stopPropagation();
    try {
      const jwToken = localStorage.getItem("mic_jwToken");
      if (!jwToken) {
        // dispatch(changeFormStatus("login"));
        return navigate("/auth");
      }
      setAdding(true);
      const response = await addToCart(null, data._id);
      // toast.success("Item added to cart");
      dispatch(updateCart(response.data.data));
      setAdding(false);
    } catch (err) {
      setAdding(false);
      // console.log("status code", err);
      if (err.status >= 500) {
        //   console.log("500 executed");
        localStorage.removeItem("mic_jwToken");
        navigate("/auth");
      }
      if (err.status === 412) {
        return toast.error(err.message);
      }
      // console.log("token removed");
      localStorage.removeItem("mic_jwToken");
      return navigate("/auth");
    }
  };

  return (
    <>
      <div
        onClick={() => navigate(`${data._id}`)}
        style={{ cursor: "pointer" }}
        className={`${
          view === "grid" ? styles.container : styles.containerList
        }`}
      >
        <div
          className={`${
            view === "grid" ? styles.imageSection : styles.imageSectionList
          }`}
        >
          <div>
            <img src={data?.images[0]} alt="headphone" />{" "}
          </div>
          <div
            className={adding ? styles.box : ""}
            onClick={(e) => handleAddToCart(e)}
          >
            {" "}
            {!adding ? <img src={cartBtn} alt="cart" /> : ""}
          </div>
        </div>
        <div className={`${view === "grid" ? styles.data : styles.dataList}`}>
          <div className={styles.prodName}>{data?.productName}</div>
          <div className={styles.price}>
            Price : {"\u20B9"}
            {data?.price}
          </div>
          <div className={styles.colour}>
            <span>
              {data?.colour} | {data?.type} headphone
            </span>
          </div>
          {screenSize >= 600 && view === "list" ? (
            <div className={styles.overview}>
              {data?.productName} {data?.overview}
            </div>
          ) : (
            ""
          )}
          {screenSize >= 600 && view === "list" ? (
            <div
              onClick={() => navigate(`${data._id}`)}
              className={styles.detailsBtnList}
            >
              Details
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
}

export default ProductCard;
