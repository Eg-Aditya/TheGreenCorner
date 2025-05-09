// import axios from 'axios';
// import React, { useContext, useEffect, useState } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import { plantContext } from '../Context/AppContext';
// import phonepay from "../../assets/lightmode/phonepay.jpeg";
// import paytm from "../../assets/lightmode/paytm.png";
// import googlepay from "../../assets/lightmode/google-pay-1.svg";

// const CheckOutPages = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const [user, setUser] = useState([])
//   const [order, setOrder] = useState([]);
//   const { userDetails, isLoggedIn, setIsLoggedIn } = useContext(plantContext);
//   const [state, setState] = useState({
//     country: "",
//     firstName: "",
//     lastName: "",
//     address: "",
//     state: "",
//     city: "",
//     pincode: "",
//     contact: "",
//     phonePay: false,
//     googlePay: false,
//     paytm: false,
//     cashOnDelivery: false,
//   });

//   useEffect(() => {
//     if (!isLoggedIn) {
//       navigate('/')
//     }
//   }, [isLoggedIn])

//   axios.get('http://localhost:5000/order').then((resp) => {
//     setOrder(resp.data)
//   }, [])

//   const {
//     subtotal = 0,
//     uniqueProducts = 0,
//     totalItems = 0,
//     shippingCharges = 0,
//     total = 0,
//   } = location.state || {};

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log("Order placed:", state);
//   }

//   const handleChange = (name, value) => {
//     setState((prevState) => ({
//       ...prevState,
//       [name]: value,
//     }));
//   };



//   return (
//     isLoggedIn ? <div className="w-full h-auto flex flex-col sm:flex-row lg:flex-row gap-2 mt-10 p-2">
//       {/* Left Section */}
//       <div className="w-[100%] lg:w-[70%] h-full flex flex-col gap-6 p-6 shadow-xl border rounded-lg">
//         {/* Account Section */}
//         <form onSubmit={handleSubmit} action="" className='h-full flex flex-col gap-6 '>
//           <div className="flex flex-col gap-2">
//             <h1 className="font-semibold text-gray-800">Account</h1>
//             <p className="font-semibold">{userDetails.email}</p>
//           </div>
//           <hr />

//           {/* Delivery Section */}
//           <div className="flex flex-col gap-4">
//             <h1 className="text-lg font-semibold text-gray-800">Delivery</h1>
//             <div>
//               <input
//                 type="text"
//                 placeholder="Country"
//                 required
//                 name="country"
//                 value={state.country}
//                 onChange={(e) => handleChange("country", e.target.value)}
//                 className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
//               />
//             </div>

//             <div className="flex gap-4">
//               <input
//                 type="text"
//                 placeholder="First Name"
//                 name="firstName"
//                 value={state.firstName}
//                 onChange={(e) => handleChange("firstName", e.target.value)}
//                 className="w-1/2 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
//               />
//               <input
//                 type="text"
//                 placeholder="Last Name"
//                 name="lastName"
//                 value={state.lastName}
//                 onChange={(e) => handleChange("lastName", e.target.value)}
//                 className="w-1/2 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
//               />
//             </div>

//             <div>
//               <input
//                 type="text"
//                 placeholder="Address"
//                 name="address"
//                 value={state.address}
//                 onChange={(e) => handleChange("address", e.target.value)}
//                 className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
//               />
//             </div>

//             <div className="flex gap-4">
//               <input
//                 type="text"
//                 placeholder="State"
//                 name="state"
//                 value={state.state}
//                 onChange={(e) => handleChange("state", e.target.value)}
//                 className="w-1/3 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
//               />
//               <input
//                 type="text"
//                 placeholder="City"
//                 name="city"
//                 value={state.city}
//                 onChange={(e) => handleChange("city", e.target.value)}
//                 className="w-1/3 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
//               />
//               <input
//                 type="text"
//                 placeholder="Pincode"
//                 name="pincode"
//                 value={state.pincode}
//                 onChange={(e) => handleChange("pincode", e.target.value)}
//                 className="w-1/3 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
//               />
//             </div>
//             <input
//               type="text"
//               placeholder="Phone"
//               name="contact"
//               value={state.contact}
//               onChange={(e) => handleChange("contact", e.target.value)}
//               className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
//             />
//           </div>

