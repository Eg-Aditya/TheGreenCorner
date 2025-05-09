import React from "react";
// import footerLogo from "../../assets/logo.png";
import logo from "../../../assets/plant/TheGreenCorner.png";

import {
    FaFacebook,
    FaInstagram,
    FaLinkedin,
    FaLocationArrow,
    FaMobileAlt,
    FaPinterest,
    FaYoutube,
} from "react-icons/fa";
import { FaSquareYoutube } from "react-icons/fa6";


const customerCare = [
    {
        title: "My Account",
        link: "/#",
    },
    {
        title: "Returns & Refund Policy",
        link: "/#about",
    },
    {
        title: "Track Your Order",
        link: "/#contact",
    },
    {
        title: "Blog",
        link: "/#blog",
    },
];
const quickDeals = [
    {
        title: "Independent Sellers",
        link: "/#",
    },
    {
        title: "Returns & Refund Policy",
        link: "/#about",
    },
    {
        title: "The 🌱 Community",
        link: "/#contact",
    },
    {
        title: "Recently Viewd",
        link: "/#blog",
    },
];

const Footer = () => {
    return (
        <div className="text-white bg-[#111827]">
            <div className="container">
                <div className="grid md:grid-cols-3 pb-10 pt-5">
                    {/* company details */}
                    <div className="py-8 px-4">
                        <h1 className="sm:text-3xl text-xl font-bold sm:text-left text-justify mb-3 flex items-center gap-3">
                            <img src={logo} alt="" className="max-w-[100%]" />

                        </h1>
                        <p>
                         Plants Grow People.
                        </p>
                    </div>

                    {/* Footer Links */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 col-span-2 md:pl-10">
                        <div>
                            <div className="py-8 px-4">
                                <h1 className="sm:text-xl text-xl font-bold sm:text-left text-justify mb-3">
                                    Customer Care
                                </h1>
                                <ul className="flex flex-col gap-3">
                                    {customerCare.map((link) => (
                                        <li
                                            className="cursor-pointer hover:text-primary hover:translate-x-1 duration-300 text-gray-200"
                                            key={link.title}
                                        >
                                            <span>{link.title}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        <div>
                            <div className="py-8 px-4">
                                <h1 className="sm:text-xl text-xl font-bold sm:text-left text-justify mb-3">
                                    Links
                                </h1>
                                <ul className="flex flex-col gap-3">
                                    {quickDeals.map((link) => (
                                        <li
                                            className="cursor-pointer hover:text-primary hover:translate-x-1 duration-300 text-gray-200"
                                            key={link.title}
                                        >
                                            <span>{link.title}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        {/* social links */}

                        <div>
                            <h1 className="mt-6 px-4 sm:text-xl text-xl font-bold sm:text-left text-justify mb-3">Follow Us</h1>
                            <div className="flex items-center gap-3 px-4 mt-6">
                                <a href="#">
                                    <FaInstagram className="text-3xl bg-gradient-to-r from-[#f58529] via-[#dd2a7b] to-[#8134af] py-1 px-1 rounded-full size-10" />
                                </a>
                                <a href="#">
                                    <FaFacebook className="text-3xl bg-blue-700 py-2 px-2 rounded-full size-10" />
                                </a>
                                <a href="#">
                                    <FaPinterest className="text-3xl  bg-red-700 py-2 px-2 rounded-full size-10" />
                                </a>
                                <a href="#">
                                    <FaYoutube className="text-3xl  bg-red-600 py-2 px-2 rounded-full size-10" />
                                </a>

                            </div>
                            <div className="px-4 mt-6">
                                <div className="flex items-center gap-3">
                                    <FaLocationArrow />
                                    <p>Pune, Maharashra</p>
                                </div>
                                <div className="flex items-center gap-3 mt-3">
                                    <FaMobileAlt />
                                    <p>+91 123456789</p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                <div className="w-full flex flex-col items-center justify-center">
                    <div className="w-[85%] bg-white h-1 flex  "></div>

                    <div className="px-4 w-[100%] flex justify-around py-10">
                        <h1>@2025  Plantify. All RIghts Reserved.</h1>
                        <h1>Privacy Policy | Terms & Condition | Accessibility | Do Not Sell My Personal  Infromation </h1>
                    </div>
                </div>
            </div>

            {/*  */}

        </div>
    );
};

export default Footer;
