import React from "react";
import styles from "../../../styles/style";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div
      className={` min-h-[70vh] 800px:min-h-[80vh] w-full bg-no-repeat ${styles.noramlFlex}`}
      style={{
        backgroundImage:
          "url(https://i.pinimg.com/736x/a4/68/4b/a4684b5bcbb1fca975cdc84d1268dd7e.jpg)",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        width: "100%",
      }}
    >
      <div className={`${styles.section} w-[90%] 800px:w-[60%]`}>
        <h1
          className={` text-[35px] leading-[1.2] 800px:text-[60px] text-[#3d3a3a] font-[600] capitalize`}
        >
          Best collection for <br /> Home Decoration
        </h1>
        <p className="pt-5 text-[16px] font-[Poppins] font-[400] text-[#000000ba]">
          Scalable and resilient Your eCommerce website is equipped to handle
          <br />
          record traffic,
           high-volume sales, and up to 750 simultaneous
          transactions 
          <br /> per second.
          <br />
          Our powerful, performance-first infrastructure ensures fast page
          <br /> loading to deliver an enhanced online shopping experience
        </p>

        <Link to="/products">
          <div className={`${styles.button} mt-5`}>
            <span className=" text-[#fff] font-[Poppins] text-[18px]">
              Shop Now
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Hero;
