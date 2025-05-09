import React, { useContext, useEffect, useRef, useState } from 'react';
import Logo from '../../../assets/plant/TheGreenCorner.png';
import { Link, NavLink } from 'react-router-dom';
import { IoMdSearch } from 'react-icons/io';
import { FaCaretDown, FaCartShopping, FaHeart, FaUser, FaBars } from 'react-icons/fa6';
import DarkMode from './DarkMode';
import gsap from 'gsap';
import { plantContext } from '../../Context/AppContext';
import { MdLogout, MdPerson } from 'react-icons/md';
import { FaChevronDown } from 'react-icons/fa';

const menu = [
    { id: 1, name: 'Home', link: "/" },
    { id: 2, name: 'Shop', link: "/navbar/allplant" },
    { id: 3, name: 'Equipment', link: "/equipments" },
    { id: 6, name: 'Soil', link: "/soil" },
    { id: 4, name: 'Contact Us', link: "/contactpage" },
    { id: 5, name: 'About', link: "/aboutpage" },
];

const Navbar = () => {
    const textRef = useRef(null);
    const { totalCartItems ,isLoggedIn, setIsLoggedIn,userDetails, setUserDetails } = useContext(plantContext);
    const [menuOpen, setMenuOpen] = useState(false); // To control mobile menu visibility
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        gsap.fromTo(
            textRef.current,
            { scale: 0, opacity: 0 },
            {
                scale: 1,
                opacity: 1,
                duration: 3,
                ease: "power3.out",
            }
        );
    }, []);

    const handleLogout = () => {
        setIsLoggedIn(false);
        setUserDetails({ email: "", password: "" });
        navigate('/');  // Redirect to login page
    };

    let closeTimeout;
    const handleMouseEnter = () => {
      clearTimeout(closeTimeout); // Prevent closing when re-entering
      setIsOpen(true);
    };
  
    const handleMouseLeave = () => {
      closeTimeout = setTimeout(() => {
        setIsOpen(false);
      }, 200); // 500ms delay before closing
    }
   
    return (
        <div className="shadow-md bg-white dark:bg-white dark:text-black duration-200 relative z-40">
            {/* upper Navbar */}
            <div className="bg-[#333] py-2">
                <div className="container flex justify-between items-center">
                    {/* Logo */}
                    <div>
                        <Link to="/" className="font-bold text-2xl sm:text-3xl flex gap-2">
                            <img src={Logo} alt="Logo" className="p-2 w-40  lg:w-60" />
                        </Link>
                    </div>  
                    {/* Navigation Menu for Desktop */}
                    <div ref={textRef} className="sm:flex hidden justify-center">
                        <ul className="flex items-center gap-6 text-white">
                            {menu.map((data) => (
                                <li key={data.id}>
                                    <NavLink
                                        className={({ isActive }) => {
                                            let checkIsActive = isActive ? "linkIsActive" : "linkIsInActive";
                                            return checkIsActive;
                                        }}
                                        to={data.link}
                                    >
                                        {data.name}
                                    </NavLink>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className='flex gap-3'>
                        <div className="flex justify-between items-center h-[100%] gap-4">
                            
                            {/* After Login option */}
                            <>
                            <h1 className='hidden md:block text-white font-medium'>
                                    Hello, 
                                    {isLoggedIn ? userDetails.user.username.split(" ")[0] : "user" }
                                </h1>

                                    </>
                            {isLoggedIn ? (
                                <>
                                    <div 
                                onMouseEnter={handleMouseEnter}
                                onMouseLeave={handleMouseLeave}
                                className="relative"
                            >
                                {/* Button to toggle dropdown */}
                                <button
                                
                                    className="flex items-center bg-white text-black px-2 py-1 rounded-lg transition"
                                >
                                    Account <FaChevronDown className="ml-2" />
                                </button>

                                {/* Dropdown Menu */}
                                {isOpen && (
                                    <div className="absolute mt-2 w-36 bg-white shadow-lg rounded-lg overflow-hidden">
                                        <ul className="text-gray-700">
                                            <Link to="/userData">
                                                <li className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 cursor-pointer">
                                                <MdPerson className="text-blue-600" size={20} />
                                                My Profile
                                                </li>
                                            </Link>

                                        
                                            <li onClick={handleLogout} className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 cursor-pointer text-red-600">
                                            <MdLogout size={20} />
                                            Logout
                                            </li>
                                        </ul>
                                    </div>
                                )}
                            </div>
                                  
                                    {/* Wishlist */}
                                    <Link to="/wishlist">
                                        <FaHeart size={22}  className="text-xl text-[#fff] drop-shadow-sm cursor-pointer hover:text-red-700" />
                                    </Link>

                                    {/* Cart */}
                                   
                                   <Link to="/cart" >
                                    {totalCartItems > 0 && <span className="absolute bg-yellow-400 lg:top-4 sm:top-2 top-2 px-1 text-xs  rounded-full">{totalCartItems}</span>} 
                                    
                                        <FaCartShopping size={22} className="text-xl text-[#fff] drop-shadow-sm cursor-pointer"  />
                                    </Link>
                                 
                                 {/* Account */}
                               
                                    

                                    {/* Logout Button */}
                                    {/* <button onClick={handleLogout} className="px-3 py-1 text-white rounded-md  ">
                                        <MdLogout  size={22}/>
                                    </button> */}
                                </>
                            ) : (
                                /* If user is NOT logged in, show only Login button */
                                <Link to="/login" className="px-2 py-2 bg-white text-white rounded-full ">
                                    <FaUser className='text-black'/>
                                </Link>
                            )}                       
                        </div>
                        <div className="sm:hidden flex items-center">
                            <button
                                className="text-white"
                                onClick={() => setMenuOpen(!menuOpen)}
                            >
                                <FaBars className="text-xl" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            {/* Mobile Dropdown Menu */}
            <div className={`sm:hidden ${menuOpen ? 'block' : 'hidden'} bg-[#333] absolute w-full top-16 left-0`}>
                <ul className="flex flex-col items-center text-white py-4">
                    {menu.map((data) => (
                        <li key={data.id} className="py-2">
                            <NavLink
                                className={({ isActive }) => {
                                    let checkIsActive = isActive ? "linkIsActive" : "linkIsInActive";
                                    return checkIsActive;
                                }}
                                to={data.link}
                                onClick={() => setMenuOpen(true)} // Close menu on item click
                            >
                                {data.name}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Navbar;






























// import React, { useContext, useEffect, useRef } from 'react'
// import Logo from '../../../assets/plant/TheGreenCorner.png'
// import { Link, NavLink } from 'react-router-dom'
// import { IoMdSearch } from 'react-icons/io'
// import { FaCaretDown, FaCartShopping, FaHeart, FaUser } from 'react-icons/fa6'
// import DarkMode from './DarkMode'
// import gsap from 'gsap'
// import { plantContext } from '../../Context/AppContext'

// const menu = [
//     {
//         id: 1,
//         name: 'Home',
//         link: "/"
//     },
//     {
//         id: 2,
//         name: 'Shop',
//         link: "/navbar/allplant"
//     },
//     {
//         id: 3,
//         name: 'Contact Us',
//         link: "/contactpage"
//     },
//     {
//         id: 4,
//         name: 'About',
//         link: "/aboutpage"
//     },

// ]

// const DropdownLinks = [
//     {
//         id: 1,
//         name: 'OutDoor Plant',
//         link: "/#"
//     },
//     {
//         id: 2,
//         name: 'Indoor Plant',
//         link: "/#"
//     },
//     {
//         id: 3,
//         name: 'Flowers',
//         link: "/#"
//     },
// ]
// const Navbar = () => {
//     // let { setSearch } = useContext(plantContext)
//     const textRef = useRef(null);
//    let {totalItems} = useContext(plantContext);    

    
    

//     useEffect(() => {
//         gsap.fromTo(
//             textRef.current,
//             { scale: 0, opacity: 0 },
//             {
//                 scale: 1,
//                 opacity: 1,
//                 duration: 3,
//                 ease: "power3.out",
//             }
//         );
//     }, []);


//     return (
//         <div className="shadow-md bg-white dark:bg-white dark:text-black duration-200 relative z-40">
//             {/* upper Navbar */}
//             <div className=" bg-[#333] py-2">
//                 <div className="container flex justify-between items-center">
//                     <div>
//                         <Link to="/" className="font-bold text-2xl  sm:text-3xl flex gap-2">
//                             <img src={Logo} alt="Logo" className="p-2" />

//                         </Link>
//                     </div>
                    
//                     {/* search bar */}
//                     <div className="flex justify-between items-center gap-4">
//                         <div className="relative group hidden sm:block">
//                             <input
//                                 type="text"
//                                 onChange={(e) => { setSearch(e.target.value) }}
//                                 placeholder="search your plants"
//                                 className="w-[200px] sm:w-[200px] group-hover:w-[300px] transition-all duration-300 rounded-full border border-gray-300 px-2 py-1 focus:outline-none focus:border-1 focus:border-primary dark:border-gray-500 dark:bg-white  " />
//                             <IoMdSearch className="text-gray-500  absolute top-1/2 -translate-y-1/2 right-3" />
//                         </div>

//                         {/* Whishlist */}
//                         <Link to='/wishlist'>
//                             <button
//                                 className="bg-[#eee] hover:text-black transition-all duration-200 text-black  py-1 px-4 rounded-full flex items-center gap-1 group"
//                             >
//                                 <span className="group-hover:block hidden transition-all duration-200 opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100 ">
//                                     WishList
//                                 </span>

//                                 <FaHeart className="text-xl text-[#333] hover:text-black drop-shadow-sm cursor-pointer" />

//                             </button>
//                         </Link>

//                         {/* Cart button */}
//                         <Link to="/cart"> 
//                         <button
//                             className="bg-[#eee] transition-all duration-200 text-black  py-1 px-4 rounded-full flex items-center gap-1 group"
//                         >
//                             <span className="group-hover:block hidden transition-all duration-200 opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100">
//                                 Cart
//                             </span>
                           
//                             <FaCartShopping className="text-xl text-[#333] drop-shadow-sm cursor-pointer" /><sup>{totalItems}</sup>
//                         </button>
                        
//                     </Link>
                    

//                     {/* SignIn */}
//                     <button
//                         className="bg-[#eee] transition-all duration-200 text-black  py-1 px-4 rounded-full flex items-center gap-1 group"
//                     >
//                         <span className="group-hover:block hidden transition-all duration-200">
//                             <NavLink className={({ isActive }) => {
//                                 let checkIsActive = isActive ? "linkIsActive" : "linkIsInActive"
//                                 return checkIsActive
//                             }} to='/signup'>SignUp</NavLink>
//                         </span>
//                         <FaUser className="text-xl text-[#333] drop-shadow-sm cursor-pointer" />

//                     </button>
//                     {/* Darkmode Switch */}
//                     {/* <div>
//                         <DarkMode />
//                     </div> */}
//                 </div>
//             </div>
//         </div>
//             {/* lower Navbar */ }
//     <div ref={textRef} className="flex justify-center">
//         <ul className="sm:flex hidden items-center gap-4">
//             {/* inline-block px-4 font-semibold  hover:text-green-300 duration-200 */}

//             {menu.map((data) => (
//                 <li key={data.id}>
//                     <NavLink className={({ isActive }) => {
//                         let checkIsActive = isActive ? "linkIsActive" : "linkIsInActive"
//                         return checkIsActive
//                     }} to={data.link}>{data.name}</NavLink>
//                 </li>
//             ))}
//             {/* Simple Dropdown and Links */}
//             <li className="group relative cursor-pointer">
//                 <a href="#" className="flex items-center font-semibold  gap-[2px] py-2">
//                     Category
//                     <span>
//                         <FaCaretDown className="transition-all duration-200 group-hover:rotate-180" />
//                     </span>
//                 </a>
//                 <div className="absolute z-[9999] hidden group-hover:block w-[200px] rounded-md bg-white p-2 text-black shadow-md">
//                     <ul>
//                         {DropdownLinks.map((data) => (
//                             <li key={data.id}>
//                                 <a
//                                     href={data.link}
//                                     className="inline-block w-full rounded-md p-2 "
//                                 >
//                                     {data.name}
//                                 </a>
//                             </li>
//                         ))}
//                     </ul>
//                 </div>
//             </li>
//         </ul>
//     </div>
//         </div >
//     )
// }

// export default Navbar