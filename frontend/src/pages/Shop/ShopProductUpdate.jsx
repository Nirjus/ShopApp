import React from 'react'
import DashboardHeader from '../../components/Shop/Layout/DashboardHeader'
import DashboardSideBar from '../../components/Layout/DashboardSideBar'
import AllProductsUpdate from "../../components/Shop/AllProductsUpdate"

const ShopProductUpdate = () => {
  return (
    <div>
        <DashboardHeader />
        <div className="flex justify-between w-full">
            <div className="w-[80px] 800px:w-[330px]">
                <DashboardSideBar active={3}/>
            </div>
            <div className="w-full justify-center flex">
                 <AllProductsUpdate />
            </div>
        </div>
    </div>
  )
}
export default ShopProductUpdate