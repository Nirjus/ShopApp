import React, { useEffect, useState } from "react";
import Header from "../components/Layout/Header";
import styles from "../styles/style";
import { useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import ProductCard from "../components/Route/ProductCard/ProductCard";
import Loader from "../components/Layout/Loader";
import Footer from "../components/Layout/Footer";
import ProductFiltering from "../components/Products/ProductFiltering";

const ProductsPage = () => {
  const [searchParams] = useSearchParams();
  const [data, setData] = useState([]);
  const categoryData = searchParams.get("category");
    const {allProducts,isLoading} = useSelector((state) => state.products);


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
      <ProductFiltering products={data} />
      </div>
      <br />
      <br />
      <Footer />
    </div>
    )
   }
   </>
  );
};

export default ProductsPage;
