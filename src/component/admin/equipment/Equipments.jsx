import React, { useContext, useEffect, useState } from 'react';
import { equipmentContext } from '../../Context/EquipmentsContext';
import { FaHeart, FaSort } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { IoMdSearch } from 'react-icons/io';
import axios from 'axios';
import toast from 'react-hot-toast';

const equipmentName = [
    // { id: 1, category: 'All Categories' },
    { id: 1, name: ' Seed Starter Kits' },
    { id: 2, name: 'Watering Equipment' },
    { id: 3, name: 'Gardening Tools' },
    { id: 4, name: 'Plant Protection' },
    { id: 5, name: 'Composting Tools' },
    { id: 6, name: 'Pots & Planters' },
    { id: 7, name: 'Gardening Accessories' },
    { id: 8, name: 'Soil & Fertilizers' },
    { id: 9, name: 'Garden Decor' },
];

const ratingsObj = [
    { id: 1, star: "★★★★★", rating: 5 },
    { id: 2, star: "★★★★☆", rating: 4, i: "& up" },
    { id: 3, star: "★★★☆☆", rating: 3, i: "& up" },
    { id: 4, star: "★★☆☆☆", rating: 2, i: "& up" },
    { id: 5, star: "★☆☆☆☆", rating: 1, i: "& up" },
]

