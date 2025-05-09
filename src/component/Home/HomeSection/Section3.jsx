import React, { useContext, useEffect, useRef, useState } from "react";
import { FaAngleRight, FaArrowRight, FaHeart } from "react-icons/fa"; // Import heart icon from react-icons
import Img1 from "../../../assets/plant/indoorplants.jpg";
import Img2 from "../../../assets/plant/alocasia-polly-plant.jpg";
import Img3 from "../../../assets/plant/peace-lily.png";
import { Link, useNavigate } from "react-router-dom";
import { plantContext } from "../../Context/AppContext";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import axios from "axios";
gsap.registerPlugin(ScrollTrigger);

const Section3 = () => {
  const [wishlist, setWishlist] = useState([false, false, false]); // Tracks wishlist status for each plant
   const {allPlant} = useContext(plantContext);
   const navigate = useNavigate();

  const plantData= allPlant.slice(12,15) 

  const sectionRef = useRef(null);
  useEffect(() => {
    const elements = sectionRef.current.children;  
    
    gsap.fromTo(
      elements, 
      { opacity: 0, y: 100 },
      {
        opacity: 1,
        y: 0,
        duration: 1.3,
        stagger: 0.3,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current, // Corrected trigger
          start: "top 85%", // Adjusted trigger point
          toggleActions: "restart none none none", // Prevent repeated animations
        },
      }
    );
  });
  
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
            alert(`${plant.name} is already in the cart!`);
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


  const renderStars = (rating) => {
    const fullStars = Math.floor(rating); // Full stars
    const halfStar = rating % 1 >= 0.5; // Half star if the remainder is ≥ 0.5
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0); // Remaining empty stars

    return (
      <div className="flex">
        {[...Array(fullStars)].map((_, index) => (
          <span key={`full-${index}`} className="text-yellow-500">★</span>
        ))}
        {halfStar && <span className="text-yellow-500">☆</span>}
        {[...Array(emptyStars)].map((_, index) => (
          <span key={`empty-${index}`} className="text-gray-400">★</span>
        ))}
      </div>
    );
  };

  const toggleWishlist = (index) => {
    const updatedWishlist = [...wishlist];
    updatedWishlist[index] = !updatedWishlist[index];
    setWishlist(updatedWishlist);
  };

  return (
    <div className="p-4 m-4">
      <h1 className="text-2xl font-bold mb-6 text-center">Best Seller Products</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 justify-items-center" ref={sectionRef}>
        {plantData.map((plant, index) => (
          <div
            key={index}
            className="relative p-2 w-full max-w-sm border flex flex-col items-start rounded-lg shadow-lg bg-white"
          >
            {/* Sale Badge */}
            <div className="absolute top-5 left-3 bg-yellow-300 text-black text-xs font-semibold px-2 py-1 rounded">
              Sale!
            </div>

            {/* Wishlist Icon */}
            <div
              onClick={() => toggleWishlist(index)}
              className="absolute top-5 right-5 cursor-pointer"
            >
              <FaHeart
                size={20}
                className={`${
                  wishlist[index] ? "text-red-500" : "text-gray-400"
                } transition-colors duration-200`}
              />
            </div>

            <img
              src={plant.primaryImage}
              alt={plant.plantName}
              onClick={() => navigate('/plant-desc', { state: { plant: plant } })}
              className="w-full h-[70%] rounded-lg shadow-lg object-cover cursor-pointer"
            />
            <h2 className="text-lg font-semibold mt-4">{plant.name}</h2>
            <div className="flex items-center gap-2 mt-2">
              <p className="text-gray-500 line-through">₹{plant.price}</p>
              <p className="text-green-600 font-bold">₹{plant.price}</p>
            </div>
            <div className="flex gap-3 items-center justify-between mt-1 w-full">
              <button 
              onClick={() => handleAddToCart(plant)}
              className="px-2 py-1 bg-[#163020] text-white text-sm font-semibold rounded-md">
                Add To Cart
              </button>
              <div className="text-2xl">{renderStars(plant.rating)}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex w-full h-[10vh] mt-10  items-center justify-center">
        <button className="flex h-[70%] items-center justify-center shadow-md  text-xl px-6 py-2 bg-[#163020] text-white rounded-md gap-1"> <Link to='/navbar/allplant'>Explore more </Link> <FaAngleRight className="mt-1"/> </button>
      </div>
    </div>
  );
};

export default Section3;
