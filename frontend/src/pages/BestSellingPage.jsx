
import React, { useEffect, useState } from "react";
import Header from "../components/Layout/Header";
import styles from "../styles/style";
import ProductCard from "../components/Route/ProductCard/ProductCard";
import { useSelector } from "react-redux";
import Loader from "../components/Layout/Loader";
import Footer from "../components/Layout/Footer";
import Pagination from "../components/Pagination";

const BestSellingPage = () => {
  const [data, setData] = useState([]);
  const {allProducts, isLoading} = useSelector((state) => state.products);
  const [startIndex, setStartIndex] = useState(0);
  const resultPerPage = 10;
  const [lastIndex, setLastIndex] = useState(resultPerPage);
  useEffect(() => {
    const allProductsData = allProducts ? [...allProducts] : [];
    const sortedData = allProductsData?.sort((a,b) => b.sold_out - a.sold_out); 
    setData(sortedData);
  }, [allProducts]);

  return (
   <>
     {
      isLoading ? (
          <Loader />
      ) :  (
        <div>
        <Header activeHeading={2} />
        <br />
        <br />
        <div className={`${styles.section}`}>
          <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12">
            {data && data.slice(startIndex, lastIndex).map((i, index) => <ProductCard data={i} key={index} />)}
          </div>
            <div className="">
              <Pagination 
               itemArray={data} resultPerPage={resultPerPage} 
               startIndex={startIndex} setStartIndex={setStartIndex}
                  lastIndex={lastIndex} setLastIndex={setLastIndex} data={data}
                 />

            </div>
        </div>
        <Footer />
      </div>
      )
     }
   </>
  );
};

export default BestSellingPage;
