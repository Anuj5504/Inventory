import React, { useState } from 'react';
import AdminSidebar from './Sidebar';

const LowStockItems = () => {
    const [collapsed, setCollapsed] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');

    // Mock data - replace with actual API call
    const [items, setItems] = useState([
        {
            id: 1,
            itemName: 'Paracetamol',
            category: 'Medicine',
            quantity: 8,
            unit: 'packs',
            expiryDate: '2024-12-31',
            reorderLevel: 10
        },
        {
            id: 2,
            itemName: 'Surgical Masks',
            category: 'Consumables',
            quantity: 5,
            unit: 'boxes',
            reorderLevel: 20
        },
        // Add more mock items as needed
    ]);

    const [editingItem, setEditingItem] = useState(null);

    const handleDelete = (itemId) => {
        // TODO: Add API call to delete item
        setItems(items.filter(item => item.id !== itemId));
    };

    const handleEdit = (item) => {
        setEditingItem(item);
    };

    const handleUpdate = (e) => {
        e.preventDefault();
        // TODO: Add API call to update item
        setItems(items.map(item =>
            item.id === editingItem.id ? editingItem : item
        ));
        setEditingItem(null);
    };

    const filteredItems = items
        .filter(item => item.quantity < item.reorderLevel)
        .filter(item =>
            selectedCategory === 'All' || item.category === selectedCategory
        )
        .filter(item =>
            item.itemName.toLowerCase().includes(searchTerm.toLowerCase())
        );

    return (
        <div className="flex h-screen w-screen">
            <div className="w-64 bg-white shadow h-full">
                <AdminSidebar collapsed={collapsed} setCollapsed={setCollapsed} />
            </div>

            {/* Main Content Section */}
            <div className="flex-1 bg-gray-100 p-6 h-full overflow-y-auto">
                <div className="bg-white rounded-lg shadow p-6">
                    <h2 className="text-2xl font-semibold mb-6">Low Stock Items</h2>

                    {/* Filters */}
                    <div className="flex gap-4 mb-6">
                        <input
                            type="text"
                            placeholder="Search items..."
                            className="px-4 py-2 border rounded-lg flex-1"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <select
                            className="px-4 py-2 border rounded-lg"
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                        >
                            <option value="All">All Categories</option>
                            <option value="Medicine">Medicine</option>
                            <option value="Equipment">Equipment</option>
                            <option value="Consumables">Consumables</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>

                    {/* Items Table */}
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-4 py-2 text-left">Item Name</th>
                                    <th className="px-4 py-2 text-left">Category</th>
                                    <th className="px-4 py-2 text-left">Quantity</th>
                                    <th className="px-4 py-2 text-left">Unit</th>
                                    <th className="px-4 py-2 text-left">Reorder Level</th>
                                    <th className="px-4 py-2 text-left">Expiry Date</th>
                                    <th className="px-4 py-2 text-left">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredItems.map(item => (
                                    <tr key={item.id} className="border-t">
                                        <td className="px-4 py-2">{item.itemName}</td>
                                        <td className="px-4 py-2">{item.category}</td>
                                        <td className="px-4 py-2">
                                            <span className="text-red-500 font-medium">
                                                {item.quantity}
                                            </span>
                                        </td>
                                        <td className="px-4 py-2">{item.unit}</td>
                                        <td className="px-4 py-2">{item.reorderLevel}</td>
                                        <td className="px-4 py-2">{item.expiryDate || '-'}</td>
                                        <td className="px-4 py-2">
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={() => handleEdit(item)}
                                                    className="text-blue-500 hover:text-blue-700"
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(item.id)}
                                                    className="text-red-500 hover:text-red-700"
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Edit Modal */}
                    {editingItem && (
                        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                            <div className="bg-white p-6 rounded-lg w-96">
                                <h3 className="text-lg font-semibold mb-4">Edit Item</h3>
                                <form onSubmit={handleUpdate} className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Quantity
                                        </label>
                                        <input
                                            type="number"
                                            value={editingItem.quantity}
                                            onChange={(e) => setEditingItem({
                                                ...editingItem,
                                                quantity: parseInt(e.target.value)
                                            })}
                                            className="w-full px-3 py-2 border rounded-lg"
                                            min="0"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Reorder Level
                                        </label>
                                        <input
                                            type="number"
                                            value={editingItem.reorderLevel}
                                            onChange={(e) => setEditingItem({
                                                ...editingItem,
                                                reorderLevel: parseInt(e.target.value)
                                            })}
                                            className="w-full px-3 py-2 border rounded-lg"
                                            min="0"
                                            required
                                        />
                                    </div>
                                    <div className="flex justify-end gap-2">
                                        <button
                                            type="button"
                                            onClick={() => setEditingItem(null)}
                                            className="px-4 py-2 border rounded-lg"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            className="px-4 py-2 bg-blue-500 text-white rounded-lg"
                                        >
                                            Save Changes
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default LowStockItems;