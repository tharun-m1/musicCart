import React, { useState } from "react";
import styles from "./carousel.module.css";
import prevImg from "../../assets/prevImg.svg";
import nextImg from "../../assets/nextImg.svg";
import useScreenSize from "../../customHooks/useScreenSize";
function Carousel({ images }) {
  const [imgIdx, setImgIdx] = useState(0);
  const screenSize = useScreenSize();
  const handlePrev = () => {
    setImgIdx((imgIdx) => {
      if (imgIdx === 0) {
        return images.length - 1;
      } else {
        return imgIdx - 1;
      }
    });
  };
  const handleNext = () => {
    setImgIdx((imgIdx) => {
      if (imgIdx === images.length - 1) {
        return 0;
      }
      return imgIdx + 1;
    });
  };
  return (
    <>
      <div className={styles.container}>
        <div className={styles.imgCont}>
          {images?.map((image, index) => {
            return <img key={image} src={images[imgIdx]} alt="headphone" />;
          })}
        </div>
        {screenSize < 600 ? (
          <div className={styles.btns}>
            <div>
              <img onClick={handlePrev} src={prevImg} alt="go back" />
            </div>

            {images?.map((_, index) => {
              return (
                <div
                  onClick={() => setImgIdx(index)}
                  style={{ backgroundColor: imgIdx === index ? "black" : "" }}
                  className={styles.circle}
                ></div>
              );
            })}
            <div>
              <img onClick={handleNext} src={nextImg} alt="next " />
            </div>
          </div>
        ) : (
          ""
        )}
        {screenSize > 600 ? (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "20px",
            }}
          >
            {images?.map((url, index) => {
              if (index === imgIdx) return null;
              return (
                <div
                  className={styles.previewImage}
                  onClick={() => setImgIdx(index)}
                >
                  {" "}
                  <img
                    style={{
                      objectFit: "contain",
                      width: "100%",
                      height: "100%",
                    }}
                    key={url}
                    src={url}
                    alt="headphone"
                  />{" "}
                </div>
              );
            })}
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
}

export default Carousel;
