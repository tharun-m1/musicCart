import React, { useEffect, useState } from "react";
import styles from "./invoice.module.css";
import logo from "../../assets/logo.svg";
import backButton from "../../assets/backButton.svg";
import useScreenSize from "../../customHooks/useScreenSize";
import { Navigate, useNavigate } from "react-router-dom";
import invoiceDark from "../../assets/invoiceDark.svg";
import invoiceLight from "../../assets/invoiceLight.svg";
import { getInvoices } from "../../api/invoice";
import { ToastContainer, toast } from "react-toastify";
import Loading from "../../components/Loading/Loading";
function Invoice() {
  const screenSize = useScreenSize();
  const [invoices, setInvoices] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showAll, setShowAll] = useState(true);
  const [invoiceIdx, setInvoiceIdx] = useState([]);
  const [imgIdx, setImgIdx] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    getInvoices()
      .then((res) => {
        setInvoices(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        if (err.status >= 500) {
          localStorage.removeItem("mic_jwToken");
          return navigate("/auth");
        } else {
          toast.error("Something went wrong.");
        }
      });
    //   eslint-disable-next-line
  }, []);
  if (!localStorage.getItem("mic_jwToken")) {
    return <Navigate to="/" />;
  }

  const getPaymentMode = () => {
    if (invoices && invoices[invoiceIdx]?.paymentMode === "cod") {
      return "Pay on delivery";
    }
    if (invoices && invoices[invoiceIdx]?.paymentMode === "upi") {
      return "UPI";
    }
    if (invoices && invoices[invoiceIdx]?.paymentMode === "card") {
      return "Card";
    }
  };
  return (
    <>
      {screenSize < 600 ? (
        <div className={styles.logo}>
          <img src={logo} alt="logo" /> Musicart
        </div>
      ) : (
        ""
      )}
      {loading ? <Loading /> : ""}
      {invoices?.length > 0 ? (
        <div className={styles.container}>
          <ToastContainer />
          <div className={styles.invbackBtnCont}>
            {screenSize < 600 ? (
              <img
                onClick={() => navigate("/cart")}
                src={backButton}
                alt="back"
              />
            ) : (
              <button
                onClick={() => {
                  if (showAll) {
                    return navigate("/");
                  } else {
                    return navigate("/cart");
                  }
                }}
              >
                {showAll ? "Back to Home" : "Back to cart"}
              </button>
            )}
          </div>
          <div className={styles.caption}>
            {showAll ? (
              <>
                <img src={invoiceDark} alt="invoice" /> My Invoices
              </>
            ) : (
              <span style={{ textDecoration: "underline" }}>Invoice</span>
            )}
          </div>
          <div style={{ display: "flex", flexDirection: "column-reverse" }}>
            {showAll
              ? invoices?.map((invoice, idx) => {
                  return (
                    <div className={styles.invoiceBanner}>
                      <div className={styles.wrapper}>
                        <div>
                          <img src={invoiceLight} alt="invoice" />
                        </div>
                        <div>
                          {invoice?.name} <br />
                          {invoice?.address}
                        </div>
                        <div className={styles.viewBtnCont}>
                          <div
                            onClick={() => {
                              setShowAll(false);
                              setInvoiceIdx(idx);
                            }}
                            className={styles.viewBtn}
                          >
                            View Invoice
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              : ""}
          </div>
          {!showAll ? (
            <div className={styles.invoiceCont}>
              <div className={styles.left}>
                <div className={styles.address}>
                  <div>1. Delivery Address</div>
                  <div>
                    <div>{invoices && invoices[invoiceIdx]?.name}</div>
                    <div>{invoices && invoices[invoiceIdx]?.address}</div>
                  </div>
                </div>
                <div className={styles.mode}>
                  <div>2. Payment method</div>
                  <div>{getPaymentMode()}</div>
                </div>
                <div className={styles.review}>
                  <div>3. Review items and delivery</div>
                  <div>
                    <div className={styles.images}>
                      {invoices &&
                        invoices[invoiceIdx]?.items.map((item, idx) => {
                          return (
                            <img
                              onClick={() => setImgIdx(idx)}
                              style={{
                                borderWidth: imgIdx === idx ? "3px" : "",
                              }}
                              src={item.image}
                              alt="headphone"
                            />
                          );
                        })}
                    </div>
                    <div className={styles.data}>
                      <div>
                        {invoices &&
                          invoices[invoiceIdx]?.items[imgIdx]?.productName}
                      </div>
                      <div>
                        Colour :{" "}
                        {invoices &&
                          invoices[invoiceIdx]?.items[imgIdx]?.colour}
                      </div>
                      <div>
                        {invoices &&
                          invoices[invoiceIdx]?.items[imgIdx]?.availability}
                      </div>
                      <div>
                        Delivery : <br /> Monday - FREE Standard Delivery
                      </div>
                    </div>
                  </div>
                </div>
                {screenSize < 768 ? (
                  <div className={styles.summary}>
                    <div>Order Summary</div>
                    <div>
                      <div>items : </div>
                      <div>
                        {"\u20b9"}{" "}
                        {invoices && invoices[invoiceIdx]?.totalCost - 45}
                      </div>
                    </div>
                    <div>
                      <div>Convenience fee :</div> <div>{"\u20b9"}45</div>{" "}
                    </div>
                  </div>
                ) : (
                  ""
                )}
                {screenSize < 768 ? (
                  <div className={styles.total}>
                    <div>Order Total : </div>
                    <div>
                      {"\u20b9"}
                      {invoices && invoices[invoiceIdx]?.totalCost}
                    </div>
                  </div>
                ) : (
                  ""
                )}
              </div>
              {screenSize >= 768 ? (
                <div className={styles.right}>
                  <div className={styles.rightWrapper}>
                    <div className={styles.summary}>
                      <div>Order Summary</div>
                      <div>
                        <div>items : </div>
                        <div>
                          {"\u20b9"}{" "}
                          {invoices && invoices[invoiceIdx]?.totalCost - 45}
                        </div>
                      </div>
                      <div>
                        <div>Convenience fee :</div> <div>{"\u20b9"}45</div>{" "}
                      </div>
                    </div>
                    <div className={styles.total}>
                      <div>Order Total : </div>
                      <div>
                        {"\u20b9"}
                        {invoices && invoices[invoiceIdx]?.totalCost}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                ""
              )}
            </div>
          ) : (
            ""
          )}
        </div>
      ) : (
        <div
          style={{
            height: "50vh",

            fontFamily: "Roboto Bold",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <h2>You didn't order anything...</h2>
        </div>
      )}
    </>
  );
}

export default Invoice;
