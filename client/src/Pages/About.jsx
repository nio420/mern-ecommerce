import React from 'react'
import Title from '../Components/Title'
import { assets } from '../Utils/assets'
import NewsLetter from '../Components/NewsLetter'

const About = () => {
  return (
    <section className='border-t border-gray-300 pt-10 px-4 sm:px-0'>
      
      {/* Centered page title */}
      <div className='text-3xl text-center'>
        <Title text1={"ABOUT"} text2={"US"}/>
      </div>

      <div className='my-10 flex flex-col md:flex-row gap-16'>
        <img src={assets.about_img} className='w-full md:max-w-112.5 rounded' alt="about img" />
        
        {/* Brand story and mission */}
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600 text-lg text-left'>
          <p>Forever was born out of a passion for innovation and a desire to revolutionize the way people shop online. Our journey began with a simple idea: to provide a platform where customers can easily discover, explore, and purchase premium products from the comfort of their homes.</p>
          <p>Since our inception, we've worked tirelessly to curate a diverse selection of high-quality merchandise that caters to every taste and preference. From fashion and electronics to home essentials, we offer an extensive collection sourced from trusted brands and suppliers.</p>
          <b className='text-gray-800'>Our Mission</b>
          <p>Our mission at Forever is to empower customers with choice, convenience, and confidence. We are dedicated to delivering an exceptional shopping experience that exceeds expectations, from browsing to checkout and beyond.</p>
        </div>
      </div>

      {/* Benefits section header */}
      <div className='text-2xl py-4 text-left'>
        <Title text1={"WHY"} text2={"CHOOSE US"} />
      </div>

      {/* Feature cards with hover effects */}
      <div className='mb-20 text-sm flex flex-col md:flex-row '>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5 text-left hover:-translate-y-1 hover:shadow-lg hover:bg-gray-100 transition-all duration-300'>
          <b className='text-gray-800 uppercase'>Quality Assurance:</b>
          <p className='text-gray-600'>We meticulously select and vet each product to ensure it meets our stringent quality standards, ensuring your satisfaction with every purchase.</p>
        </div>

        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5 text-left hover:-translate-y-1 hover:shadow-lg hover:bg-gray-100 transition-all duration-300'>
          <b className='text-gray-800 uppercase'>Convenience:</b>
          <p className='text-gray-600'>With our user-friendly interface and hassle-free ordering process, shopping has never been easier or more enjoyable.</p>
        </div>

        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5 text-left hover:-translate-y-1 hover:shadow-lg hover:bg-gray-100 transition-all duration-300'>
          <b className='text-gray-800 uppercase'>Customer Service:</b>
          <p className='text-gray-600'>Our team of dedicated professionals is here to assist you every step of the way, ensuring your inquiries are met with promptness and care.</p>
        </div>
      </div>
      {/* newsletter  */}
      <NewsLetter/>
    </section>
  )
}

export default About