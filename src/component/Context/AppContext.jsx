import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';

export let plantContext = createContext();

const AppContext = ({ children }) => {
    const [isAdminLogin , setIsAdminLogin] = useState(false);
    const [allPlant, setAllPlant] = useState([]);
    const [filteredPlant, setFilteredPlant] = useState([]);
    const [search, setSearch] = useState("");
    const [categories, setCategories] = useState(""); // Should hold a single category string
    const [isLoggedIn, setIsLoggedIn] = useState(false); // login details
    const [sortPrice, setSortPrice] = useState("");
    const [ratings, setRatings] = useState("");
    const [totalItems, setTotalItems] = useState(null);
    const [cartItems, setCartItems] = useState([]);
    const[cartTotalItems, setCartTotalItems] = useState('')
    const [userDetails, setUserDetails] = useState("");
    const [admin , setAdmin] = useState([])

    useEffect(()=>{
        axios.get("http://localhost:5000/admin").then((resp)=>{
            setAdmin(resp.data)
        }).catch((error)=>{console.log(error)})
    },[])

    useEffect(() => {
        axios.get("http://localhost:5000/plants")
            // axios.get('http://116.75.62.44/8000/plants')
            .then((resp) => {
                setAllPlant(resp.data);
                setFilteredPlant(resp.data);
            })
            .catch((error) => {
                console.error("Error fetching plant data:", error);
            });
    }, []);
    useEffect(()=>{
        axios.get("http://localhost:5000/cart").then((resp)=>{
            setCartTotalItems(resp.data)
        })
        .catch((error) => console.error("Error fetching cart data:", error));
    },[cartItems,setCartTotalItems])
    const totalCartItems = cartTotalItems.length;
    
    useEffect(() => {

        let filteredItems = [...allPlant];
        if (search) {
            filteredItems = filteredItems.filter(plant =>
                plant.name.toLowerCase().includes(search.toLowerCase())
            );
        }

        if (categories) {
            filteredItems = filteredItems.filter(plant =>
                plant.categories.includes(categories) // Direct comparison
            );
        }
        if (sortPrice) { 
            filteredItems = filteredItems.slice().sort((a, b) => {
                if (sortPrice === "low-to-high") {
                    console.log("Sorting Low to High");
                    return parseFloat(a.price) - parseFloat(b.price); // Ascending order
                } else if (sortPrice === "high-to-low") {
                    console.log("Sorting High to Low");
                    return parseFloat(b.price) - parseFloat(a.price); // Descending order
                }
                return 0; 
            });
        }
        if (ratings) {
            filteredItems = filteredItems.filter(plant =>
                plant.rating >= ratings
            );
        }

        setFilteredPlant(filteredItems);
    }, [search, categories, allPlant, sortPrice, ratings]);


    return (
        <plantContext.Provider value={{
            allPlant,
            setAllPlant,
            filteredPlant,
            setFilteredPlant,
            search,
            setSearch,
            categories,
            setCategories,
            isLoggedIn,
            setIsLoggedIn,
            setSortPrice,
            sortPrice,
            ratings,
            setRatings,
            totalItems,
            setTotalItems,
            userDetails,
            setUserDetails,
            totalCartItems,
            cartItems,
            setCartItems,
            admin
        }}>
            {children}
        </plantContext.Provider>
    );
};

export default AppContext;
