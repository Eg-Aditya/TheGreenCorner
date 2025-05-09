import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';

export let soilContext = createContext();

const SoilContext = ({ children }) => {
    const [soil, setSoil] = useState([]);
    const [filteredSoil, setFilteredSoil] = useState([]);
    const [search, setSearch] = useState("");
    const [soilName, setSoilName] = useState("");
    const [sortPrice, serSortPrice] = useState("");
    const [ratings, setRatings] = useState("");

    console.log(sortPrice);

    // Fetch Soil Data
    useEffect(() => {
        axios.get("http://localhost:4000/soil")
            .then((resp) => {
                setSoil(resp.data);
                setFilteredSoil(resp.data);
            })
            .catch((error) => console.log(error));
    }, []);

    // Filter Soil Based on Search, Name, Rating, and Sort
    useEffect(() => {
        let filteredData = [...soil];

        if (search) {
            filteredData = filteredData.filter(item =>
                item.name.toLowerCase().includes(search.toLowerCase())
            );
        }

        if (soilName) {
            filteredData = filteredData.filter(item =>
                item.name.includes(soilName)
            );
        }

        if (ratings) {
            filteredData = filteredData.filter(item =>
                parseFloat(item.rating) >= parseFloat(ratings)
            );
        }

        if (sortPrice) {
            filteredData = filteredData.slice().sort((a, b) => {
                if (sortPrice === "low-to-high") {
                    console.log("Sorting Low to High");
                    return parseFloat(a.price) - parseFloat(b.price);
                } else if (sortPrice === "high-to-low") {
                    console.log("Sorting High to Low");
                    return parseFloat(b.price) - parseFloat(a.price);
                }
                return 0;
            });
        }

        setFilteredSoil(filteredData);
    }, [search, soil, soilName, ratings, sortPrice]);

    return (
        <soilContext.Provider value={{
            filteredSoil,
            setSearch,
            search,
            soilName,
            setSoilName,
            soil,
            ratings,
            setRatings,
            sortPrice,
            serSortPrice,
        }}>
            {children}
        </soilContext.Provider>
    );
};

export default SoilContext;
