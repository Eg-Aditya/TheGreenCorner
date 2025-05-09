import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaPlus, FaUsers, FaLeaf, FaTachometerAlt } from "react-icons/fa";

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [selectedOption, setSelectedOption] = useState("dashboard"); // Default: Dashboard

    const options = [
        { title: "Dashboard", key: "admin-chart-dash", icon: <FaTachometerAlt className="text-gray-600 text-2xl" /> },
        { title: "Add Plant", key: "addplant", icon: <FaPlus className="text-green-600 text-2xl" /> },
        { title: "All Users", key: "alluser", icon: <FaUsers className="text-blue-600 text-2xl" /> },
        { title: "All Plants", key: "allplant", icon: <FaLeaf className="text-orange-600 text-2xl" /> },
    ];

    return (
        <div className="flex  min-h-screen bg-gray-100">
            {/* Sidebar */}
            <aside className="w-64 bg-white shadow-lg p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Admin Panel</h2>
                <nav className="flex flex-col space-y-4">
                    {options.map((option) => (
                        <button
                            key={option.key}
                            className={`flex items-center space-x-3 p-3 rounded-md hover:bg-gray-200 transition-all ${
                                selectedOption === option.key ? "bg-gray-300 font-semibold" : ""
                            }`}
                            onClick={() => navigate(`/admin-dash/${option.key}`)}
                            // onClick={() => setSelectedOption(option.key)}
                        >
                            {option.icon}
                            <span>{option.title}</span>
                        </button>
                    ))}
                </nav>
            </aside>

            {/* Main Content */}
            <div className="flex-1 p-8">
                {selectedOption === "dashboard" && (
                    <h1 className="text-3xl font-bold text-gray-800">Welcome to Admin Dashboard</h1>
                )}
                {selectedOption !== "dashboard" && (
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                        {options
                            .filter((option) => option.key !== "dashboard") // Exclude Dashboard in main content
                            .map((option) => (
                                <div
                                    key={option.key}
                                    className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center justify-center cursor-pointer hover:scale-105 transition-all"
                                    onClick={() => navigate(option.key)}
                                >
                                    {option.icon}
                                    <h2 className="text-lg font-semibold mt-3">{option.title}</h2>
                                </div>
                            ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminDashboard;
