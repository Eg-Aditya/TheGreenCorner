import React, { useContext } from "react";
import { FaUsers, FaLeaf } from "react-icons/fa";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";
import { plantContext } from "../../Context/AppContext";

const AdminChartDash = ({ totalUsers, totalPlants }) => {
    // Sample bar chart data
    const {allplant} = useContext(plantContext)
    const data = [
        { name: "Users", count: totalUsers },
        { name: "Plants", count: totalPlants },
    ];
   
    // Pie chart data
    const plantData = [
        { name: "Indoor Plants", value: 30 },
        { name: "Outdoor Plants", value: 25 },
        { name: "Garden Plants", value: 20 },
        { name: "Home Plants", value: 15 },
        { name: "Office Plants", value: 10 },
    ];

    const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A28BFF"];
    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Admin Dashboard</h1>

            {/* Cards Section */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-md flex items-center">
                    <FaUsers className="text-blue-600 text-4xl mr-4" />
                    <div>
                        <h2 className="text-xl font-semibold">Total Users</h2>
                        <p className="text-2xl font-bold">{totalUsers}</p>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md flex items-center">
                    <FaLeaf className="text-green-600 text-4xl mr-4" />
                    <div>
                        <h2 className="text-xl font-semibold">Total Plants</h2>
                        <p className="text-2xl font-bold">{}</p>
                    </div>
                </div>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8">
                {/* Bar Chart */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-lg font-semibold mb-4">Users & Plants Overview</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={data}>
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="count" fill="#82ca9d" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                {/* Pie Chart */}
                <div className="p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-4 text-center">Plant Category Distribution</h2>
            <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                    <Pie
                        data={plantData}
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                        label
                    >
                        {plantData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                </PieChart>
            </ResponsiveContainer>
        </div>
            </div>
        </div>
    );
};

export default AdminChartDash;
