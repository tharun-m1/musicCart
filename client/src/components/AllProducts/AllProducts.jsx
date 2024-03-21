import React from "react";
import styles from "./allproducts.module.css";
import person from "../../assets/person.svg";
import search from "../../assets/search.svg";
import useScreenSize from "../../customHooks/useScreenSize";
import gridView from "../../assets/gridView.svg";
import listView from "../../assets/listView.svg";
import FilterChip from "../FilterChip/FilterChip";

function filters() {
  const arr = [
    {
      filter: "Sort by: ",
      options: [
        {
          label: "Featured",
          value: "featured",
        },
        {
          label: "Price: Lowest",
          value: "lo",
        },
        {
          label: "Price: Highest",
          value: "hi",
        },
        {
          label: "Name: A-Z",
          value: "asc",
        },
        {
          label: "Name: Z-A",
          value: "desc",
        },
      ],
    },
    {
      filter: "Headphone Type",
      options: [
        {
          label: "Featured",
          value: "featured",
        },
        {
          label: "In-ear headphone",
          value: "In-ear",
        },
        {
          label: "On-ear headphone",
          value: "On-ear",
        },
        {
          label: "Over-ear headphone",
          value: "Over-ear",
        },
      ],
    },
    {
      filter: "Company",
      options: [
        {
          label: "Featured",
          value: "featured",
        },
        {
          label: "JBL",
          value: "JBL",
        },
        {
          label: "Sony",
          value: "Sony",
        },
        {
          label: "Boat",
          value: "boAt",
        },
        {
          label: "Zebronics",
          value: "Zebronics",
        },
        {
          label: "Oneplus",
          value: "Oneplus",
        },
      ],
    },
    {
      filter: "Colour",
      options: [
        {
          label: "Featured",
          value: "featured",
        },
        {
          label: "Blue",
          value: "Blue",
        },
        {
          label: "Black",
          value: "Black",
        },
        {
          label: "White",
          value: "White",
        },
        {
          label: "Brown",
          value: "Brown",
        },
      ],
    },
    {
      filter: "Price",
      options: [
        {
          label: "Featured",
          value: "Featured",
        },
        {
          label: "\u20B90 - \u20B91,000",
          value: 1000,
        },
        {
          label: "\u20B91,000 - \u20B910,000",
          value: 1000,
        },
        {
          label: "\u20B910,000 - \u20B920,000",
          value: 1000,
        },
      ],
    },
  ];

  return arr;
}
function AllProducts() {
  return <></>;
}

export default AllProducts;
