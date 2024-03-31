import React, { useEffect, useState } from "react";
import styles from "./allproducts.module.css";
import person from "../../assets/person.svg";
import search from "../../assets/search.svg";
import gridView from "../../assets/gridView.svg";
import listView from "../../assets/listView.svg";
import { getProducts, searchProducts } from "../../api/products";
import Loading from "../Loading/Loading";
import { ToastContainer, toast } from "react-toastify";
import useScreenSize from "../../customHooks/useScreenSize";
import ProductCard from "../ProductCard/ProductCard";
import listViewDark from "../../assets/listViewDark.svg";
import gridViewDark from "../../assets/gridViewDark.svg";

import Feedback from "../Feedback/Feedback";
import { useSelector } from "react-redux";

function AllProducts() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({});
  const searchProduct = useSelector((state) => state.search.value);
  const [name, setName] = useState("");
  const [view, setView] = useState("grid");

  const screenSize = useScreenSize();
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (value === "featured") {
      const { [name]: value, ...rest } = filters;
      const newFilters = { ...rest };
      return setFilters(newFilters);
    }
    setFilters({ ...filters, [name]: value });
    console.log(e.target.value);
  };
  const handleFeedbackSuccess = (message) => {
    return toast.success(message);
  };
  const handleFeedbackError = (message) => {
    return toast.error(message);
  };

  useEffect(() => {
    setLoading(true);

    getProducts(filters)
      .then((res) => {
        setData(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [filters]);
  useEffect(() => {
    if (screenSize < 600) {
      searchProducts(searchProduct)
        .then((res) => {
          setData(res.data.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      searchProducts(name)
        .then((res) => {
          setData(res.data.data);
        })
        .catch((err) => {
          // toast.error("Something went wrong try again.. ");
        });
    }
    // eslint-disable-next-line
  }, [name, searchProduct]);
  return (
    <>
      <div className={styles.container}>
        {loading ? <Loading /> : ""}
        <ToastContainer />
        <div className={styles.bannerCont}>
          <div className={styles.banner}>
            <div className={styles.left}>
              <div>
                Grab upto 50% off on <br /> Selected headphones
              </div>
              <div>Buy now</div>
            </div>
            <div className={styles.right}>
              <img src={person} alt="person" />
            </div>
          </div>
        </div>
        <div className={styles.searchCont}>
          <div>
            <img src={search} alt="search" />
          </div>
          <div>
            <input
              onChange={(e) => setName(e.target.value)}
              placeholder="Search by Product Name"
              type="text"
              name="search"
            />
          </div>
        </div>
        <div className={styles.filtersCont}>
          <div className={styles.views}>
            <div>
              <img
                onClick={() => setView("grid")}
                src={view === "grid" ? gridViewDark : gridView}
                alt="grid-view"
                style={{ cursor: "pointer" }}
              />
            </div>
            <div>
              <img
                onClick={() => setView("list")}
                src={view === "list" ? listViewDark : listView}
                alt="list-view"
                style={{ cursor: "pointer" }}
              />
            </div>
          </div>
          <div className={styles.filters}>
            <select
              onChange={(e) => handleChange(e)}
              className={styles.sortby}
              name="sortby"
            >
              <option disabled selected>
                Sort by :{" "}
              </option>
              <option value="featured">Featured</option>
              <option value="lo">Price : Lowest</option>
              <option value="hi">Price : Highest</option>
              <option value="az">Name : (A-Z)</option>
              <option value="za">Name : (Z-A)</option>
            </select>
            <select onChange={(e) => handleChange(e)} name="type">
              <option disabled selected>
                Headphone Type
              </option>
              <option value="featured">Featured</option>
              <option value="In-ear">In-ear headphone</option>
              <option value="On-ear">On-ear headphone</option>
              <option value="Over-ear">Over-ear</option>
            </select>
            <select onChange={(e) => handleChange(e)} name="company">
              <option disabled selected value="featured">
                Company
              </option>
              <option value="featured">Featured</option>
              <option value="Oneplus">Oneplus</option>
              <option value="boAt">boAt</option>
              <option value="Sony">Sony</option>
              <option value="JBL">JBL</option>
              <option value="Apple">Apple</option>
              <option value="realme">realme</option>
            </select>
            <select onChange={(e) => handleChange(e)} name="colour">
              <option disabled selected>
                Colour
              </option>
              <option value="featured">Featured</option>
              <option value="Blue">Blue</option>
              <option value="Black">Black</option>
              <option value="White">White</option>
              <option value="Brown">Brown</option>
            </select>
            <select onChange={(e) => handleChange(e)} name="price">
              <option disabled selected>
                Price
              </option>
              <option value="featured">Featured</option>
              <option value="0-1000">
                {"\u20B9"}0 - {"\u20B9"}1,000
              </option>
              <option value="1000-10000">
                {"\u20B9"}1,000 - {"\u20B9"}10,000
              </option>
              <option value="10000-20000">
                {"\u20B9"}10,000 - {"\u20B9"}20,000
              </option>
            </select>
          </div>
        </div>
        <div className={styles.productsCont}>
          {data &&
            data?.map((product) => {
              return (
                <ProductCard
                  view={screenSize < 600 ? "grid" : view}
                  data={product}
                />
              );
            })}
        </div>
        <Feedback
          handleFeedbackSuccess={handleFeedbackSuccess}
          handleFeedbackError={handleFeedbackError}
          // deleteToast={deleteToast}
        />
      </div>
    </>
  );
}

export default AllProducts;