//           {/* Shipping Method Section */}
//           <div className="flex flex-col gap-2">
//             <h1 className="text-lg font-semibold text-gray-800">Shipping Method</h1>
//             <input
//               type="text"
//               name='shippingCharges'
//               value={shippingCharges}
//               onChange={(e) => handleChange("shippingCharges", e.target.value)}
//               className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
//               readOnly
//             />
//           </div>

//           {/* Payment Section */}
//           <div className="flex flex-col gap-3">
//             <h1 className="text-lg font-semibold text-gray-800">Payment</h1>
//             <p className="text-gray-600">All transactions are secure and encrypted.</p>
//             <div className='flex  gap-8 items-center'>
//               <div className='flex'>
//                 <input
//                   type="checkbox"
//                   name='phonePay'
//                   value={state.phonePay}
//                   onChange={(e) => handleChange("phonePay", e.target.checked)}
//                 />
//                 <label htmlFor=""> <img src={phonepay} alt='PhonePay' className='w-16' /></label>
//               </div>
//               <div className='flex gap-2'>
//                 <input
//                   type="checkbox"
//                   name='googlePay'
//                   value={state.googlePay}
//                   onChange={(e) => handleChange("googlePay", e.target.checked)}
//                 />
//                 <label htmlFor=""> <img src={googlepay} alt='PhonePay' className='w-12' /></label>
//               </div>
//               <div className='flex gap-2'>
//                 <input
//                   type="checkbox"
//                   name='paytm'
//                   value={state.paytm}
//                   onChange={(e) => handleChange("paytm", e.target.checked)}
//                 />
//                 <label htmlFor=""> <img src={paytm} alt='PhonePay' className='w-12' /></label>
//               </div>
//               <div className='flex gap-2'>
//                 <input
//                   type="checkbox"
//                   name='cashOnDellivery'
//                   value={state.cashOnDellivery}
//                   onChange={(e) => handleChange("cashOnDellivery", e.target.checked)}
//                 />
//                 <label htmlFor=""> Cash On Delivery </label>
//               </div>
//             </div>
//           </div>

//           {/* Billing Address Section */}
//           <div className="flex flex-col gap-2">
//             <h1 className="text-lg font-semibold text-gray-800">Billing Address</h1>
//             <p className="text-gray-600">All transactions are secure and encrypted.</p>
//             <div className='flex gap-2'>
//               <input
//                 type="checkbox"
//                 placeholder="Same as Shipping Address"
//                 name='shippingCharges'
//                 value={shippingCharges}
//                 onChange={(e) => handleChange("billingAdress", e.target.checked)}

//               />
//               <label htmlFor="Shhiping addrerss" className='text-xl'>Same as Shipping Address</label>
//             </div>
//           </div>
//           <button
//           type='submit'
//             className="w-full bg-[#163020] text-white py-2 rounded-lg font-semibold hover:bg-[#163040] transition-all"
//             onClick={() =>
//               navigate('#', {
//                 state: { subtotal, uniqueProducts, totalItems, shippingCharges, total },
//               })
//             }
//           >
//             Place Order
            
//           </button>
//         </form>
//       </div>

//       {/* Right Section */}
//       <div className="w-[100%] lg:w-[30%] h-[50%] flex justify-center ">
//         <div className="w-full lg:w-80 bg-white border border-gray-200 flex flex-col p-6 gap-4 rounded-lg shadow-lg">
//           {/* Cart Totals */}
//           <h2 className="text-xl font-semibold mb-4 text-gray-800">Cart Totals</h2>
//           <div className="flex justify-between mb-2 text-gray-700">
//             <p><strong>Subtotal</strong></p>
//             <p>₹{subtotal.toFixed(2)}</p>
//           </div>
//           <div className="flex justify-between mb-2 text-gray-700">
//             <p><strong>Unique Products</strong></p>
//             <p>{uniqueProducts}</p>
//           </div>
//           <div className="flex justify-between mb-2 text-gray-700">
//             <p><strong>Total Quantity</strong></p>
//             <p>{totalItems}</p>
//           </div>
//           <div className="flex justify-between mb-2 text-gray-700">
//             <p><strong>Shipping Charges</strong></p>
//             <p>₹{shippingCharges}</p>
//           </div>
//           <hr className="my-2 border-gray-300" />
//           <div className="flex justify-between text-lg font-bold text-gray-800 mb-4">
//             <p>Total</p>
//             <p>₹{total.toFixed(2)}</p>
//           </div>
//         </div>
//       </div>
//     </div> : null
//   );
// };

