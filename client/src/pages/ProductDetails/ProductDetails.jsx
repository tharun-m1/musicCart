import React, { useEffect, useState } from "react";
import styles from "./productdetails.module.css";
import backButton from "../../assets/backButton.svg";
import useScreenSize from "../../customHooks/useScreenSize";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { changeFormStatus } from "../../redux/formStatus";
import { getProduct } from "../../api/products";
import { ToastContainer, toast } from "react-toastify";
import Carousel from "../../components/Carousel/Carousel";
import Loading from "../../components/Loading/Loading";
import star from "../../assets/star.svg";

function ProductDetails() {
  const [productData, setProductData] = useState([]);
  const [stars, setStars] = useState([]);
  const [loading, setLoading] = useState(false);
  const screenSize = useScreenSize();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleBuyNow = () => {
    const jwToken = localStorage.getItem("mic_jwToken");
    if (!jwToken) {
      dispatch(changeFormStatus("login"));
      navigate("/auth");
    }
  };
  const { productId } = useParams();
  const handleStars = (rating) => {
    let ans;
    let floorVal = Math.floor(rating);
    let ceilVal = Math.ceil(rating);
    if (rating - floorVal <= ceilVal - rating) {
      ans = floorVal;
    } else {
      ans = ceilVal;
    }
    const arr = [];
    while (ans--) {
      arr.push(ans);
    }
    return arr;
  };
  useEffect(() => {
    async function getData() {
      try {
        setLoading(true);
        // console.log(productId);
        const response = await getProduct(productId);
        setProductData(response.data.data);
        setLoading(false);
        if (response.data.data.rating) {
          const st = handleStars(response.data.data.rating);
          console.log(st);
          setStars(st);
        }
      } catch (err) {
        setLoading(false);
        return toast.error(err.message);
      }
    }
    getData();

    // eslint-disable-next-line
  }, []);
  return (
    <>
      <div className={styles.container}>
        <ToastContainer />
        {loading ? <Loading /> : ""}
        <div className={styles.backBtnCont}>
          {screenSize < 600 ? (
            <img src={backButton} alt="back" />
          ) : (
            <button onClick={() => navigate("/")}>Back to products</button>
          )}
        </div>
        {screenSize < 600 ? (
          <div className={styles.buyBtn}>
            <button onClick={handleBuyNow}>Buy Now</button>
          </div>
        ) : (
          ""
        )}
        {screenSize > 600 ? (
          <div className={styles.productHeader}>
            {productData?.productName}
            {productData?.overview}
          </div>
        ) : (
          ""
        )}
        <div className={styles.details}>
          <div className={styles.left}>
            <div
              style={{
                marginTop: "30px",
              }}
              className={styles.carousel}
            >
              <Carousel images={productData.images} />
            </div>
          </div>
          <div className={styles.right}>
            <div className={styles.productName}>{productData?.productName}</div>
            <div className={styles.rating}>
              {stars?.map((_, idx) => {
                return (
                  <img
                    className={styles.star}
                    key={idx}
                    src={star}
                    alt="star"
                  />
                );
              })}{" "}
              &nbsp; ({productData?.reviews} reviews)
            </div>
            <div className={styles.overview}>{productData?.overview}</div>
            <div className={styles.price}>
              <strong>Price</strong> - {"\u20B9"}
              {productData.price}
            </div>
            <div className={styles.colNtyp}>
              {productData?.colour} | {productData?.type} headphone{" "}
            </div>
            <div className={styles.about}>
              <div>About this item</div>
              <div>
                <ul>
                  {productData?.aboutProduct?.map((point) => {
                    return <li>{point}</li>;
                  })}
                </ul>
              </div>
            </div>
            <div className={styles.available}>
              <strong>Available</strong> - {productData?.availability}
            </div>
            <div className={styles.brand}>
              <strong>Brand</strong> - {productData?.brand}
            </div>
            <div className={styles.buyBtn}>
              {" "}
              <button>Add to cart</button>{" "}
            </div>
            <div className={styles.buyBtn}>
              <button onClick={handleBuyNow}>Buy Now</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductDetails;
