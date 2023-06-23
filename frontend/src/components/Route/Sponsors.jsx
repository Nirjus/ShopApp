import React from 'react'
import styles from '../../styles/style'

const Sponsors = () => {
  return (
    <div className={`${styles.section} hidden sm:block bg-white py-10 px-5 mb-12 cursor-pointer rounded-xl`}>

     <div className='flex justify-between w-full'>
         <div className="flex items-start">
            <img src="https://w7.pngwing.com/pngs/353/377/png-transparent-sony-mobile-business-corporation-sony-xperia-sony-electronics-text-logo-thumbnail.png" alt="" style={{width:"150px", objectFit:"contain"}}/>
         </div>
         <div className="flex items-start">
            <img src="https://www.freepnglogos.com/uploads/dell-png-logo/dell-png-logo-0.png" alt=""  style={{width:"150px", objectFit:"contain"}}/>
         </div>
         <div className="flex items-start">
            <img src="https://www.freepnglogos.com/uploads/apple-logo-png/file-apple-logo-black-svg-wikimedia-commons-1.png" alt="" style={{width:"150px", objectFit:"contain"}}/>
         </div>
         <div className="flex items-start">
            <img src="https://www.freepnglogos.com/uploads/microsoft-logo-small-29.png" alt="" style={{width:"150px", objectFit:"contain"}}/>
         </div>
         <div className="flex items-start">
            <img src="https://www.freepnglogos.com/uploads/google-logo-png/google-logo-png-suite-everything-you-need-know-about-google-newest-0.png" alt="" style={{width:"150px", objectFit:"contain"}}/>
         </div>
     </div>
    </div>
  )
}

export default Sponsors