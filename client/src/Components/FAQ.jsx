import React, { useState } from 'react';
import Title from './Title'; // Assuming your Title component path

const FAQ = () => {
    const [active, setActive] = useState(null);

    const faqData = [
        {
            question: "How can I track my order status?",
            answer: "Once your order is shipped, you will receive an email with a tracking number and a link to our carrier's website. You can also track it directly from the 'Orders' section in your account."
        },
        {
            question: "What payment methods do you accept?",
            answer: "We support a variety of secure payment methods including Stripe (Credit/Debit Cards), SSLCommerz, and Cash on Delivery (COD)."
        },
        {
            question: "Can I change or cancel my order?",
            answer: "Orders can be modified within 2 hours of placement. After that, the order enters the processing phase. Please contact support immediately for urgent changes."
        },
        {
            question: "Is there a delivery fee?",
            answer: "Delivery fees are calculated based on your location and order weight at checkout. We offer free shipping on orders over a certain amount during promotions!"
        },
        {
            question: "How do I return an item?",
            answer: "Visit our 'Contact Us' page to initiate a return. Products must be in original condition with tags. Returns are processed in 5-7 business days."
        }
    ];

    const toggle = (index) => {
        setActive(active === index ? null : index);
    };

    return (
        <div className='my-20 px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
            <div className='text-center text-3xl py-8'>
                <Title text1={'Frequently Asked'} text2={'Questions'} />
                <p className='text-xs text-gray-500 mt-2 italic'>Quick answers to your most common questions</p>
            </div>

            <div className='max-w-4xl mx-auto'>
                {faqData.map((item, index) => (
                    <div key={index} className='mb-4 border border-gray-200 rounded-lg bg-white overflow-hidden transition-all duration-300 hover:shadow-sm'>
                        <button
                            className={`w-full px-6 py-5 flex justify-between cursor-pointer items-center text-left transition-all duration-300 ${active === index ? 'bg-gray-50' : 'bg-white'}`}
                            onClick={() => toggle(index)}
                        >
                            <span className={`text-base font-medium transition-colors duration-300 ${active === index ? 'text-black' : 'text-gray-700'}`}>
                                {item.question}
                            </span>
                            <div className={`relative w-4 h-4 transition-transform duration-500 ${active === index ? 'rotate-180' : ''}`}>
                                <div className="absolute w-full h-0.5 bg-gray-500 top-1/2 left-0 -translate-y-1/2"></div>
                                <div className={`absolute w-0.5 h-full bg-gray-500 left-1/2 top-0 -translate-x-1/2 transition-opacity duration-300 ${active === index ? 'opacity-0' : 'opacity-100'}`}></div>
                            </div>
                        </button>

                        {/* SMOOTH ANIMATION WRAPPER */}
                        <div className={`grid transition-all duration-500 ease-in-out ${active === index ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                            <div className='overflow-hidden'>
                                <div className='px-6 pb-6 text-gray-800 text-sm border-t border-gray-100 pt-4 leading-relaxed'>
                                    {item.answer}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FAQ;