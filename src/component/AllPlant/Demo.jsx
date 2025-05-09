import React, { useContext, useEffect, useState } from 'react';
import { plantContext } from '../Context/AppContext';
import { FaHeart } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { IoMdSearch } from 'react-icons/io';
import axios, { all } from 'axios';

const plantCategories = [
    // { id: 1, category: 'All Categories' },
    { id: 1, category: 'Air Purifying' },
    { id: 2, category: 'Ayurvedic Plants' },
    { id: 3, category: 'Balcony Plants' },
    { id: 4, category: 'Bedroom' },
    { id: 5, category: 'Bonsai' },
    { id: 6, category: 'Culinary Plants' },
    { id: 7, category: 'Decorative Plants' },
    { id: 8, category: 'Easy Care Plants' },
    { id: 9, category: 'Easy to Grow' },
    { id: 10, category: 'Exotic Plants' },
    { id: 11, category: 'Ferns' },
    { id: 12, category: 'Flowering Plants' },
    { id: 13, category: 'Fragrant Plants' },
    { id: 14, category: 'Garden Beautification' },
    { id: 15, category: 'Gift Ideas' },
    { id: 16, category: 'Gift Plants' },
    { id: 17, category: 'Herbal' },
    { id: 18, category: 'Home Decor' },
    { id: 19, category: 'House Plants' },
    { id: 20, category: 'House Warming' },
    { id: 21, category: 'Indoor Plants' },
    { id: 22, category: 'Kitchen Garden' },
    { id: 23, category: 'Living Room' },
    { id: 24, category: 'Low Maintenance' },
    { id: 25, category: 'Lucky Plants' },
    { id: 26, category: 'Medicinal Plants' },
    { id: 27, category: 'Office' },
    { id: 28, category: 'Office Plants' },
    { id: 29, category: 'Outdoor Plants' },
    { id: 30, category: 'Patio' },
    { id: 31, category: 'Positive Energy' }
];

const ratingsObj = [
    { id: 1, star: "★★★★★", rating: 5 },
    { id: 2, star: "★★★★☆", rating: 4, i:"& up"},
    { id: 3, star: "★★★☆☆", rating: 3, i:"& up"},
    { id: 4, star: "★★☆☆☆", rating: 2, i:"& up"},
    { id: 5, star: "★☆☆☆☆", rating: 1, i:"& up"},
]

