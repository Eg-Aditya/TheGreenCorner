import React from 'react';
import { FaLeaf, FaPlus, FaTachometerAlt, FaUsers } from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router-dom';

const AdminAsideBar = () => {
    const navigate = useNavigate();
    const { section } = useParams(); // Get current section from URL

    const options = [
        { title: "Dashboard", key: "admin-chart-dash", icon: <FaTachometerAlt className="text-gray-600 text-2xl" /> },
        { title: "Add Plant", key: "addplant", icon: <FaPlus className="text-green-600 text-2xl" /> },
        { title: "All Users", key: "alluser", icon: <FaUsers className="text-blue-600 text-2xl" /> },
        { title: "All Plants", key: "allplant", icon: <FaLeaf className="text-orange-600 text-2xl" /> },
    ];

    return (
        <div className="flex min-h-screen bg-gray-100">
            {/* Sidebar */}
            <aside className="w-64 bg-white shadow-lg p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Admin Panel</h2>
                <nav className="flex flex-col space-y-4">
                    {options.map((option) => (
                        <button
                            key={option.key}
                            className={`flex items-center space-x-3 p-3 rounded-md hover:bg-gray-200 transition-all ${
                                section === option.key ? "bg-gray-300 font-semibold" : ""
                            }`}
                            onClick={() => navigate(`/admin-dash/${option.key}`)}
                        >
                            {option.icon}
                            <span>{option.title}</span>
                        </button>
                    ))}
                </nav>
            </aside>

            {/* Main Content Area */}
            <div className="flex-1 p-8">
                {/* Dynamic Content Based on URL */}
                {section === "admin-chart-dash" && (
                    <h1 className="text-3xl font-bold text-gray-800">Welcome to Admin Dashboard</h1>
                )}
                {section === "addplant" && (
                    <h1 className="text-3xl font-bold text-green-700">Add New Plant</h1>
                )}
                {section === "alluser" && (
                    <h1 className="text-3xl font-bold text-blue-700">All Registered Users</h1>
                )}
                {section === "allplant" && (
                    <h1 className="text-3xl font-bold text-orange-700">All Plants Listing</h1>
                )}
            </div>
        </div>
    );
};

export default AdminAsideBar;
