import React, { useState } from 'react';
import ProductCard from '../Route/ProductCard/ProductCard';
import styles from '../../styles/style';

const BrandFilter = ({ brands, selectedBrand, onBrandChange }) => {
  return (
    <div className=' p-2 pl-3 border-r-4 border-r-[#929191]'>
      <h2 className=' text-[#553bfe] text-[25px] font-semibold'>Brand Filter</h2>
      <select  className='border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:border-blue-300 transition duration-300 ease-in-out' value={selectedBrand} onChange={onBrandChange}>
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
    <div className=' p-2'>
      <h2 className=' text-[#ff2282] text-[25px] font-semibold'>Price Sorting</h2>
      <select className='border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:border-blue-300 transition duration-300 ease-in-out' value={sortType} onChange={onSortChange}>
        <option value="asc">Low to High</option>
        <option value="desc">High to Low</option>
      </select>
    </div>
  );
};

const ProductFiltering = ({ products = [] }) => {
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
     <div className=" rounded-lg shadow-lg w-[90%] flex items-center min-h-[140px] mx-auto m-5 bg-gradient-to-r from-white to-slate-500">
    <div className="w-[40%] max-800px:w-full  flex flex-row items-center justify-center">
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
        {sortedProducts.map(product => (
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
