import React, { useState } from "react";
import AdminSidebar from "./Sidebar";

const AddItems = () => {
    const [collapsed, setCollapsed] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [formData, setFormData] = useState({
        itemName: "",
        category: "Medicine",
        quantity: "",
        unit: "pieces",
        expiryDate: "",
        reorderLevel: 10,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:3000/api/inventory/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                const text = await response.text();
                console.error("Server error:", text);
                throw new Error("Server returned an error");
            }

            const data = await response.json();
            console.log("Form submitted:", data);
        } catch (error) {
            console.error("Submission error:", error);
        }
    };

    const handleReset = () => {
        setFormData({
            itemName: "",
            category: "Medicine",
            quantity: "",
            unit: "pieces",
            expiryDate: "",
            reorderLevel: 10,
        });
    };

    return (
        <div className="flex h-screen w-screen">
            <div className="w-64 bg-white shadow h-full">
                <AdminSidebar 
                    collapsed={collapsed} 
                    setCollapsed={setCollapsed}
                    currentPage="add-items"
                />
            </div>

            <div className="flex-1 bg-gray-100 p-6 h-full overflow-y-auto">
                <div className="bg-white rounded-lg shadow p-6 h-full">
                    <h2 className="text-2xl font-semibold mb-6">Add New Inventory Item</h2>

                    {success && (
                        <div className="mb-4 p-4 bg-green-100 text-green-700 rounded-lg">
                            {success}
                        </div>
                    )}

                    {error && (
                        <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Item Name
                                </label>
                                <input
                                    type="text"
                                    name="itemName"
                                    value={formData.itemName}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg 
                             focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Category
                                </label>
                                <select
                                    name="category"
                                    value={formData.category}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg 
                             focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                >
                                    <option value="Medicine">Medicine</option>
                                    <option value="Equipment">Equipment</option>
                                    <option value="Consumables">Consumables</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Quantity
                                </label>
                                <input
                                    type="number"
                                    name="quantity"
                                    value={formData.quantity}
                                    onChange={handleChange}
                                    min="0"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg 
                             focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Unit
                                </label>
                                <select
                                    name="unit"
                                    value={formData.unit}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg 
                             focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                >
                                    <option value="pieces">Pieces</option>
                                    <option value="ml">ML</option>
                                    <option value="mg">MG</option>
                                    <option value="bottles">Bottles</option>
                                    <option value="packs">Packs</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Expiry Date
                                </label>
                                <input
                                    type="date"
                                    name="expiryDate"
                                    value={formData.expiryDate}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg 
                             focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required={formData.category === "Medicine"}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Reorder Level
                                </label>
                                <input
                                    type="number"
                                    name="reorderLevel"
                                    value={formData.reorderLevel}
                                    onChange={handleChange}
                                    min="0"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg 
                             focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>
                        </div>

                        <div className="flex justify-end space-x-4">
                            <button
                                type="button"
                                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 
                                hover:bg-gray-50"
                                onClick={handleReset}
                                disabled={loading}
                            >
                                Reset
                            </button>
                            <button
                                type="submit"
                                className="px-4 py-2 bg-blue-500 text-white rounded-lg 
                                hover:bg-blue-600 disabled:bg-blue-300 disabled:cursor-not-allowed"
                                disabled={loading}
                            >
                                {loading ? 'Adding...' : 'Add Item'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddItems;
