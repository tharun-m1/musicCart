import React from "react";
import styles from "./summarymobile.module.css";
function SummaryMobile({ data }) {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.left}>
          <img src={data.image} alt="headphone" />
        </div>
        <div className={styles.right}>
          <div>{data?.productName}</div>
          <div>
            {"\u20b9"} {data?.price}
          </div>
          <div>
            <strong>Colour</strong>: {data?.colour}{" "}
          </div>
          <div>{data?.availability} </div>
          <div>Convenience Fee: &nbsp; {"\u20b9"}45 </div>
          <div>
            <div>Total:</div>{" "}
            <div>
              {"\u20b9"}
              {data?.price + 45}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SummaryMobile;
