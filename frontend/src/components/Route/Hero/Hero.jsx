import React from "react";
import styles from "../../../styles/style";
import { Link } from "react-router-dom";
import {Carousel} from "react-responsive-carousel"
import "react-responsive-carousel/lib/styles/carousel.min.css";

const Hero = () => {
  return (
  <>
  <div className=" w-full flex flex-wrap justify-center">
  <div className=" flex flex-wrap w-[95%] 800px:min-h-[80vh] min-h-[70vh]">
    
    <div className={`w-full sm:w-[95%] md:w-[80%] lg:w-[70%] xl:w-[50%] bg-no-repeat ${styles.noramlFlex}`}
    >
     <div className=" relative p-3">
     <Carousel>
     <div>
     <img
        src="images/main-banner-1.jpg"
        alt="banner image"
        className=" rounded-[10px] shadow"
      />
     </div>
     <div>
     <img
        src="images/main-banner (1).jpg"
        alt="banner image"
        className=" rounded-[10px] shadow"
      />
     </div>
      </Carousel>
      <div className={`${styles.section} main-banner-content w-[90%] 800px:w-[60%] absolute`}>
        <h4 className={` leading-[24px] text-[12px] sm:text-[10px] md:text-[12px] lg:text-[16px] text-[#ff4931] font-[500] capitalize`}>
          SUPERCHARGED FOR PROS.
        </h4>
        <h5 className={` leading-[54px] text-[26px] sm:text-[26px] md:text-[36px] lg:text-[42px] text-[#ffffff] font-[700]  capitalize`}>
          iPAD S13+ Pro.
        </h5>
        <p className="pt-5 font-[400] text-[#000000ba]">
          From $999.00 or <br /> $41.62/mo.
        </p>

        <Link to="/products">
          <div className={`${styles.button} mt-5 !rounded-[23px] !w-[60px] !h-[30px] 400px:!w-[80px] 400px:!h-[30px] 800px:!w-[120px] 800px:!h-[50px]  hover:bg-[#1ce815]`}
          >
            <span className=" text-[#fff] font-[600] 400px:text-[10px] 800px:text-[15px] font-[Poppins] text-[10px]">
              Shop Now
            </span>
          </div>
        </Link>
      </div>
     </div>
    </div>
    
    
    <div className={`w-full sm:w-[95%] md:w-[80%] lg:w-[25%] xl:w-[25%] bg-no-repeat ${styles.noramlFlex}`}
    >
      <div className="flex flex-wrap justify-between items-center ">
      <div className="relative p-3">

      <img
        src="images/catbanner-01.jpg"
        alt="banner image"
        className=" rounded-[10px] shadow"
      />
      <div className={`${styles.section} small-banner-content w-[90%] 800px:w-[60%] absolute`}>
        <h4 className={` leading-[24px] text-[14px] text-[#3076f9] font-[500] capitalize`}>
          BEST SALE.
        </h4>
        <h5 className={` leading-[34px] text-[22px] text-[#190505] font-[700] capitalize`}>
         Laptops Max
        </h5>
        <p className="pt-5 font-[400] text-[14px] text-[#000000ba]">
          From $1699.00 or <br /> $64.62/mo.
        </p>

      </div>
      </div>

      <div className="relative p-3">

      <img
        src="images/catbanner-02.jpg"
        alt="banner image"
        className=" rounded-[10px] shadow"
      />
      <div className={`${styles.section} small-banner-content w-[90%] 800px:w-[60%] absolute`}>
        <h4 className={` leading-[24px] text-[14px] text-[#12ca4f] font-[500] capitalize`}>
        16% OFF
        </h4>
        <h5 className={` leading-[34px] text-[22px] text-[#2b0505] font-[700] capitalize`}>
          Smartwatch 7
        </h5>
        <p className="pt-5 font-[400] text-[14px] text-[#000000ba]">
          Shop the latest brand <br /> styles and color.
        </p>

      </div>
      </div>

      
      </div>
    </div>

    <div className={`w-full sm:w-[95%] md:w-[80%] lg:w-[25%] xl:w-[25%]  bg-no-repeat ${styles.noramlFlex}`}
    >
      <div className="flex flex-wrap justify-between items-center ">
      <div className="relative p-3">

      <img
        src="images/catbanner-03.jpg"
        alt="banner image"
        className=" rounded-[10px] shadow"
      />
      <div className={`${styles.section} small-banner-content w-[90%] 800px:w-[60%] absolute`}>
        <h4 className={` leading-[24px] text-[14px] text-[#fd8f2e] font-[500] capitalize`}>
       NEW ARRIVAL
        </h4>
        <h5 className={` leading-[34px] text-[22px] text-[#190505] font-[700] capitalize`}>
        Bui IPad Air
        </h5>
        <p className="pt-5 font-[400] text-[14px] text-[#000000ba]">
         From $599 or <br /> $49.91/mo. for mo.
        </p>

      </div>
      </div>

      <div className="relative p-3">

      <img
        src="images/catbanner-04.jpg"
        alt="banner image"
        className=" rounded-[10px] shadow"
      />
      <div className={`${styles.section} small-banner-content w-[90%] 800px:w-[60%] absolute`}>
        <h4 className={` leading-[24px] text-[14px] text-[#fa325a] font-[500] capitalize`}>
        SUPER BASE 
        </h4>
        <h5 className={` leading-[34px] text-[22px] text-[#2b0505] font-[700] capitalize`}>
         AIR Pods Max
        </h5>
        <p className="pt-5 font-[400] text-[14px] text-[#000000ba]">
         High-quality play <br /> ultra-low distortion
        </p>

      </div>
      </div>

      
      </div>
    </div>
    
    </div>
    </div>
  </>
  );
};

export default Hero;
