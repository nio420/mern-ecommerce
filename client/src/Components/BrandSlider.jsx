import React from 'react';

const BrandSlider = () => {
  const brands = [
    { name: 'Stripe', logo: 'https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg' },
    { name: 'PayPal', logo: 'https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg' },
    { name: 'Visa', logo: 'https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg' },
    { name: 'Mastercard', logo: 'https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg' },
    { name: 'Amazon', logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg' },
    { name: 'DHL', logo: 'https://upload.wikimedia.org/wikipedia/commons/a/ac/DHL_Logo.svg' },
  ];

  return (
    <div className='my-15 py-10 border-y border-gray-100 bg-gray-50/50 overflow-hidden'>
      {/* Container for the sliding animation */}
      <div className='flex items-center w-max animate-infinite-scroll'>
        
        {/* First set of logos */}
        <div className='flex items-center gap-10 md:gap-20 px-10 opacity-50 grayscale hover:grayscale-0 transition-all duration-500'>
          {brands.map((brand, index) => (
            <img key={index} src={brand.logo} alt={brand.name} className='h-6 md:h-8 object-contain' />
          ))}
        </div>

        {/* Second set (duplicate) to create seamless loop */}
        <div className='flex items-center gap-10 md:gap-20 px-10 opacity-50 grayscale hover:grayscale-0 transition-all duration-500'>
          {brands.map((brand, index) => (
            <img key={`dup-${index}`} src={brand.logo} alt={brand.name} className='h-6 md:h-8 object-contain' />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BrandSlider;