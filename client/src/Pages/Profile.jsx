import React, { useContext, useEffect } from 'react';
import { ShopContext } from '../Context/ShopContext';
import Title from '../Components/Title';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const { userData, token, cartItems } = useContext(ShopContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (!token) {
            navigate('/login');
        }
    }, [token, navigate]);

    if (!userData) {
        return <div className='py-20 text-center'>Loading profile...</div>;
    }

    return (
        <div className='border-t pt-14 px-4 sm:px-[5vw]'>
            <div className='text-2xl mb-10'>
                <Title text1={'MY'} text2={'PROFILE'} />
            </div>

            <div className='flex flex-col lg:flex-row gap-10'>
                
                {/* --- Left Column: Summary Card --- */}
                <div className='lg:w-1/3 flex flex-col gap-6'>
                    <div className='border p-6 rounded-lg bg-gray-50 text-center'>
                        <div className='w-24 h-24 bg-black text-white rounded-full flex items-center justify-center text-4xl font-bold mx-auto mb-4'>
                            {userData.name.charAt(0).toUpperCase()}
                        </div>
                        <h2 className='text-xl font-bold'>{userData.name}</h2>
                        <p className='text-gray-500 text-sm'>{userData.email}</p>
                        <div className='mt-4 py-2 px-4 bg-white border rounded-full text-xs font-medium inline-block'>
                            Verified Customer
                        </div>
                    </div>

                    <div className='border p-6 rounded-lg'>
                        <h4 className='font-medium mb-4'>Account Activity</h4>
                        <div className='flex justify-between text-sm py-2 border-b'>
                            <span className='text-gray-500'>Cart Items</span>
                            <span>{Object.keys(cartItems).length} items</span>
                        </div>
                        <div className='flex justify-between text-sm py-2'>
                            <span className='text-gray-500'>Joined Date</span>
                            <span>{userData.date ? new Date(userData.date).toLocaleDateString() : 'Dec 2025'}</span>
                        </div>
                    </div>
                </div>

                {/* --- Right Column: Detailed Info --- */}
                <div className='flex-1 flex flex-col gap-6'>
                    
                    {/* Personal Information */}
                    <div className='border p-8 rounded-lg shadow-sm bg-white'>
                        <h3 className='text-lg font-medium border-b pb-4 mb-6'>Personal Information</h3>
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-10'>
                            <div>
                                <label className='text-xs text-gray-400 uppercase font-bold'>Full Name</label>
                                <p className='text-gray-800 text-lg border-b pb-1'>{userData.name}</p>
                            </div>
                            <div>
                                <label className='text-xs text-gray-400 uppercase font-bold'>Phone Number</label>
                                <p className='text-gray-800 text-lg border-b pb-1'>{userData.phone || "Add phone number"}</p>
                            </div>
                            <div className='md:col-span-2'>
                                <label className='text-xs text-gray-400 uppercase font-bold'>Default Shipping Address</label>
                                <p className='text-gray-800 text-lg border-b pb-1'>{userData.address || "No address saved yet"}</p>
                            </div>
                        </div>
                    </div>

                    {/* Security & Settings */}
                    <div className='border p-8 rounded-lg shadow-sm bg-white'>
                        <h3 className='text-lg font-medium border-b pb-4 mb-6'>Security</h3>
                        <div className='flex items-center justify-between'>
                            <div>
                                <p className='font-medium'>Password</p>
                                <p className='text-gray-500 text-sm'>Last updated: 1 month ago</p>
                            </div>
                            <button className='border border-black px-4 py-2 text-sm hover:bg-black hover:text-white transition-all cursor-pointer'>
                                Change Password
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;