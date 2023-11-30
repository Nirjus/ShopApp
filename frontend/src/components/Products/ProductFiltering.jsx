import React, { useState } from 'react';
import ProductCard from '../Route/ProductCard/ProductCard';
import styles from '../../styles/style';

const BrandFilter = ({ brands, selectedBrand, onBrandChange }) => {
  return (
    <div className='cursor-pointer p-2 pl-3 border-[1px] border-[#c1c1c1] hover:bg-[#dcdcdc] duration-500'>
      <h2 className='  text-[#1f1d2f] text-[20px] font-semibold mb-4'>Brand Filter</h2>
      <select  className=' cursor-pointer bg-[#222222] text-[#fff] rounded-lg p-1' value={selectedBrand} onChange={onBrandChange}>
        <option value="">All Brands</option>
        {brands.map(brand => (
          <option key={brand} value={brand}>
            {brand}
        
          </option>
        ))}
      </select>
    </div>
  );
};

const PriceSort = ({ sortType, onSortChange }) => {
  return (
    <div className=' p-2 cursor-pointer border-[1px] border-[#c7c7c7] hover:bg-[#e0e0e0] duration-500'>
    <h2 className=' text-[#322028] text-[20px] font-semibold mb-4'>Price Sorting</h2>
    <select className=' cursor-pointer bg-[#222222] text-[#fff] rounded-lg p-1' value={sortType} onChange={onSortChange}>
        <option value="asc">Low to High</option>
        <option value="desc">High to Low</option>
      </select>
    </div>
  );
};

const ProductFiltering = ({ products = [], startIndex, lastIndex }) => {
  const [selectedBrand, setSelectedBrand] = useState('');
  const [sortType, setSortType] = useState('asc');

  const brands = [...new Set(products.map(product => product.shop.name))];
 
  const handleBrandChange = event => {
    setSelectedBrand(event.target.value);
  };

  const handleSortChange = event => {
    setSortType(event.target.value);
  };

  const filteredProducts = selectedBrand
    ? products.filter(product => product.shop.name === selectedBrand)
    : [...products];

  const sortedProducts = filteredProducts.sort((a, b) => {
    if (sortType === 'asc') {
      return a.discountPrice - b.discountPrice;
    } else {
      return b.discountPrice - a.discountPrice;
    }
  });

  return (
    <div>
     <div className=" rounded-lg shadow-lg w-[90%] flex items-center min-h-[140px] mx-auto m-5  bg-[#f0f0f0]">
    <div className="w-[40%] max-800px:w-full  flex flex-row items-center justify-evenly">
    <BrandFilter
        brands={brands}
        selectedBrand={selectedBrand}
        onBrandChange={handleBrandChange}
      />
      <PriceSort sortType={sortType} onSortChange={handleSortChange} />
    </div>
     </div>
      <div className={`${styles.section}`}>
        <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12">
        {sortedProducts.slice(startIndex, lastIndex).map(product => (
          <ProductCard data={product} key={product} />
        ))}
        </div>
        {products && products.length === 0 ? (
          <h1 className=" text-center w-full pb-[100px] text-[20px]">
            No Products Found!
          </h1>
        ) : null}
      </div>
    </div>
  );
};

export default ProductFiltering;
