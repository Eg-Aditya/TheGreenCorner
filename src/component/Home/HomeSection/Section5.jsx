import React from 'react';
import Img from "../../../assets/plant/Untitled design.png";
import { FaAngleRight } from 'react-icons/fa';

const Section5 = () => {
    return (
        <div className="mt-4 ml-4 mr-4 mb-20">
            <div className="relative flex items-center justify-center w-full h-auto">
                {/* Background Image */}
                <img src={Img} alt="Promotion" className="w-[80%] object-cover rounded-lg shadow-lg" />

                {/* Promotional Box */}
                <div className="absolute right-3 md:right-20 lg:right-36 bg-[#DCDDD7] p-6 border border-gray-300 shadow-lg rounded-md max-w-sm text-end flex items-end justify-end flex-col">
                    <p className='text-xs text-end mb-3'>SESANOAL OFF</p>
                    <h1 className="text-xl md:text-2xl text-end font-bold text-gray-800 mb-2">
                        20% Off This Weekend
                    </h1>
                    <h1 className='w-[70%]  p-1  '>
                        <p className="text-gray-600 text-xs mb-1">
                            Receive 20% off on everything in-store, when you spend over ₹1000.
                        </p>
                    </h1>
                    <button className="bg-[#163020] text-white px-4  flex gap-2 py-1 text-xl rounded-md hover:bg-[#163028] transition duration-200">
                        View All  <FaAngleRight className="mt-1"/> 
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Section5;
