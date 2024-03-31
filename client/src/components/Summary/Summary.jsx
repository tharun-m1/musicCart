import React, { useState } from "react";
import styles from "./summary.module.css";
import { addToCart } from "../../api/products";
import { getUser } from "../../api/user";
import { useDispatch } from "react-redux";
import { updateCart } from "../../redux/cartSlice";
function Summary({ data }) {
  const [quant, setQuant] = useState(data?.quantity);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const handleQuantityChange = async (e) => {
    try {
      const quantity = e.target.value;
      setLoading(true);
      const productId = data?.productId;
      await addToCart(quantity, productId);
      const res = await getUser();
      dispatch(updateCart(res.data.data.cart));
      setQuant(quantity);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      if (err.status >= 500) {
        localStorage.removeItem("mic_jwToken");
        return window.location.reload();
      }
    }
  };
  return (
    <>
      {/* {loading ? <Loading /> : ""} */}

      <div className={styles.container}>
        <div>
          <img src={data.image} alt="headphone" />
        </div>
        <div>
          <div>{data?.productName}</div>
          <div>Colour: {data?.colour}</div>
          <div>{data?.availability}</div>
        </div>
        <div>
          <strong>Price</strong>
          <div>
            {"\u20b9"}
            {data?.price}
          </div>
        </div>
        <div>
          <div>
            <strong>Quantity</strong>
          </div>
          <div>
            <select
              style={{
                cursor: "pointer",
                border: loading ? "3px solid #FFD800" : "",
              }}
              onChange={handleQuantityChange}
              value={quant}
              name="quant"
            >
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={5}>5</option>
              <option value={6}>6</option>
              <option value={7}>7</option>
              <option value={8}>8</option>
            </select>{" "}
          </div>
        </div>
        <div>
          <div>
            <strong>Total</strong>
          </div>
          <div>
            {"\u20b9"}
            {data?.price * data?.quantity}
          </div>
        </div>
      </div>
    </>
  );
}

export default Summary;
