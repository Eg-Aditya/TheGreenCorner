// import axios from "axios";
// import React, { useEffect, useState } from "react";

// const AddPlant = () => {
//   let [tags, setTags] = useState([]);
//   let [categories, setCategories] = useState([]);
//   let [shippingStates, setShippingStates] = useState([]);
//   let [secondaryImages, setSecondaryImages] = useState([]);
//   let [reviews, setReviews] = useState([]);

//   let [newPlant, setNewPlant] = useState({
//     name: "",
//     id: Date.now(),
//     description: "",
//     price: "",
//     discountPrice:"",
//     rating: "",
//     reviews: reviews,
//     totalSalesLastMonth: "",
//     sellerName: "",
//     availability: "In Stock",
//     quantityAvailable: "",
//     categories: categories,
//     sunlightRequirement: "",
//     moistureRequirement: "",
//     soilType: "",
//     season: "",
//     growthRate: "",
//     potSizeRequired: "",
//     genus: "",
//     localName: "",
//     regionalName: "",
//     biologicalName: "",
//     botanicalName: "",
//     tags: tags,
//     shippingStates: shippingStates,
//     primaryImage: "",
//     secondaryImages: secondaryImages,
//     shoppingPolicy: "",
//     refundPolicy: "",
//   });


//   useEffect(() => {
//     axios.get("http://localhost:8000/plants").then((res) => {
       
//     });
//   }, []);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setNewPlant({ ...newPlant, [name]: value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log(newPlant);
//   };

//   return (
//     <div className="w-full flex flex-col items-center mt-10 mb-10">
//       <h2 className="text-2xl font-bold mb-5">Add a New Plant</h2>
//       <form
//         onSubmit={handleSubmit}
//         className="w-full md:w-[60%] border border-gray-300 p-5 rounded-lg shadow-md flex flex-col gap-4"
//       >
//         {/* Plant Name & Description */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <div>
//             <label className="block font-medium">Name:</label>
//             <input
//               type="text"
//               name="name"
//               value={newPlant.name}
//               onChange={handleChange}
//               required
//               className="w-full p-2 border rounded"
//             />
//           </div>
//           <div>
//             <label className="block font-medium">Description:</label>
//             <textarea
//               name="description"
//               value={newPlant.description}
//               onChange={handleChange}
//               required
//               className="w-full p-2 border rounded"
//             />
//           </div>
//         </div>

//         {/* Price & Rating */}
//         <div className="grid grid-cols-2 gap-4">
//           <div>
//             <label className="block font-medium">Price:</label>
//             <input
//               type="text"
//               name="price"
//               value={newPlant.price}
//               onChange={handleChange}
//               required
//               className="w-full p-2 border rounded"
//             />
//           </div>
//           <div>
//             <label className="block font-medium">Rating:</label>
//             <input
//               type="text"
//               name="rating"
//               value={newPlant.rating}
//               onChange={handleChange}
//               required
//               className="w-full p-2 border rounded"
//             />
//           </div>
//         </div>

//         {/* Seller & Availability */}
//         <div className="grid grid-cols-2 gap-4">
//           <div>
//             <label className="block font-medium">Seller Name:</label>
//             <input
//               type="text"
//               name="sellerName"
//               value={newPlant.sellerName}
//               onChange={handleChange}
//               required
//               className="w-full p-2 border rounded"
//             />
//           </div>
//           <div>
//             <label className="block font-medium">Availability:</label>
//             <input
//               type="text"
//               name="availability"
//               value={newPlant.availability}
//               onChange={handleChange}
//               required
//               className="w-full p-2 border rounded"
//             />
//           </div>
//         </div>

//         {/* Sunlight & Moisture */}
//         <div className="grid grid-cols-2 gap-4">
//           <div>
//             <label className="block font-medium">Sunlight Requirement:</label>
//             <input
//               type="text"
//               name="sunlightRequirement"
//               value={newPlant.sunlightRequirement}
//               onChange={handleChange}
//               required
//               className="w-full p-2 border rounded"
//             />
//           </div>
//           <div>
//             <label className="block font-medium">Moisture Requirement:</label>
//             <input
//               type="text"
//               name="moistureRequirement"
//               value={newPlant.moistureRequirement}
//               onChange={handleChange}
//               required
//               className="w-full p-2 border rounded"
//             />
//           </div>
//         </div>

//         {/* Botanical & Biological Names */}
//         <div className="grid grid-cols-2 gap-4">
//           <div>
//             <label className="block font-medium">Biological Name:</label>
//             <input
//               type="text"
//               name="biologicalName"
//               value={newPlant.biologicalName}
//               onChange={handleChange}
//               required
//               className="w-full p-2 border rounded"
//             />
//           </div>
//           <div>
//             <label className="block font-medium">Botanical Name:</label>
//             <input
//               type="text"
//               name="botanicalName"
//               value={newPlant.botanicalName}
//               onChange={handleChange}
//               required
//               className="w-full p-2 border rounded"
//             />
//           </div>
//         </div>

