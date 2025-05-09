import React, { useContext, useState } from 'react';
import { plantContext } from '../../Context/AppContext';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { IoMdSearch } from 'react-icons/io';

const Plant = () => {
    let { filteredPlant, setSearch } = useContext(plantContext);

    // Pagination States
    const [currentPage, setCurrentPage] = useState(1);
    const plantsPerPage = 5; // Number of plants per page

    // Calculate indexes for slicing the array
    const indexOfLastPlant = currentPage * plantsPerPage;
    const indexOfFirstPlant = indexOfLastPlant - plantsPerPage;
    const currentPlants = filteredPlant.slice(indexOfFirstPlant, indexOfLastPlant);

    // Total number of pages
    const totalPages = Math.ceil(filteredPlant.length / plantsPerPage);

    // Function to set current page
    const goToPage = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    return (
        <div className="p-4">
            {/* Search Bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between mb-4 gap-3">
                <h1 className="text-xl font-bold text-center">All Plants</h1>
                <div className="relative w-full sm:w-[250px]">
                    <input
                        type="text"
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search plants..."
                        className="w-full rounded-full border-2 border-gray-300 px-4 py-2 focus:outline-none focus:border-primary"
                    />
                    <IoMdSearch className="text-gray-500 absolute top-1/2 right-4 transform -translate-y-1/2" />
                </div>
            </div>

            {/* Table (for larger screens) */}
            <div className="hidden sm:block overflow-x-auto">
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="px-4 py-2 text-left">Image</th>
                            <th className="px-4 py-2 text-left">Name</th>
                            <th className="px-4 py-2 text-left">Price</th>
                            <th className="px-4 py-2 text-left">Quantity</th>
                            <th className="px-4 py-2 text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentPlants.length > 0 ? (
                            currentPlants.map((plant, i) => (
                                <tr key={i} className="border-b">
                                    <td className="px-4 py-2">
                                        <img src={plant.primaryImage} className="w-20 h-20 object-cover rounded-md" alt={plant.name} />
                                    </td>
                                    <td className="px-4 py-2">{plant.name}</td>
                                    <td className="px-4 py-2">₹ {plant.price}</td>
                                    <td className="px-4 py-2">{plant.quantityAvailable}</td>
                                    <td className="px-4 py-2 flex space-x-2">
                                        <button className="text-blue-500 hover:text-blue-700">
                                            <FaEdit />
                                        </button>
                                        <button className="text-red-500 hover:text-red-700">
                                            <FaTrash />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="text-center py-4 text-gray-500">
                                    No plants found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Mobile View: Card Layout */}
            <div className="sm:hidden flex flex-col gap-3">
                {currentPlants.length > 0 ? (
                    currentPlants.map((plant, i) => (
                        <div key={i} className="bg-white shadow-md p-3 rounded-lg flex items-center space-x-3">
                            <img src={plant.primaryImage} className="w-20 h-20 object-cover rounded-md" alt={plant.name} />
                            <div className="flex-1">
                                <h2 className="font-semibold">{plant.name}</h2>
                                <p className="text-gray-600">₹ {plant.price}</p>
                                <p className="text-gray-500">Quantity: {plant.quantityAvailable}</p>
                            </div>
                            <div className="flex space-x-2">
                                <button className="text-blue-500 hover:text-blue-700">
                                    <FaEdit />
                                </button>
                                <button className="text-red-500 hover:text-red-700">
                                    <FaTrash />
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-center text-gray-500">No plants found</p>
                )}
            </div>

            {/* Pagination Controls */}
            <div className="flex justify-center mt-4 space-x-2">
                {/* Previous Button */}
                <button
                    onClick={() => goToPage(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-3 py-2 bg-blue-500 text-white rounded-md disabled:bg-gray-300 text-sm sm:text-base"
                >
                    Previous
                </button>

                {/* Page Numbers */}
                {Array.from({ length: Math.min(3, totalPages) }, (_, i) => i + 1).map((page) => (
                    <button
                        key={page}
                        onClick={() => goToPage(page)}
                        className={`px-3 py-2 rounded-md text-sm sm:text-base ${
                            currentPage === page ? 'bg-blue-700 text-white' : 'bg-gray-200'
                        }`}
                    >
                        {page}
                    </button>
                ))}

                {/* Show ellipsis if more pages exist */}
                {totalPages > 3 && currentPage < totalPages - 1 && <span className="px-3 py-2">...</span>}

                {/* Next Button */}
                <button
                    onClick={() => goToPage(currentPage + 1)}
                    disabled={currentPage >= totalPages}
                    className="px-3 py-2 bg-blue-500 text-white rounded-md disabled:bg-gray-300 text-sm sm:text-base"
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default Plant;
