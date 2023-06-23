import React from 'react'
import Header from "../components/Layout/Header";
import Hero from '../components/Route/Hero/Hero';
import Category from "../components/Route/Categories/Category";
import BestDeals from "../components/Route/BestDeals/BestDeals";
import FeaturedProduct from "../components/Route/FeaturedProduct/FeaturedProduct";
import Events from "../components/Events/Events";
import Sponsors from "../components/Route/Sponsors";
import Footer from "../components/Layout/Footer"
const HomePage = () => {
  return (
    <div>
        <Header activeHeading={1}/>
        <Hero/>
        <Category/>
        <BestDeals />
        <Events/>
        <FeaturedProduct />
        <Sponsors />
        <Footer/>
    </div>
  )
}

export default HomePage