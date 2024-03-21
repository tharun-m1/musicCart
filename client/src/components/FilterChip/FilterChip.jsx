import React, { useState } from "react";
import styles from "./filterchip.module.css";
import expand from "../../assets/expand.svg";
function FilterChip({ data }) {
  const [option, setOption] = useState(null);
  const [showOptions, setShowOptions] = useState(false);
  return (
    <>
      <div
        onClick={(e) => {
          e.stopPropagation();
          setShowOptions(!showOptions);
        }}
        className={styles.container}
      >
        <div>
          {option || data.filter}
          <img src={expand} />
        </div>
        {showOptions ? (
          <div className={styles.menuList}>
            {data.options.map((option) => {
              return <div> {option.label} </div>;
            })}
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
}

export default FilterChip;