const AllPlant = () => {
    const [visibleCount, setVisibleCount] = useState(6);
    const { filteredEquip, search, setSearch, equipName, setEquipName, ratings, setRatings, sortPrice, serSortPrice } = useContext(equipmentContext)
    const [wishlist, setWishlist] = useState(() => {
        const storedWishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
        return storedWishlist.map(item => item.id);
    });
    const [sidebarVisible, setSidebarVisible] = useState(false);
    const navigate = useNavigate();

    // Toggle sidebar visibility
    const toggleSidebar = () => {
        setSidebarVisible(!sidebarVisible);
    };

    const handleAddToCart = async (equipment) => {
        try {
            // Fetch the current cart data from the API
            const cartResponse = await axios.get('http://localhost:5000/cart');
            const cartItems = cartResponse.data;

            // Check if the plant is already in the cart
            const existingPlant = cartItems.find(item => item.id === equipment.id);

            if (existingPlant) {
                // If the plant is already in the cart, show an alert
                toast.error(`${equipment.name} is already in the cart!`,{duration:2000});
            } else {
                // If the plant is not in the cart, add it with quantity 1
                const addResponse = await axios.post('http://localhost:5000/cart', {
                    id: equipment.id,
                    name: equipment.name,
                    price: equipment.price,
                    quantity: 1, // Initialize the quantity to 1 when the plant is added to the cart
                    rating: equipment.rating,
                    reviews: equipment.reviews,
                    sellerName: equipment.sellerName,
                    availability: equipment.availability,
                    quantityAvailable: equipment.quantityAvailable,
                    categories: equipment.categories,
                    tags: equipment.tags,
                    primaryImage: equipment.primaryImage,
                    secondaryImages: equipment.secondaryImages,
                    shoppingPolicy: equipment.shoppingPolicy,
                    refundPolicy: equipment.refundPolicy
                });

                // Check if the plant was successfully added to the cart
                if (addResponse.status === 200 || addResponse.status === 201) {
                    toast.success(`${equipment.name} added to cart successfully!`,{duration:2000});
                    
                } else {
                    toast.warn  (`Failed to add ${equipment.name} to cart.`);
                }
            }
        } catch (error) {
            console.error('Error managing cart:', error);
            toast.warn('Something went wrong. Please try again.');
        }
    };

    const toggleWishlist = async (equip) => {
        try {
            let updatedWishlist = [...wishlist];
            const isWishlisted = wishlist.includes(equip.id);

            if (isWishlisted) {
                // Remove from wishlist
                const response = await axios.delete(`http://localhost:5000/wishlist/${equip.id}`);
                if (response.status === 200) {
                    updatedWishlist = updatedWishlist.filter((id) => id !== equip.id);
                    setWishlist(updatedWishlist);
                } else {
                    alert("Failed to remove from wishlist. Please try again.");
                }
            } else {
                // Check if item already exists in backend wishlist
                const { data: existingWishlist } = await axios.get("http://localhost:5000/wishlist");

                if (existingWishlist.some((item) => item.id === equip.id)) {
                    toast.info("This product is already in your wishlist!");
                    return;
                }

                // Add to wishlist
                const response = await axios.post('http://localhost:5000/wishlist', {
                    id: equip.id,
                    name: equip.name,
                    price: equip.price,
                    quantity: 1, // Initialize the quantity to 1 when the plant is added to the cart
                    rating: equip.rating,
                    reviews: equip.reviews,
                    sellerName: equip.sellerName,
                    availability: equip.availability,
                    quantityAvailable: equip.quantityAvailable,
                    categories: equip.categories,
                    tags: equip.tags,
                    primaryImage: equip.primaryImage,
                    secondaryImages: equip.secondaryImages,
                    shoppingPolicy: equip.shoppingPolicy,
                    refundPolicy: equip.refundPolicy,
                    type: "equipment"
                });

                if (response.status === 200 || response.status === 201) {
                    updatedWishlist.push(equip.id);
                    setWishlist(updatedWishlist);
                } else {
                    toast.error("Failed to add to wishlist. Please try again.");
                }
            }
        } catch (error) {
            console.error('Error updating wishlist:', error);
            toast.error('Something went wrong. Please try again.');
        }
    };

    useEffect(() => {
        const fetchWishlist = async () => {
            try {
                const response = await axios.get('http://localhost:5000/wishlist');
                if (response.status === 200) {
                    setWishlist(response.data.map(item => item.id));
                }
            } catch (error) {
                console.error('Error fetching wishlist:', error);
            }
        };

        fetchWishlist();
    }, []);

    const handleShowMore = () => {
        setVisibleCount((prevCount) => prevCount + 6);
    };

    const handleCategoryChange = (e) => {
        setEquipName(e.target.value);
    };

    const handleSortChange = (e) => {
        serSortPrice(e.target.value);
    };

    const handleRatings = (e) => {
        setRatings(e.target.value);
    };

    return (
        <div className="flex flex-col md:flex-row">
            {/* Toggle Button for Sidebar */}
            <button
                className="md:hidden bg-[#163020] text-white p-2 rounded mb-4 self-end m-2"
                onClick={toggleSidebar}
            >

                {sidebarVisible ? "Hide Filters" : "Show Filters"}
            </button>

            {/* Sidebar for Categories and Filters */}
            <div className={`w-full md:w-1/4 h-auto p-4 bg-slate-50 flex flex-col gap-8 ${sidebarVisible ? "block" : "hidden md:block"}`}>
                {/* Categories Section */}
                <div>
                    <h1 className="font-bold mb-2 text-xl">All Categories</h1>
                    <div className="max-h-96 overflow-y-auto custom-scrollbar bg-slate-50 p-3">
                        {equipmentName.map((val, i) => (
                            <div key={i} className="flex gap-2 p-2 ">
                                <input
                                    type="radio"
                                    id={val.name}
                                    name="name"
                                    value={val.name}
                                    onChange={handleCategoryChange}
                                    className="cursor-pointer"
                                />
                                <label htmlFor={val.name} className="cursor-pointer">
                                    {val.name}
                                </label>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Sort by Price Section */}
                <div className="flex flex-col gap-2 border-t border-gray-500 p-2">
                    <label htmlFor=" " className="text-xl font-semibold">Sort by Price</label>
                    <select
                        onChange={handleSortChange} 
                        className="text-lg cursor-pointer">
                        <option value="">Select</option>
                        <option value="low-to-high">Price: Low to High</option>
                        <option value="high-to-low">Price: High to Low</option>
                    </select>
                </div>

                {/* Ratings Section */}
                <div className="border-t border-gray-500">
                    <h1 className="font-bold mt-3 text-xl">Ratings</h1>
                    <div className="max-h-96 overflow-y-auto custom-scrollbar bg-slate-50 p-3">
                        {ratingsObj.map((val, i) => (
                            <div key={i} className="flex gap-2 p-2 ">
                                <input
                                    type="radio"
                                    id={val}
                                    name="rating"
                                    value={val.rating}
                                    onChange={handleRatings}
                                    className="cursor-pointer"
                                />
                                <label htmlFor={val.star} className="cursor-pointer">{val.star}</label>
                                <label htmlFor={val.rating}> {val.rating}.0 {val.i} </label>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="w-full md:w-3/4 p-4">
                <div className="flex justify-center items-center mb-4">
                    {/* Search */}
                    <div className="relative group  sm:block ">
                        <input
                            type="text"
                            onChange={(e) => { setSearch(e.target.value) }}
                            placeholder="search your plants"
                            className="w-[200px] sm:w-[200px] group-hover:w-[300px] transition-all duration-300 rounded-full border-2 border-gray-300 px-3 py-1 focus:outline-none focus:border-1 focus:border-primary dark:border-gray-500 dark:bg-white"
                        />
                        <IoMdSearch className="text-gray-500 absolute top-1/2 -translate-y-1/2 right-3" />
                    </div>
                </div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 justify-items-center">

                    {
                        filteredEquip.length === 0 ? (
                            <p className="text-xl text-gray-500 font-semibold col-span-full">No plants found. Please try a different category or filter.</p>
                        ) :
                            (filteredEquip.slice(0, visibleCount).map((equip, index) => (
                                <div
                                    key={index}
                                    className="relative p-2 w-[100%] h-[70vh] max-w-sm border flex flex-col items-start rounded-lg shadow-lg bg-white"
                                >
                                    {/* Sale Badge */}
                                    <div className="absolute top-5 left-3 bg-yellow-300 text-black text-xs font-semibold px-2 py-1 rounded">
                                        Sale!
                                    </div>

                                    {/* Wishlist Icon */}
                                    <div
                                        onClick={() => toggleWishlist(equip)}
                                        className="absolute top-5 right-5 cursor-pointer"
                                    >
                                        <FaHeart
                                            size={20}
                                            className={`${wishlist.includes(equip.id) ? "text-red-500" : "text-gray-400"
                                                } transition-colors duration-200`}
                                        />
                                    </div>

                                    <img
                                        onClick={() => navigate('/equipment-desc', { state: { equip } })}
                                        src={equip.primaryImage}
                                        alt={equip.name}
                                        className="w-[100%] h-[70%] rounded-lg shadow-lg object-contain cursor-pointer"
                                    />
                                    <h2 onClick={() => navigate('/equipment-desc', { state: { equip } })} className="text-lg font-semibold mt-4 cursor-pointer">{equip.name}</h2>
                                    <div className="flex items-center gap-2 mt-2">
                                        <p className="text-gray-500 line-through">₹{equip.price}</p>
                                        <p className="text-green-600 font-bold">
                                            ₹{equip.price}
                                        </p>
                                    </div>
                                    <div className="flex gap-3 items-center justify-between mt-1 w-full">
                                        <button
                                            onClick={() => handleAddToCart(equip)}
                                            className="px-2 py-1 bg-[#163020] text-white text-sm font-semibold rounded-md">
                                            Add To Cart
                                        </button>
                                        {/* <div className="text-2xl">{renderStars(plant.rating)}</div> */}
                                        <div className="text-2xl">{equip.rating}</div>
                                    </div>
                                </div>
                            )))}
                </div>
                {/* Show More Button */}
                {visibleCount < filteredEquip.length && (
                    <div className="flex justify-center mt-5">
                        <button
                            onClick={handleShowMore}
                            className="px-4 py-2 bg-blue-500 text-white text-sm font-semibold rounded-md"
                        >

                            Show More
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AllPlant;

