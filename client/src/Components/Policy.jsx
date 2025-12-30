import React from 'react'
import { assets } from "../Utils/assets";

const Policy = () => {
  return (
    <section className='flex flex-col sm:flex-row justify-around gap-12 sm:gap-2 text-center py-20 sm:text-sm text-xs md:text-base text-primary-dark'>
        {/* Policy 1 */}
        <div>
            <img src={assets.exchange_icon} className='w-12 m-auto mb-5' alt="" />
            <p className='font-semibold '> Easy Exchange Policy</p>
            <p className='text-primary-light '> We Offer Hassle free Exchange Policy</p>
        </div>
        {/* Policy 2 */}
        <div>
            <img src={assets.quality_icon} className='w-12 m-auto mb-5' alt="" />
            <p className='font-semibold '> 7 Days Return Policy</p>
            <p className='text-primary-light '> We Provide 7 Days Free Return Policy</p>
        </div>
        {/* Policy 3 */}
        <div>
            <img src={assets.support_img} className='w-12 m-auto mb-5' alt="" />
            <p className='font-semibold '> Best Customer Support</p>
            <p className='text-primary-light '> We Provide 24/7 Customer Support</p>
        </div>
    </section>
  )
}

export default Policy