//         {/* Tags & Shipping */}
//         <div className="grid grid-cols-2 gap-4">
//           <div>
//             <label className="block font-medium">Tags:</label>
//             <input
//               type="text"
//               name="tags"
//               value={newPlant.tags}
//               onChange={handleChange}
//               required
//               className="w-full p-2 border rounded"
//             />
//           </div>
//           <div>
//             <label className="block font-medium">Shipping States:</label>
//             <input
//               type="text"
//               name="shippingStates"
//               value={newPlant.shippingStates}
//               onChange={handleChange}
//               required
//               className="w-full p-2 border rounded"
//             />
//           </div>
//         </div>

//         {/* Image Upload */}
//         <div className="grid grid-cols-2 gap-4">
//           <div>
//             <label className="block font-medium">Primary Image URL:</label>
//             <input
//               type="text"
//               name="primaryImage"
//               value={newPlant.primaryImage}
//               onChange={handleChange}
//               required
//               className="w-full p-2 border rounded"
//             />
//           </div>
//           <div>
//             <label className="block font-medium">Secondary Images URL:</label>
//             <input
//               type="text"
//               name="secondaryImages"
//               value={newPlant.secondaryImages}
//               onChange={handleChange}
//               required
//               className="w-full p-2 border rounded"
//             />
//           </div>
//         </div>

//         {/* Submit Button */}
//         <button
//           type="submit"
//           className="mt-4 bg-[#163020] text-white py-2 px-4 rounded hover:bg-[#163030] transition duration-200"
//         >
//           Add Plant
//         </button>
//       </form>
//     </div>
//   );
// };

// export default AddPlant;

import React, { useContext, useState } from 'react';
import axios from 'axios';
// import { plantContext } from '../../contextAPI/Context';

