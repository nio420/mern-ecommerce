import React from 'react'

const Title = ({text1, text2}) => {
  return (
    <div className='inline-flex gap-2 items-center mb-3'>
        <p className='text-primary-light/85 '> {text1} <span className='text-primary-dark/90 font-medium '>{text2}</span></p>
        <span className="w-8 md:w-11 h-0.5 bg-[#414141]"></span>
    </div>
  )
}

export default Title