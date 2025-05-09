import React, { useState, useEffect, useContext } from 'react';
import { FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { plantContext } from '../Context/AppContext';
import { equipmentContext } from '../Context/EquipmentsContext';
import toast from 'react-hot-toast';

const Wishlist = () => {
    const navigate = useNavigate();
    const {  plant, isLoggedIn, setIsLoggedIn } = useContext(plantContext);
    const {equip} = useContext(equipmentContext)
    const [wishlist, setWishlist] = useState([]);

    useEffect(() => {
            if (!isLoggedIn) {
                navigate('/')
            }
        }, [isLoggedIn])

    // Fetch wishlist data from API when the component mounts
    useEffect(() => {
        const fetchWishlist = async () => {
            try {
                const response = await axios.get('http://localhost:5000/wishlist');
                if (response.status === 200) {
                    setWishlist(response.data); // Assuming API returns an array of wishlist items
                }
            } catch (error) {
                console.error('Error fetching wishlist:', error);
            }
        };

        fetchWishlist();
    }, []);

    // Remove item from wishlist via API
    const handleRemoveFromWishlist = async (id) => {
        try {
            const response = await axios.delete(`http://localhost:5000/wishlist/${id}`);
            if (response.status === 200) {
                setWishlist(wishlist.filter((item) => item.id !== id));
            }
        } catch (error) {
            console.error('Error removing from wishlist:', error);
            toast.error('Something went wrong. Please try again.');
        }
    };

    // Add to cart
    const handleAddToCart = async (plant) => {
        try {
            // Fetch the current cart data from the API
            const cartResponse = await axios.get('http://localhost:5000/cart');
            const cartItems = cartResponse.data;
    
            // Check if the plant is already in the cart
            const existingPlant = cartItems.find(item => item.id === plant.id);
    
            if (existingPlant) {
                // If the plant is already in the cart, show an alert
                toast.error(`${plant.name} is already in the cart!`);
            } else {
                // If the plant is not in the cart, add it with quantity 1
                const addResponse = await axios.post('http://localhost:5000/cart', {
                    id: plant.id,
                    name: plant.name,
                    price: plant.price,
                    discountPrice: plant.discountPrice,
                    quantity: 1, // Initialize the quantity to 1 when the plant is added to the cart
                    rating: plant.rating,
                    reviews: plant.reviews,
                    totalSalesLastMonth:plant.totalSalesLastMonth ,
                    sellerName: plant.sellerName,
                    availability: plant.availability,
                    quantityAvailable: plant.quantityAvailable,
                    categories: plant.categories,
                    sunlightRequirement: plant.sunlightRequirement,
                    moistureRequirement: plant.moistureRequirement,
                    soilType: plant.soilType,
                    season: plant.season,
                    growthRate: plant.growthRate,
                    potSizeRequired: plant.potSizeRequired,
                    genus: plant.genus,
                    localName: plant.localName,
                    regionalName: plant.regionalName,
                    biologicalName: plant.biologicalName,
                    botanicalName: plant.botanicalName,
                    tags: plant.tags,
                    shippingStates: plant.shippingStates,
                    primaryImage: plant.primaryImage,
                    secondaryImages: plant.secondaryImages,
                    shoppingPolicy: plant.shoppingPolicy,
                    refundPolicy: plant.refundPolicy
                });
    
                // Check if the plant was successfully added to the cart
                if (addResponse.status === 200 || addResponse.status === 201) {
                    toast.success(`${plant.name} added to cart successfully!`);
                    await handleRemoveFromWishlist(plant.id);
                } else {
                    toast.error(`Failed to add ${plant.name} to cart.`);
                }
            }
        } catch (error) {
            console.error('Error managing cart:', error);
            toast.info('Something went wrong. Please try again.');
        }
    };

    return (
        isLoggedIn ? <div className="p-4">
        <h2 className="text-2xl font-bold mb-4">Your Wishlist</h2>
        {wishlist.length === 0 ? (
            <p>Your wishlist is empty.</p>
        ) : (
            <div className="grid gap-6 md:grid-cols-2  lg:grid-cols-5 justify-items-center">
                {wishlist.map((plant) => (
                    <div
                        key={plant.id}
                        className="relative p-2 w-[100%] h-auto max-w-sm border flex flex-col items-start rounded-lg shadow-lg bg-white"
                    >
                        <img
                           onClick={() => 
                            navigate(
                                plant.type === 'equipment' ? '/equipment-desc' : '/plant-desc', 
                                { state: plant.type === 'equipment' ? { equip } : { plant } }
                            )
                        }
                        
                            src={plant.primaryImage}
                            alt={plant.name}
                            className="w-[100%] h-[70%] rounded-lg shadow-lg object-contain cursor-pointer"
                        />
                        <h2 className="text-lg font-semibold mt-4">{plant.name}</h2>
                        <h1 className='font-medium'>Rating : {plant.rating}</h1>
                        <div className="flex items-center gap-2 mt-1">
                            <p className="text-gray-500 line-through">₹{plant.price}</p>
                            <p className="text-green-600 font-bold">₹{plant.discountPrice}</p>
                        </div>
                       <div className=' w-full flex justify-between items-center'>
                       <button
                            onClick={() => handleRemoveFromWishlist(plant.id)}
                            className="mt-4 px-2 py-1 bg-red-600 text-white text-sm font-semibold rounded-md flex items-center gap-1"
                        >
                            {/* <FaTrash /> */}
                            Remove
                        </button>
                        <button
                        onClick={() => handleAddToCart(plant)}
                        className="mt-4 px-2 py-1 bg-[#163020] text-white text-sm font-semibold rounded-md flex items-center gap-1"
                        >
                            Add To Cart
                            </button>
                       </div>
                    </div>
                ))}
            </div>
        )}
    </div> : null
    );
};

export default Wishlist;