const AddPlant = () => {
  // const pro = useContext(plantContext);

  let [categoryInput, setCategoryInput] = useState("");
  let [shippingStateInput, setShippingStateInput] = useState("");
  let [tagInput, setTagInput] = useState("")
  let [secondaryImageInputs, setSecondaryImageInputs] = useState([]);


  let [mainObj, setMainObj] = useState({
    name: "",
    id: "",
    description: "",
    price: "",
    rating: "",
    reviews: [],
    totalSalesLastMonth: "",
    sellerName: "",
    sellerAddress: {
      street: "",
      city: "",
      state: "",
      country: "",
      pincode: ""
    },
    availability: "",
    quantityAvailable: "",
    categories: [],
    sunlightRequirement: "",
    moistureRequirement: "",
    soilType: "",
    season: "",
    growthRate: "",
    potSizeRequired: "",
    genus: "",
    localName: "",
    regionalName: "",
    biologicalName: "",
    botanicalName: "",
    tags: [],
    shippingStates: [],
    primaryImage: "",
    secondaryImages: [],
    shoppingPolicy: "",
    refundPolicy: ""
  });


  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setMainObj((prevMainObj) => ({
      ...prevMainObj,
      [name]: value
    }));
  };

  // Add new review to the reviews array
  const addReview = () => {
    setMainObj((prevMainObj) => ({
      ...prevMainObj,
      reviews: [
        ...prevMainObj.reviews,
        {
          username: "",
          rating: "",
          comment: "",
          productDelivered: "",
          dateTime: "",
          likes: "",
          dislikes: ""
        }
      ]
    }));
  };

  // Handle change in reviews
  const handleReviewChange = (index, e) => {
    const { name, value } = e.target;
    let updatedReviews = [...mainObj.reviews];
    updatedReviews[index][name] = value;
    setMainObj({ ...mainObj, reviews: updatedReviews });
  };

  // Add new tag
  const addTagInput = () => {
    if (tagInput.trim() !== "") {
      setMainObj((prevMainObj) => ({
        ...prevMainObj,
        tags: [...prevMainObj.tags, tagInput.trim()]
      }));
      setTagInput("");
    }
  };

  // Add new category
  const addCategory = () => {
    if (categoryInput.trim() !== "") {
      setMainObj((prevMainObj) => ({
        ...prevMainObj,
        categories: [...prevMainObj.categories, categoryInput.trim()]
      }));
      setCategoryInput("");
    }
  };


  const handleSellerAddressChange = (e) => {
    const { name, value } = e.target;
    setMainObj((prevMainObj) => ({
      ...prevMainObj,
      sellerAddress: {
        ...prevMainObj.sellerAddress,
        [name]: value
      }
    }));
  };

  const addShippingState = () => {
    if (shippingStateInput.trim() !== "") {
      setMainObj((prevMainObj) => ({
        ...prevMainObj,
        shippingStates: [...prevMainObj.shippingStates, shippingStateInput.trim()]
      }));
      setShippingStateInput(""); // Clear input field after adding
    }
  };

  const handleSecondaryImageChange = (index, e) => {
    const { value } = e.target;
    let updatedImages = [...secondaryImageInputs];
    updatedImages[index] = value;
    setSecondaryImageInputs(updatedImages);

    setMainObj((prevMainObj) => ({
      ...prevMainObj,
      secondaryImages: updatedImages.filter((img) => img.trim() !== ""),
    }));
  };


  const AddPlants = async () => {
    try {
      // Ensure we are using the latest state before sending the API request
      const updatedMainObj = {
        ...mainObj,
        categories: [...mainObj.categories, categoryInput.trim()].filter(Boolean),
        tags: [...mainObj.tags, tagInput.trim()].filter(Boolean),
        shippingStates: [...mainObj.shippingStates, shippingStateInput.trim()].filter(Boolean),
      };

      const response = await axios.post('http://localhost:8000/plants', updatedMainObj);
      console.log('Plant added successfully:', response.data);

      // Optionally, reset state after successful submission
      setMainObj({
        name: "",
        id: "",
        description: "",
        price: "",
        rating: "",
        reviews: [],
        totalSalesLastMonth: "",
        sellerName: "",
        sellerAddress: {
          street: "",
          city: "",
          state: "",
          country: "",
          pincode: ""
        },
        availability: "",
        quantityAvailable: "",
        categories: [],
        sunlightRequirement: "",
        moistureRequirement: "",
        soilType: "",
        season: "",
        growthRate: "",
        potSizeRequired: "",
        genus: "",
        localName: "",
        regionalName: "",
        biologicalName: "",
        botanicalName: "",
        tags: [],
        shippingStates: [],
        primaryImage: "",
        secondaryImages: [],
        shoppingPolicy: "",
        refundPolicy: ""
      });

      // Clear input fields
      setCategoryInput("");
      setTagInput("");
      setShippingStateInput("");
    } catch (error) {
      console.error('Error adding plant:', error);
    }
  };


  return (
    <div className='w-[100vw] h-auto flex flex-col gap-5 items-center'>
      <h1 className='text-4xl  font-bold '>Fill Details of plants to add plant</h1>
      <form className='w-[50%] flex flex-col gap-3'>
        <input className='p-2 h-10' type="text" placeholder='Enter name of the plant' name='name' value={mainObj.name} onChange={handleChange} />
        <input className='p-2 h-10' type="text" placeholder='Enter ID of the plant' name='id' value={mainObj.id} onChange={handleChange} />
        <input className='p-2 h-10' type="text" placeholder='Enter description of the plant' name='description' value={mainObj.description} onChange={handleChange} />
        <input className='p-2 h-10' type="text" placeholder='Enter price of the plant' name='price' value={mainObj.price} onChange={handleChange} />
        <input className='p-2 h-10' type="text" placeholder='Enter rating of the plant' name='rating' value={mainObj.rating} onChange={handleChange} />

        {/* Multiple Reviews Section */}
        <h2>Reviews</h2>
        {mainObj.reviews.map((review, index) => (
          <div key={index}>
            <input className='p-2 h-10' type="text" placeholder='Username' name='username' value={review.username} onChange={(e) => handleReviewChange(index, e)} />
            <input className='p-2 h-10' type="text" placeholder='Rating' name='rating' value={review.rating} onChange={(e) => handleReviewChange(index, e)} />
            <input className='p-2 h-10' type="text" placeholder='Comment' name='comment' value={review.comment} onChange={(e) => handleReviewChange(index, e)} />
          </div>
        ))}
        <button type="button" onClick={addReview} className="mt-2 bg-blue-500 text-white py-1 px-2 rounded">Add Review</button>

        <input className='p-2 h-10' type="text" placeholder='Enter total sales last month' name='totalSalesLastMonth' value={mainObj.totalSalesLastMonth} onChange={handleChange} />
        <input className='p-2 h-10' type="text" placeholder='Enter seller name' name='sellerName' value={mainObj.sellerName} onChange={handleChange} />

        {/* Seller Address Section */}
        <h2>Seller Address</h2>
        <input className='p-2 h-10' type="text" placeholder='Street' name='street' value={mainObj.sellerAddress.street} onChange={handleSellerAddressChange} />
        <input className='p-2 h-10' type="text" placeholder='City' name='city' value={mainObj.sellerAddress.city} onChange={handleSellerAddressChange} />
        <input className='p-2 h-10' type="text" placeholder='State' name='state' value={mainObj.sellerAddress.state} onChange={handleSellerAddressChange} />
        <input className='p-2 h-10' type="text" placeholder='Country' name='country' value={mainObj.sellerAddress.country} onChange={handleSellerAddressChange} />
        <input className='p-2 h-10' type="text" placeholder='Pincode' name='pincode' value={mainObj.sellerAddress.pincode} onChange={handleSellerAddressChange} />
        <input className='p-2 h-10' type="text" placeholder='Enter availability' name='availability' value={mainObj.availability} onChange={handleChange} />
        <input className='p-2 h-10' type="text" placeholder='Enter quantity available' name='quantityAvailable' value={mainObj.quantityAvailable} onChange={handleChange} />

        {/* Multiple Categories */}
        <h2>Categories</h2>
        <input
          className='p-2 h-10'
          type="text"
          placeholder="Enter a category"
          value={categoryInput}
          onChange={(e) => setCategoryInput(e.target.value)}
        />
        <button type="button" onClick={addCategory} className="bg-blue-500 text-white px-3 py-1 rounded">
          Add Category
        </button>

        <input className='p-2 h-10' type="text" placeholder='Enter sunlight requirement' name='sunlightRequirement' value={mainObj.sunlightRequirement} onChange={handleChange} />
        <input className='p-2 h-10' type="text" placeholder='Enter moisture requirement' name='moistureRequirement' value={mainObj.moistureRequirement} onChange={handleChange} />
        <input className='p-2 h-10' type="text" placeholder='Enter soil type' name='soilType' value={mainObj.soilType} onChange={handleChange} />
        <input className='p-2 h-10' type="text" placeholder='Enter season' name='season' value={mainObj.season} onChange={handleChange} />
        <input className='p-2 h-10' type="text" placeholder='Enter growth rate' name='growthRate' value={mainObj.growthRate} onChange={handleChange} />
        <input className='p-2 h-10' type="text" placeholder='Enter pot size required' name='potSizeRequired' value={mainObj.potSizeRequired} onChange={handleChange} />
        <input className='p-2 h-10' type="text" placeholder='Enter genus' name='genus' value={mainObj.genus} onChange={handleChange} />
        <input className='p-2 h-10' type="text" placeholder='Enter local name' name='localName' value={mainObj.localName} onChange={handleChange} />
        <input className='p-2 h-10' type="text" placeholder='Enter regional name' name='regionalName' value={mainObj.regionalName} onChange={handleChange} />
        <input className='p-2 h-10' type="text" placeholder='Enter biological name' name='biologicalName' value={mainObj.biologicalName} onChange={handleChange} />
        <input className='p-2 h-10' type="text" placeholder='Enter botanical name' name='botanicalName' value={mainObj.botanicalName} onChange={handleChange} />

        {/* Multiple Tags */}
        <h2>Tags</h2>
        <input
          className='p-2 h-10'
          type="text"
          placeholder="Enter a tags"
          value={tagInput}
          onChange={(e) => setTagInput(e.target.value)}
        />
        <button type="button" onClick={addTagInput} className="bg-blue-500 text-white px-3 py-1 rounded">
          Add Tag
        </button>

        <h2>Shipping States</h2>
        <input
          className='p-2 h-10'
          type="text"
          placeholder="Enter a shipping state"
          value={shippingStateInput}
          onChange={(e) => setShippingStateInput(e.target.value)}
        />
        <button type="button" onClick={addShippingState} className="bg-blue-500 text-white px-3 py-1 rounded">
          Add State
        </button>

        <h2>Primary Image</h2>
        <input className='p-2 h-10' type="text" placeholder='Enter primary image' name='primaryImage' value={mainObj.primaryImage} onChange={handleChange} />

        <h2>Secondary Images</h2>
        <button type="button" onClick={() => setSecondaryImageInputs([...secondaryImageInputs, ""])} className="bg-blue-500 text-white px-3 py-1 rounded">
          Add Secondary Image
        </button>
        {secondaryImageInputs.map((image, index) => (
          <input
            className='p-2 h-10'
            key={index}
            type="text"
            placeholder={`Enter secondary image URL ${index + 1}`}
            value={image}
            onChange={(e) => handleSecondaryImageChange(index, e)}
          />
        ))}


        <input className='p-2 h-10' type="text" placeholder='Enter shopping policy' name='shoppingPolicy' value={mainObj.shoppingPolicy} onChange={handleChange} />
        <input className='p-2 h-10' type="text" placeholder='Enter refund policy' name='refundPolicy' value={mainObj.refundPolicy} onChange={handleChange} />


        <button type="button" onClick={AddPlants} className="mt-4 bg-green-500 text-white py-2 px-4 rounded">
          Add Plant
        </button>
      </form>
    </div>
  );
};

export default AddPlant;

