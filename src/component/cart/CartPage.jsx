import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { FaTrash } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import cartImage from '../../assets/lightmode/cart2.PNG';
import { plantContext } from '../Context/AppContext';

const CartPage = () => {
    // const [cartItems, setCartItems] = useState([]);
    const{cartItems, setCartItems,isLoggedIn, setIsLoggedIn} = useContext(plantContext)
    const [subtotal, setSubtotal] = useState(0);
    const [totalItems, setTotalItems] = useState(0);
    const [gstAmounts, setGstAmount] = useState(0);
    const [itemToRemove, setItemToRemove] = useState(null);
    const shippingCharges = 50;
    const navigate = useNavigate();
    useEffect(() => {
        if (!isLoggedIn) {
            navigate('/')
        }
    }, [isLoggedIn])

    useEffect(() => {
        // Fetch cart data from the server
        axios.get('http://localhost:5000/cart') // Replace with your API endpoint
            .then(response => {
                const data = response.data;
                
                // Sanitize cart data: ensure quantity is always a number and is set to 1 if missing
                const sanitizedCart = data.map(item => ({
                    ...item,
                    price: Number(item.price) || 0,
                    quantity: Number(item.quantity) || 1, // Set default quantity to 1 if missing
                }));
                setCartItems(sanitizedCart);
                // Calculate totals
                updateCartTotals(sanitizedCart);
            })
            .catch(error => {
                console.error("Error fetching cart data:", error);
            });
    }, []);
    
    const GST_RATE = 0.05;

    // Update the cart totals (subtotal and total items)
    const updateCartTotals = (cart) => {
        const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
        const totalQty = cart.reduce((count, item) => count + item.quantity, 0);
        const gstAmount = total * GST_RATE;
        setSubtotal(total);
        setTotalItems(totalQty);
        setGstAmount(gstAmount)
    };

    const handleQuantityChange = (id, type) => {
        const updatedCart = cartItems.map(item => {
            if (item.id === id) {
                if (type === 'increment') {
                    item.quantity += 1;
                } else if (type === 'decrement' && item.quantity > 1) {
                    item.quantity -= 1;
                }
            }
            return item;
        });

        setCartItems(updatedCart);
        updateCartTotals(updatedCart);
        updateCartOnServer(updatedCart); // Send updated cart data to the server
    };

    const updateCartOnServer = async (updatedCart) => {
        try {
            // Update the cart on the server with the new quantities
            await axios.put('http://localhost:5000/cart', updatedCart);
        } catch (error) {
            console.error("Error updating cart:", error);
        }
    };

    const removeItemFromCart = async () => {
        try {
            await axios.delete(`http://localhost:5000/cart/${itemToRemove}`); // Remove item from server
            const updatedCart = cartItems.filter(item => item.id !== itemToRemove);
            setCartItems(updatedCart);
            updateCartTotals(updatedCart);
            setItemToRemove(null);
        } catch (error) {
            console.error("Error removing item from cart:", error);
        }
    };

    const total = subtotal+ gstAmounts + shippingCharges; // Final total with shipping charges
    const uniqueProducts = cartItems.length;

    return (
       isLoggedIn ?  <div className="p-4">
       {uniqueProducts === 0 ? (
           <div className="flex flex-col h-auto gap-2 justify-center items-center">
               <img src={cartImage} className='object-cover w-60 h-60' alt="Empty Cart" />
               <h1 className='text-xl lg:text-2xl'>Your cart is empty!</h1>
               <button className="bg-[#163020] text-white py-2 px-4 rounded-lg font-semibold hover:bg-green-700">
                   <Link to="/navbar/allplant">Shop Now</Link>
               </button>
           </div>
       ) : (
           <div>
               <h1 className="text-2xl font-bold mb-4">Cart ({uniqueProducts} {uniqueProducts === 1 ? 'product' : 'products'})</h1>
               <div className="flex flex-col lg:flex-row gap-6">
                   <div className="flex-1">
                       <table className="w-full border-collapse">
                           <thead>
                               <tr>
                                   <th className="bg-[#F8F8F8] text-sm lg:text-base lg:p-2 text-left">Product</th>
                                   <th className="bg-[#F8F8F8] text-sm lg:text-base lg:p-2">Price</th>
                                   <th className="bg-[#F8F8F8] text-sm lg:text-base lg:p-2">Qty</th>
                                   <th className="bg-[#F8F8F8] text-sm lg:text-base lg:p-2">Subtotal</th>
                                   <th className="bg-[#F8F8F8] text-sm lg:text-base lg:p-2">Action</th>
                               </tr>
                           </thead>
                           <tbody>
                               {cartItems.map(item => (
                                   <tr key={item.id} className='border-t-2 border-[#F8F8F8]'>
                                       <td className="w-28 bg-orange-100 h-32 flex items-center gap-3">
                                           <img src={item.primaryImage} alt={item.name} className="w-[100%] h-[100%] object-cover rounded-md cursor-pointer    " 
                                               onClick={() => navigate('/plant-desc', { state: { plant: item } })}
                                                />
                                       </td>
                                       <td className="p-2 text-center">₹{item.price}</td>
                                       <td className="p-2 text-center">
                                           <div className="flex justify-center items-center gap-2">
                                               <button onClick={() => handleQuantityChange(item.id, 'decrement')} className="lg:px-2 lg:py-1 px-1 py-1 bg-gray-300 rounded-md">-</button>
                                               <span>{item.quantity}</span>
                                               <button onClick={() => handleQuantityChange(item.id, 'increment')} className="lg:px-2 lg:py-1 px-1 py-1 bg-gray-300 rounded-md">+</button>
                                           </div>
                                       </td>
                                       <td className="lg:p-1 text-sm text-center">₹{(item.price * item.quantity).toFixed(2)}</td>
                                       <td className="lg:p-1 text-sm text-center">
                                           <button onClick={() => setItemToRemove(item.id)} className="text-red-500 hover:underline">
                                               <FaTrash />
                                           </button>
                                       </td>
                                   </tr>
                               ))}
                           </tbody>
                       </table>
                   </div>
                   <div className="w-full lg:w-1/3 h-auto bg-[#F8F8F8] border border-gray-200 flex flex-col p-4 gap-3 rounded-lg shadow-md">
                       <h2 className="text-xl font-semibold mb-4">Cart Totals</h2>
                       <div className="flex justify-between mb-2"><p><strong>Subtotal</strong></p><p>₹{subtotal.toFixed(2)}</p></div>
                       <div className="flex justify-between mb-2"><p><strong>Total Items</strong></p><p>{totalItems}</p></div>
                       <div className="flex justify-between mb-2"><p><strong>Total Product</strong></p><p>{uniqueProducts}</p></div>
                       <div className="flex justify-between mb-2"><p><strong>Shipping Charges</strong></p><p>₹{shippingCharges}</p></div>
                       <div className="flex justify-between mb-2"><p><strong>5% GST Charges</strong></p><p>₹{gstAmounts}</p></div>
                       <hr className="my-2" />
                       <div className="flex justify-between text-lg font-bold mb-4"><p>Total</p><p>₹{total.toFixed(2)}</p></div>
                       <button className="w-full bg-[#163020] text-white py-2 rounded-lg font-semibold hover:bg-green-700" onClick={() => navigate('/checkout', { state: { subtotal, totalItems, uniqueProducts,shippingCharges, total, gstAmounts, cartItems } })}>
                           Proceed to Checkout
                       </button>
                   </div>
               </div>
           </div>
       )}

       {itemToRemove && (
           <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
               <div className="bg-white p-6 rounded-lg shadow-lg gap-3 flex flex-col">
                   <h2 className='font-medium'>Are you sure you want to remove this item?</h2>
                  <div className=' flex items-center gap-5 justify-end'>
                  <button className='px-3 bg-blue-500 rounded-md text-center py-1 text-white font-semibold' onClick={() => setItemToRemove(null)}>Cancel</button>
                  <button className='px-3 bg-red-500 rounded-md text-center py-1 text-white font-semibold' onClick={removeItemFromCart}>Remove</button>
                  </div>
               </div>
           </div>
       )}
   </div> : null
    );
};

export default CartPage;