const AllPlant = () => {
    const [visibleCount, setVisibleCount] = useState(6);
    const { filteredPlant, allPlant, setCategories, categories, setSortPrice, sortPrice, setRatings, ratings } = useContext(plantContext);
    console.log(ratings);
    let { setSearch } = useContext(plantContext)



    const [wishlist, setWishlist] = useState(() => {
        const storedWishlist = JSON.parse(localStorage.getItem('wishlist')) || [];

        return storedWishlist.map(item => item.id);
    });
    const navigate = useNavigate();

    //add to cart
    const handleAddToCart = async (plant) => {
        try {
            // Step 1: Fetch current cart items
            const cartResponse = await axios.get('http://localhost:4343/cart');
            const cartItems = cartResponse.data;

            // Step 2: Check if the plant is already in the cart
            const existingPlant = cartItems.find(item => item.plantId === plant.id);

            if (existingPlant) {
                // If the plant is already in the cart, show an alert
                alert(`${plant.name} is already in the cart!`);
            } else {
                // If the plant is not in the cart, add it
                const addResponse = await axios.post('http://localhost:4343/cart', {
                    plantId: plant.id,
                    name: plant.name,
                    price: plant.price,
                    image: plant.secondaryImages,
                    quantity: 1 // Default quantity as 1
                });

                if (addResponse.status === 200 || addResponse.status === 201) {
                    alert(`${plant.name} added to cart successfully!`);
                } else {
                    alert(`Failed to add ${plant.name} to cart.`);
                }
            }
        } catch (error) {
            console.error('Error managing cart:', error);
            alert('Something went wrong. Please try again.');
        }
    };


    //whislist
    const toggleWishlist = async (plant) => {
        try {
            let updatedWishlist = [...wishlist];
            const isWishlisted = wishlist.includes(plant.id);

            if (isWishlisted) {
                const response = await axios.delete(`http://localhost:3000/wishlist/${plant.id}`);
                if (response.status === 200) {
                    updatedWishlist = updatedWishlist.filter((id) => id !== plant.id);
                }
            } else {
                // Add to wishlist via API
                const response = await axios.post('http://localhost:3000/wishlist', {
                    plantId: plant.id,
                    name: plant.name,
                    price: plant.price,
                    image: plant.primaryImage,
                    rating: plant.rating
                });

                if (response.status === 200 || response.status === 201) {
                    updatedWishlist.push(plant.id);
                }
            }

            setWishlist(updatedWishlist);
        } catch (error) {
            console.error('Error updating wishlist:', error);
            alert('Something went wrong. Please try again.');
        }
    };

    useEffect(() => {
        const fetchWishlist = async () => {
            try {
                const response = await axios.get('http://localhost:3000/wishlist');
                if (response.status === 200) {
                    setWishlist(response.data.map(item => item.plantId));
                }
            } catch (error) {
                console.error('Error fetching wishlist:', error);
            }
        };

        fetchWishlist();
    }, []);



    //reviews
    // const renderStars = (rating) => {
    //     // Round the rating to 4 if it's less than 4.5
    //     const adjustedRating = rating < 4.5 ? 4 : rating || rating < 3.5 ? 3 : rating 
    
    
    //     // Generate the stars array based on the adjusted rating
    //     const stars = Array.from({ length: 5 }, (_, i) => (i < adjustedRating ? '★' : '☆'));
    
    //     return stars.join('');
    // };

    const handleShowMore = () => {
        setVisibleCount((prevCount) => prevCount + 6);
    };

    const handleCategoryChange = (e) => {
        setCategories(e.target.value)
    }


    const handleSortChange = (e) => {
        setSortPrice(e.target.value);
    };

    const handleRatings = (e) => {
        setRatings(e.target.value);
    };


    if (!Array.isArray(allPlant)) {
        return <p>Error: Plant data is unavailable or not an array.</p>;
    }

    return (
        <div className="flex">
            {/* Sidebar for Categories and Filters */}
            <div className="w-1/4 h-auto p-4 bg-slate-50 flex flex-col gap-8">
                <div>
                    <h1 className=' font-bold mb-2 text-xl '>All Categories</h1>
                    <div className="max-h-96 overflow-y-auto custom-scrollbar bg-slate-50 p-3">
                        {plantCategories.map((val, i) => {
                            return (
                                <div key={i} className="flex gap-2 p-2 ">
                                    <input
                                        type="radio"
                                        id={val.category}
                                        name="category"
                                        value={val.category}
                                        onChange={handleCategoryChange}
                                        className="cursor-pointer"
                                    />
                                    <label htmlFor={val.category} className="cursor-pointer">
                                        {val.category}
                                    </label>
                                </div>
                            );
                        })}
                    </div>
                </div>
                <div className=' flex flex-col gap-2 border-t  border-gray-500 p-2'>
                    <label htmlFor=" " className='text-xl font-semibold'>Sort by Price</label>
                    <select onChange={handleSortChange} className='text-lg cursor-pointer'>
                        <option value="">Select</option>
                        <option value="low-to-high">Price: Low to High</option>
                        <option value="high-to-low">Price: High to Low</option>
                    </select>
                </div>

                <div className='border-t  border-gray-500'>
                    <h1 className=' font-bold mt-3 text-xl '>Ratings</h1>
                    <div className="max-h-96 overflow-y-auto custom-scrollbar bg-slate-50 p-3">
                        {ratingsObj.map((val, i) => {
                            return (
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
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="w-3/4 p-4">
                <div className="flex justify-center items-center mb-4 ">
                    {/* Search */}
                <div className="relative group hidden sm:block ">
                           <input
                                type="text"
                                onChange={(e) => { setSearch(e.target.value) }}
                                placeholder="search your plants"
                                className="w-[200px] sm:w-[200px] group-hover:w-[300px] transition-all duration-300 rounded-full border-2 border-gray-300 px-3 py-1 focus:outline-none focus:border-1 focus:border-primary dark:border-gray-500 dark:bg-white  " />
                            <IoMdSearch className="text-gray-500  absolute top-1/2 -translate-y-1/2 right-3" />
                        </div>

                </div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 justify-items-center">

                    {
                        filteredPlant.length === 0 ? (
                            <p className="text-xl text-gray-500 font-semibold col-span-full">No plants found. Please try a different category or filter.</p>
                        ) :
                            (filteredPlant.slice(0, visibleCount).map((plant, index) => (
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
                                        onClick={() => toggleWishlist(plant)}
                                        className="absolute top-5 right-5 cursor-pointer"
                                    >
                                        <FaHeart
                                            size={20}
                                            className={`${wishlist.includes(plant.id) ? "text-red-500" : "text-gray-400"
                                                } transition-colors duration-200`}
                                        />
                                    </div>

                                    <img
                                        onClick={() => navigate('/plant-desc', { state: { plant: plant } })}
                                        src={plant.primaryImage}
                                        alt={plant.name}
                                        className="w-[100%] h-[70%] rounded-lg shadow-lg object-contain cursor-pointer"
                                    />
                                    <h2 onClick={() => navigate('/plant-desc', { state: { plant } })} className="text-lg font-semibold mt-4 cursor-pointer">{plant.name}</h2>
                                    <div className="flex items-center gap-2 mt-2">
                                        <p className="text-gray-500 line-through">₹{plant.price}</p>
                                        <p className="text-green-600 font-bold">
                                            ₹{plant.discountPrice}
                                        </p>
                                    </div>
                                    <div className="flex gap-3 items-center justify-between mt-1 w-full">
                                        <button
                                            onClick={() => handleAddToCart(plant)}
                                            className="px-2 py-1 bg-[#163020] text-white text-sm font-semibold rounded-md">
                                            Add To Cart
                                        </button>
                                        {/* <div className="text-2xl">{renderStars(plant.rating)}</div> */}
                                        <div className="text-2xl">{plant.rating}</div>
                                    </div>
                                </div>
                            )))}
                </div>

                {/* Show More Button */}
                {visibleCount < filteredPlant.length && (
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