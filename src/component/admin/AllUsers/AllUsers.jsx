import axios from "axios";
import React, { useEffect, useState } from "react";
import { IoMdSearch } from "react-icons/io";

const AllUsers = () => {
    const [users, setUsers] = useState([]);
    const [filteredUser, setFilteredUser] = useState([])
    const [search, setSearch] = useState("");
    

    useEffect(() => {
     axios.get('http://localhost:5000/user').then((resp)=>{
        setUsers(resp.data)
        setFilteredUser(resp.data)
     }).catch((error)=>{console.log(error);
     })
    }, []);


    useEffect(() => {
       let filteredUsers = [...users]
       if (search) {
        filteredUsers = filteredUsers.filter(user =>
            user.username.toLowerCase().includes(search.toLowerCase()) || 
            user.contact.includes(search) ||
            user.email.includes(search)
        );
    }
    setFilteredUser(filteredUsers)
    }, [search])


    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/user/${id}`);
            setUsers(users.filter((user) => user.id !== id)); // Update state
            alert("User deleted successfully");
        } catch (error) {
            console.log("Error deleting user:", error);
        }
    };

    return (
        <div className="p-4">
            <div className="flex items-center justify-between mb-4">
                <h1 className="text-xl font-semibold text-center flex-1">
                    All Users
                </h1>
                <div className="relative group  sm:block ">
                    <input
                        type="text"
                        onChange={(e) => { setSearch(e.target.value) }}
                        placeholder="search your Users"
                        className="w-[200px] sm:w-[200px]   rounded-full border-2 border-gray-300 px-3 py-1 focus:outline-none focus:border-1 focus:border-primary dark:border-gray-500 dark:bg-white"
                    />
                    <IoMdSearch className="text-gray-500 absolute top-1/2 -translate-y-1/2 right-3" />
                </div>
            </div>


            <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-300">
                    <thead className="bg-[#163050] text-lg text-white">
                        <tr>
                            <th className="p-2 border">Name</th>
                            <th className="p-2 border">Email</th>
                            <th className="p-2 border">Contact</th>
                            <th className="p-2 border">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                    { filteredUser.length > 0 ? 
                            filteredUser.map((user, i) => (
                                <tr key={i} className="text-center font-medium bg-white hover:bg-gray-100">
                                    <td className="p-2 border">{user.username}</td>
                                    <td className="p-2 border">{user.email}</td>
                                    <td className="p-2 border">{user.contact}</td>
                                    <td className="p-2 border">
                                        <button
                                            onClick={() => handleDelete(user.id)}
                                            className="px-3 py-1 bg-red-600 text-white font-medium rounded-md hover:bg-red-700 transition"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                         : 
                            <tr>
                                <td colSpan="4" className="text-center p-4 text-gray-500">
                                    No users found
                                </td>
                            </tr>
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllUsers;
