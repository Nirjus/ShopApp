import React, { useEffect, useState } from "react";
import Header from "../components/Layout/Header";
import { useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Loader from "../components/Layout/Loader";
import Footer from "../components/Layout/Footer";
import ProductFiltering from "../components/Products/ProductFiltering";
import Pagination from "../components/Pagination";

const ProductsPage = () => {
  const [searchParams] = useSearchParams();
  const [data, setData] = useState([]);
  const categoryData = searchParams.get("category");
    const {allProducts,isLoading} = useSelector((state) => state.products);
  const [startIndex, setStartIndex] = useState(0);
  const resultPerPage = 15;
  const [lastIndex, setLastIndex] = useState(resultPerPage);

  useEffect(() => {
    if (categoryData === null) {
      const d = allProducts;
      setData(d);
    } else {
      const d =
      allProducts && allProducts.filter((i) => i.category === categoryData);
      setData(d);
    }
    //   window.scrollTo(0,0)
  }, [allProducts]);

  return (
   <>
   {
    isLoading ? (
      <Loader />
    )  :  (
      <div>
      <Header activeHeading={3} />
      <br />
      <br />
      <div className="">
      <ProductFiltering products={data} startIndex={startIndex} lastIndex={lastIndex} />
      </div>
        <Pagination itemArray={data} resultPerPage={resultPerPage} 
        startIndex={startIndex} setStartIndex={setStartIndex}
           lastIndex={lastIndex} setLastIndex={setLastIndex} data={data}
          />
      <br />
      <Footer />
    </div>
    )
   }
   </>
  );
};

export default ProductsPage;
