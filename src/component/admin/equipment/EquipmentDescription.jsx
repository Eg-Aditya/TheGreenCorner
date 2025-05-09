import React, { useContext, useEffect, useState } from 'react';
import { FaAngleRight, FaFaceFlushed, FaHeart, FaLifeRing, FaLocationPin, FaStar, FaThumbsDown } from 'react-icons/fa6';
import { Link, useLocation } from 'react-router-dom';

import leaf5 from '../../../assets/lightmode/leaf5.jpeg';
import { FaRegThumbsDown, FaRegThumbsUp } from 'react-icons/fa';
import axios from 'axios';
import toast from 'react-hot-toast';


const EquipmentDescription = () => {
  const location = useLocation(); 
  const { equip} = location.state // Access the plant data from state
  const [openDropdown, setOpenDropdown] = useState(null); // Tracks which dropdown is open
  const [selectedImage, setSelectedImage] = useState([0]);
  const [likes, setLikes] = useState();
  const [dislikes, setDisLikes] = useState()
  console.log("Received equipment:", equip);

  const handleAction = (type) => {
    if (type === "likes") {
      setLikes((prevLikes) => prevLikes + 1); // Increment likes
    } else if (type === "dislikes") {
      setDisLikes((prevDislikes) => prevDislikes + 1); // Increment dislikes
    }
  };

  const handleAddToCart = async (plant) => {
    try {
      // Fetch the current cart data from the API
      const cartResponse = await axios.get('http://localhost:5000/cart');
      const cartItems = cartResponse.data;

      // Check if the plant is already in the cart
      const existingPlant = cartItems.find(item => item.id === equip.id);

      if (existingPlant) {
        // If the plant is already in the cart, show an alert
        toast.error(`${equip.name} is already in the cart!`);
      } else {
        // If the plant is not in the cart, add it with quantity 1
        const addResponse = await axios.post('http://localhost:5000/cart', {
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
          type:"equipment"
        });

        // Check if the plant was successfully added to the cart
        if (addResponse.status === 200 || addResponse.status === 201) {
          toast.success(`${equipment.name} added to cart successfully!`);
        } else {
          toast.custom(`Failed to add ${equipment.name} to cart.`);
        }
      }
    } catch (error) {
      console.error('Error managing cart:', error);
      toast.error('Something went wrong. Please try again.');
    }
  };




  useEffect(() => {
    if (equip.secondaryImages && equip.secondaryImages.length > 0) {
      setSelectedImage(equip.secondaryImages[0]);
    }
  }, [equip.secondaryImages ]);

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span
        key={i}
        className={i < rating ? 'text-[#E36709]' : 'text-[#EDE8E7]'}
        style={{ fontSize: '20px', marginRight: '2px' }}
      >
        ★
      </span>
    ));
  };

  const getSunlightIcon = (type) => {
    switch (type) {
      case "Full Sun":
        return <img src={fullsun} alt="" style={{ borderRadius: "50%" }} />;
      case "Partial Shade":
        return <img src={sunset} alt="" style={{ borderRadius: "40%" }} />;// Partial Shade icon
      case "Indirect Light":
        return <img src={partial} alt="" style={{ borderRadius: "40%" }} />
      case "Bright, Indirect Light":
        return <img src="" alt="" />; // Indirect Light icon
      default:
        return <FaFaceFlushed className="text-gray-500 w-8 h-8" />; // Default icon
    }
  };

  return (
    <div className="flex flex-col justify-center items-center p-5 gap-5 mt-0">
      {/* First Section */}

      <div className="w-full flex  flex-col lg:flex-row gap-5 justify-center items-center">
        {/* Thumbnail Section */}
        <div className="flex lg:flex-col gap-3">
          {equip.secondaryImages.map((val, id) => {
            return (
              <div
                key={id}
                onMouseEnter={() => setSelectedImage(val)}
                className="w-20 h-20 border mt-3 border-gray-300 rounded-md overflow-hidden cursor-pointer hover:border-blue-500">
                <img src={val} alt="" className='object-cover ' />
              </div>
            )
          })}
        </div>

        {/* Main Display Section */}
        <div className="w-full lg:w-96 h-auto lg:h-[70vh] border rounded-md overflow-hidden flex justify-center items-center bg-gray-100">
          <img
            src={selectedImage}
            alt="Selected Product"
            className="w-[80%] h-auto lg:w-full lg:h-full object-contain"
          />
        </div>


        {/* Details Section */}
        <div className="w-full lg:w-[50%] h-auto lg:h-[70vh] border p-4 flex flex-col gap-4 bg-white rounded-lg">
          <p className="text-2xl lg:text-3xl font-bold mt-4">{equip.name}</p>
          <p className="flex">{renderStars(equip.rating)}</p>
          <h1 className='w-[50%]'>
            <p>Explore a wide variety of plants, from indoor favorites to outdoor gems.</p>
          </h1>
          <div className="flex gap-2">
            <p className="text-gray-600 font-semibold">
              <strike>₹{equip.price}</strike>
            </p>
            <p className="text-green-600 font-semibold">₹{equip.price}</p>
          </div>

          <div className="flex gap-6">
            <button
              onClick={() => handleAddToCart(equip)}
              className="text-center px-4 py-1 rounded-lg border bg-[#163020] text-white font-semibold border-black w-40">
              Add To Cart
            </button>
            <button className="text-center px-4 py-1 rounded-lg w-40 bg-[ ] font-semibold text-white">
              Buy Now
            </button>
          </div>

          <div className="flex flex-col gap-6 mt-2">
            <p>Check Delivery Availability</p>
            <div className="flex w-full md:w-6/12 items-center border rounded-md overflow-hidden">
              <span className="px-3 text-gray-500">
                <FaLocationPin />
              </span>
              <input
                placeholder="Enter pincode"
                type="text"
                className="flex-1 w-full border-none outline-none p-2"
              />
              <button className="bg-[#163020] text-white px-4 py-2 hover:bg-blue-600">Check</button>
            </div>
          </div>
        </div>
      </div>

      {/* Second Section */}
      <div className="w-full flex flex-col lg:flex-row items justify-between gap-5 mb-5">
        {/* Description */}
        <div className='w-[100%] flex flex-col gap-4'>
          {/* categories */}
          <div className="w-full flex gap-4">
            {/* Categories Section */}
            <div className="w-[40%] h-auto p-4 border flex flex-col gap-4 bg-[#F8F9F4] rounded-lg shadow-md">
              <div className="w-full">
                <h1 className="font-bold text-lg">Categories</h1>
                <ul className="mt-2">
                  {equip.categories.map((val, i) => (
                    <li key={i} className="text-gray-600 text-sm font-medium">
                      {val}
                    </li>
                  ))}
                </ul>

                <h1 className="font-bold text-lg mt-5">Stock</h1>
                <h1 className=' flex gap-5'>
                  <p className=" font-semibold">Availability</p>
                  <p c>{equip.availability}</p>
                </h1>
                <h1 className='flex gap-5'>
                  <p className=" font-semibold">Quantity Available</p>
                  <p>{equip.quantityAvailable}</p>
                </h1>

              </div>
            </div>

            {/* Sales Details Section */}
            <div  className="w-[60%] h-auto p-4 border bg-cover flex flex-col gap-0 bg-[#F8F9F4] rounded-lg shadow-md">
              <div className="w-full flex flex-col gap-2">
                <h1 className="font-bold text-lg">Last Month Sales Details</h1>
                <div>
                   <table  className="w-full text-left border-collapse" >
                    <tbody>
                        <tr className="border-b">
                            <td className="py-2 font-semibold">Seller Name</td>
                            <td className="py-2">{equip.seller.name}</td>
                        </tr>
                        <tr className="border-b">
                            <td className="py-2 font-semibold">Street</td>
                            <td className="py-2">{equip.seller.address.street}</td>
                        </tr>
                        <tr className="border-b">
                            <td className="py-2 font-semibold">City</td>
                            <td className="py-2">{equip.seller.address.city}</td>
                        </tr>
                        <tr className="border-b">
                            <td className="py-2 font-semibold">State</td>
                            <td className="py-2">{equip.seller.address.state}</td>
                        </tr>
                        <tr className="border-b">
                            <td className="py-2 font-semibold">Country</td>
                            <td className="py-2">{equip.seller.address.country}</td>
                        </tr>
                        <tr className="border-b">
                            <td className="py-2 font-semibold">Pincode</td>
                            <td className="py-2">{equip.seller.address.pincode}</td>
                        </tr>
                    </tbody>
                   </table>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className=" w-full lg:w-[100%] flex flex-col gap-4 relative">
        <div className="w-full lg:w-[100%] p-4 border flex flex-col gap-2 bg-[#F8F9F4] rounded-lg">
            <h1 className="font-bold text-lg">Description</h1>
            <p className="text-gray-600 text-sm font-medium">{equip.description}</p>
          </div>
          <div className="w-full max-w-2xl p-4 bg-[#F8F9F4] border rounded-lg relative">
            <div className="mt-4">
              <h2 className="font-semibold">Tags</h2>
              <div className="flex gap-2 flex-wrap mt-2">
                {equip.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 text-xs bg-green-200 text-green-800 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            
          </div>
          <div className='bg-[#F8F9F4] w-[100%] h-auto p-4 flex flex-col gap-2 border rounded-lg'>
            <div>
              <h1 className="font-bold text-lg">Shipping Policy</h1>
              <p className='text-gray-600 text-sm font-medium'>{equip.shippingPolicy}</p>
            </div>
            <div>
              <h1 className="font-bold text-lg">Refund Policy</h1>
              <p className='text-gray-600 text-sm font-medium'>{equip.refundPolicy}</p>
            </div>
          </div>
        </div>
      </div>
      {/* Reviews  */}
      <div className="w-full p-4 h-80 overflow-auto">
        <h1 className="text-3xl text-center font-bold">Reviews</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 p-2 gap-4">
          {equip.reviews.map((val, i) => (
            <div
             
              key={i}
              className="flex flex-col items-start gap-2 border bg-[#F8F9F4] rounded-lg p-3  relative shadow-md"
            >    
              <h1 className="text-gray-800 z-10 font-medium"><strong>Username:</strong> {val.username}</h1>
              <h1 className="text-gray-800 z-10 font-medium"><strong>Rating:</strong> {val.rating}</h1>
              <h1 className="text-gray-800 z-10 font-medium"><strong>Comment:</strong> {val.comment}</h1>
              <h1 className="text-gray-800 z-10 font-medium"><strong>DateTime</strong>: {val.dateTime}</h1>

              <div className="flex gap-4 z-10">
                <button onClick={() => handleAction(setLikes(likes + 1))} className="flex gap-2 text-gray-600 hover:text-blue-600">
                  <FaRegThumbsUp className="mt-1" /> {val.likes}
                </button>
                <button onClick={() => handleAction(setDisLikes(dislikes + 1))} className="flex gap-2 text-gray-600 hover:text-red-600">
                  <FaRegThumbsDown className="mt-1" />{val.dislikes}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EquipmentDescription;