// export default CheckOutPages;




import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { plantContext } from '../Context/AppContext';
import phonepay from "../../assets/lightmode/phonepay.jpeg";
import paytm from "../../assets/lightmode/paytm.png";
import googlepay from "../../assets/lightmode/google-pay-1.svg";

const CheckOutPages = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState([]);
  const [order, setOrder] = useState([]);
  const { userDetails, isLoggedIn, setIsLoggedIn,cartItems } = useContext(plantContext);
  const [state, setState] = useState({
    country: "",
    firstName: "",
    lastName: "",
    address: "",
    state: "",
    city: "",
    pincode: "",
    contact: "",
    phonePay: false,
    googlePay: false,
    paytm: false,
    cashOnDelivery: false,
  });
console.log( cartItems);

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/');
    }
  }, [isLoggedIn, navigate]);

  useEffect(() => {
    axios.get('http://localhost:5000/order').then((resp) => {
      setOrder(resp.data);
    });
  }, []);

  const {
    subtotal = 0,
    uniqueProducts = 0,
    totalItems = 0,
    shippingCharges = 0,
    gstAmounts=0,
    total = 0,
  } = location.state || {};

  const handleSubmit = async (e) => {
    e.preventDefault();

    const orderDetails = {
      ...state,
      subtotal,
      uniqueProducts,
      totalItems,
      shippingCharges,
      total,
      gstAmounts,
      cartItems,
      userEmail: userDetails.email,
    };

    try {
      const response = await axios.post('http://localhost:5000/order', orderDetails);
      if (response.status === 201) {
        navigate('/order-comf', { state: { orderDetails: response.data } });
      }
    } catch (error) {
      console.error("Error placing order:", error);
    }
  };

  const handleChange = (name, value) => {
    if (name === "phonePay" || name === "googlePay" || name === "paytm" || name === "cashOnDelivery") {
      setState((prevState) => ({
        ...prevState,
        phonePay: false,
        googlePay: false,
        paytm: false,
        cashOnDelivery: false,
        [name]: value,
      }));
    } else {
      setState((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  return (
    isLoggedIn ? (
      <div className="w-full h-auto flex flex-col sm:flex-row lg:flex-row gap-2 mt-10 p-2">
        {/* Left Section */}
        <div className="w-[100%] lg:w-[70%] h-full flex flex-col gap-6 p-6 shadow-xl border rounded-lg">
          {/* Account Section */}
          <form onSubmit={handleSubmit} className='h-full flex flex-col gap-6'>
            <div className="flex flex-col gap-2">
              <h1 className="font-semibold text-gray-800">Account</h1>
              <p className="font-semibold">{userDetails.email}</p>
            </div>
            <hr />

            {/* Delivery Section */}
            <div className="flex flex-col gap-4">
              <h1 className="text-lg font-semibold text-gray-800">Delivery</h1>
              <div>
                <input
                  type="text"
                  placeholder="Country"
                  required
                  name="country"
                  value={state.country}
                  onChange={(e) => handleChange("country", e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <div className="flex gap-4">
                <input
                  type="text"
                  placeholder="First Name"
                  required
                  name="firstName"
                  value={state.firstName}
                  onChange={(e) => handleChange("firstName", e.target.value)}
                  className="w-1/2 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  required
                  name="lastName"
                  value={state.lastName}
                  onChange={(e) => handleChange("lastName", e.target.value)}
                  className="w-1/2 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <div>
                <input
                  type="text"
                  placeholder="Address"
                  required
                  name="address"
                  value={state.address}
                  onChange={(e) => handleChange("address", e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <div className="flex gap-4">
                <input
                  type="text"
                  placeholder="State"
                  required
                  name="state"
                  value={state.state}
                  onChange={(e) => handleChange("state", e.target.value)}
                  className="w-1/3 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
                <input
                  type="text"
                  placeholder="City"
                  required
                  name="city"
                  value={state.city}
                  onChange={(e) => handleChange("city", e.target.value)}
                  className="w-1/3 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
                <input
                  type="text"
                  placeholder="Pincode"
                  required
                  name="pincode"
                  value={state.pincode}
                  onChange={(e) => handleChange("pincode", e.target.value)}
                  className="w-1/3 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
              <input
                type="text"
                placeholder="Phone"
                required
                name="contact"
                value={state.contact}
                onChange={(e) => handleChange("contact", e.target.value)}
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            {/* Shipping Method Section */}
            <div className="flex flex-col gap-2">
              <h1 className="text-lg font-semibold text-gray-800">Shipping Method</h1>
              <input
                type="text"
                name='shippingCharges'
                required
                value={shippingCharges}
                onChange={(e) => handleChange("shippingCharges", e.target.value)}
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                readOnly
              />
            </div>

            {/* Payment Section */}
            <div className="flex flex-col gap-3">
              <h1 className="text-lg font-semibold text-gray-800">Payment</h1>
              <p className="text-gray-600">All transactions are secure and encrypted.</p>
              <div className='flex gap-8 items-center'>
                <div className='flex'>
                  <input
                    type="checkbox"
                    name='phonePay'
                    
                    checked={state.phonePay}
                    onChange={(e) => handleChange("phonePay", e.target.checked)}
                  />
                  <label htmlFor="phonePay"> <img src={phonepay} alt='PhonePay' className='w-16' /></label>
                </div>
                <div className='flex gap-2'>
                  <input
                    type="checkbox"
                    name='googlePay'
                    
                    checked={state.googlePay}
                    onChange={(e) => handleChange("googlePay", e.target.checked)}
                  />
                  <label htmlFor="googlePay"> <img src={googlepay} alt='Google Pay' className='w-12' /></label>
                </div>
                <div className='flex gap-2'>
                  <input
                    type="checkbox"
                    name='paytm'
                    
                    checked={state.paytm}
                    onChange={(e) => handleChange("paytm", e.target.checked)}
                  />
                  <label htmlFor="paytm"> <img src={paytm} alt='Paytm' className='w-12' /></label>
                </div>
                <div className='flex gap-2'>
                  <input
                    type="checkbox"
                    name='cashOnDelivery'
                    
                    checked={state.cashOnDelivery}
                    onChange={(e) => handleChange("cashOnDelivery", e.target.checked)}
                  />
                  <label htmlFor="cashOnDelivery"> Cash On Delivery </label>
                </div>
              </div>
            </div>

            {/* Billing Address Section */}
            <div className="flex flex-col gap-2">
              <h1 className="text-lg font-semibold text-gray-800">Billing Address</h1>
              <p className="text-gray-600">All transactions are secure and encrypted.</p>
              <div className='flex gap-2'>
                <input
                  type="checkbox"
                  name='billingAddress'
                  required
                  checked={state.billingAddress}
                  onChange={(e) => handleChange("billingAddress", e.target.checked)}
                />
                <label htmlFor="billingAddress" className='text-xl'>Same as Shipping Address</label>
              </div>
            </div>
            <button
              type='submit'
              className="w-full bg-[#163020] text-white py-2 rounded-lg font-semibold hover:bg-[#163040] transition-all"
            >
              Place Order
            </button>
          </form>
        </div>

        {/* Right Section */}
        <div className="w-[100%] lg:w-[30%] h-[50%] flex justify-center ">
          <div className="w-full lg:w-80 bg-white border border-gray-200 flex flex-col p-6 gap-4 rounded-lg shadow-lg">
            {/* Cart Totals */}
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Cart Totals</h2>
            <div className="flex justify-between mb-2 text-gray-700">
              <p><strong>Subtotal</strong></p>
              <p>₹{subtotal.toFixed(2)}</p>
            </div>
            <div className="flex justify-between mb-2 text-gray-700">
              <p><strong>Unique Products</strong></p>
              <p>{uniqueProducts}</p>
            </div>
            <div className="flex justify-between mb-2 text-gray-700">
              <p><strong>Total Quantity</strong></p>
              <p>{totalItems}</p>
            </div>
            <div className="flex justify-between mb-2 text-gray-700">
              <p><strong>Shipping Charges</strong></p>
              <p>₹{shippingCharges}</p>
            </div>
            <div className="flex justify-between mb-2 text-gray-700">
              <p><strong>GST Charges</strong></p>
              <p>₹{gstAmounts}</p>
            </div>
            <hr className="my-2 border-gray-300" />
            <div className="flex justify-between text-lg font-bold text-gray-800 mb-4">
              <p>Total</p>
              <p>₹{total.toFixed(2)}</p>
            </div>
          </div>
        </div>
      </div>
    ) : null
  );
};

export default CheckOutPages;