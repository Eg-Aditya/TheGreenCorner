import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';

export let equipmentContext = createContext();

const EquipmentsContext = ({ children }) => {
    const [equipments, setEquipments] = useState([]);
    const [filteredEquip, setFilteredEquip] = useState([]);
    const [search, setSearch] = useState("");
    const [equipName , setEquipName] = useState("");
    const [sortPrice ,serSortPrice] = useState("");
    const [ratings, setRatings] = useState("");
    
console.log(sortPrice);

    // Fetch Equipment Data
    useEffect(() => {
        axios.get("http://localhost:3000/equipments")
       
            .then((resp) => {
                setEquipments(resp.data);
                setFilteredEquip(resp.data);
            })
            .catch((error) => console.log(error));
    }, []);
    //fetch Soil Data
//     useEffect(() => {
//         axios.get("http://localhost:3000/equipments")
//     .then((resp) => {
//         setsoils(resp.data);
//         setFilteredEquip(resp.data);
//     })
//     .catch((error) => console.log(error));
// }, []);

    // Filter Equipments Based on Search
    useEffect(() => {
        let filteredData = [...equipments];
        if (search) {
            filteredData = filteredData.filter(equip =>
                equip.name.toLowerCase().includes(search.toLowerCase())
            );
        }
        if(equipName){
            filteredData = filteredData.filter(equip =>
                equip.name.includes(equipName)
             );
        }
        if (sortPrice) { 
            filteredData = filteredData.slice().sort((a, b) => {
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
            filteredData = filteredData.filter(equip =>
                equip.rating >= ratings
            );
        }
        setFilteredEquip(filteredData);
    }, [search, equipments, equipName, ratings, sortPrice]);

    return (
        <equipmentContext.Provider value={{
            filteredEquip, 
            setSearch, 
            search,
            equipName , setEquipName,
            // setName,
            equipments,ratings, setRatings,
            sortPrice, serSortPrice
        }}>
            {children}
        </equipmentContext.Provider>
    );
};

export default EquipmentsContext;
