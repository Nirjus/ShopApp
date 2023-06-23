import React from 'react'
import styles from '../../styles/style'
import ShopInfo from "../../components/Shop/ShopInfo"
import ShopProfileData from "../../components/Shop/ShopProfileData"

const ShopHomePage = () => {
  return (
    <div className={`${styles.section} bg-[#e6e5e5]`}>
      <div className="w-full 800px:flex py-10 justify-between">

        <div className='800px:w-[25%] bg-[#fff] rounded-sm 800px:overflow-y-scroll 800px:h-[90vh] 800px:sticky top-10 left-0 z-10'>
              <ShopInfo isOwner={true}/>
        </div>
        <div className=" 800px:w-[72%] mt-5 800px:mt-['unset'] rounded-[4px]">
          <ShopProfileData isOwner={true}/>
        </div>
      </div>

    </div>
  )
}

export default ShopHomePage