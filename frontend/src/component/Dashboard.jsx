import React, { useState, useEffect } from 'react';
import AdminSidebar from './Sidebar';

const Dashboard = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [recentActivity, setRecentActivity] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const itemsPerPage = 10;

  const isExpiringSoon = (expiryDate) => {
    if (!expiryDate) return false;
    const today = new Date();
    const expiry = new Date(expiryDate);
    const differenceInDays = Math.ceil((expiry - today) / (1000 * 60 * 60 * 24));
    return differenceInDays <= 7 && differenceInDays > 0;
  };

  const isExpired = (expiryDate) => {
    if (!expiryDate) return false;
    const today = new Date();
    const expiry = new Date(expiryDate);
    return expiry < today;
  };

  const fetchInventory = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/inventory/');
      if (!response.ok) throw new Error('Failed to fetch inventory');
      const data = await response.json();
      setItems(data);

      const activity = [];
      data.forEach(item => {
        if (item.quantity < item.reorderLevel) {
          activity.push({
            type: 'low_stock',
            item: item.itemName,
            quantity: item.quantity,
            timestamp: new Date()
          });
        }
        if (isExpiringSoon(item.expiryDate)) {
          activity.push({
            type: 'expiring_soon',
            item: item.itemName,
            expiryDate: item.expiryDate,
            timestamp: new Date()
          });
        }
      });
      setRecentActivity(activity);
    } catch (error) {
      setError('Failed to load inventory data');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInventory();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  const totalItems = items.length;
  const lowStockItems = items.filter(item => item.quantity < item.reorderLevel).length;
  const outOfStockItems = items.filter(item => item.quantity === 0).length;
  const expiringSoonItems = items.filter(item => isExpiringSoon(item.expiryDate)).length;

  const filteredInventoryItems = items
    .filter(item =>
      item.itemName.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (selectedCategory === 'All' || item.category === selectedCategory)
    );

  const totalPages = Math.ceil(filteredInventoryItems.length / itemsPerPage);
  const paginatedItems = filteredInventoryItems.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div>
      <div className="flex">
        <div className="flex w-full">
          <div className="w-1/5">
            <AdminSidebar
              collapsed={collapsed}
              setCollapsed={setCollapsed}
              currentPage="dashboard"
            />
          </div>
          <div className="w-4/5 p-6 bg-gray-100">
            {error && (
              <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg">
                {error}
              </div>
            )}

            <div className="grid grid-cols-4 gap-4 mb-6">
              <div className="bg-white p-4 rounded-lg shadow">
                <h3 className="text-gray-500 text-sm">Total Items</h3>
                <p className="text-2xl font-bold">{totalItems}</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow">
                <h3 className="text-gray-500 text-sm">Low Stock Items</h3>
                <p className="text-2xl font-bold text-orange-500">{lowStockItems}</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow">
                <h3 className="text-gray-500 text-sm">Out of Stock</h3>
                <p className="text-2xl font-bold text-red-500">{outOfStockItems}</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow">
                <h3 className="text-gray-500 text-sm">Expiring Soon</h3>
                <p className="text-2xl font-bold text-yellow-500">{expiringSoonItems}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6 mb-6">
              <div className="bg-white p-4 rounded-lg shadow">
                <h3 className="font-semibold mb-4">Category Breakdown</h3>
                <div className="h-64 bg-gray-50">
                  <div className="p-4">
                    {Object.entries(items.reduce((acc, item) => {
                      acc[item.category] = (acc[item.category] || 0) + 1;
                      return acc;
                    }, {})).map(([category, count]) => (
                      <div key={category} className="mb-2">
                        <div className="flex justify-between mb-1">
                          <span>{category}</span>
                          <span>{count}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-blue-500 rounded-full h-2"
                            style={{ width: `${(count / totalItems) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow">
                <h3 className="font-semibold mb-4">Stock Status</h3>
                <div className="h-64 overflow-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-2 text-left">Category</th>
                        <th className="px-4 py-2 text-left">In Stock</th>
                        <th className="px-4 py-2 text-left">Low Stock</th>
                        <th className="px-4 py-2 text-left">Out of Stock</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Object.entries(items.reduce((acc, item) => {
                        if (!acc[item.category]) {
                          acc[item.category] = { inStock: 0, lowStock: 0, outOfStock: 0 };
                        }
                        if (item.quantity === 0) acc[item.category].outOfStock++;
                        else if (item.quantity < item.reorderLevel) acc[item.category].lowStock++;
                        else acc[item.category].inStock++;
                        return acc;
                      }, {})).map(([category, stats]) => (
                        <tr key={category} className="border-t">
                          <td className="px-4 py-2">{category}</td>
                          <td className="px-4 py-2 text-green-600">{stats.inStock}</td>
                          <td className="px-4 py-2 text-orange-500">{stats.lowStock}</td>
                          <td className="px-4 py-2 text-red-500">{stats.outOfStock}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow mb-6">
              <div className="p-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-semibold">Inventory List</h3>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Search items..."
                      className="px-3 py-2 border rounded-lg"
                      value={searchQuery}
                      onChange={(e) => {
                        setSearchQuery(e.target.value);
                        setCurrentPage(1); 
                      }}
                    />
                    <select
                      className="px-3 py-2 border rounded-lg"
                      value={selectedCategory}
                      onChange={(e) => {
                        setSelectedCategory(e.target.value);
                        setCurrentPage(1); 
                      }}
                    >
                      <option value="All">All Categories</option>
                      <option value="Medicine">Medicine</option>
                      <option value="Equipment">Equipment</option>
                      <option value="Consumables">Consumables</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-2 text-left">Item Name</th>
                      <th className="px-4 py-2 text-left">Category</th>
                      <th className="px-4 py-2 text-left">Quantity</th>
                      <th className="px-4 py-2 text-left">Unit</th>
                      <th className="px-4 py-2 text-left">Expiry Date</th>
                      <th className="px-4 py-2 text-left">Status</th>
                      <th className="px-4 py-2 text-left">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedItems.map(item => (
                      <tr key={item._id} className="border-t">
                        <td className="px-4 py-2">{item.itemName}</td>
                        <td className="px-4 py-2">{item.category}</td>
                        <td className="px-4 py-2">
                          <span className={`font-medium ${item.quantity < item.reorderLevel ? 'text-red-500' : 'text-gray-900'
                            }`}>
                            {item.quantity}
                          </span>
                        </td>
                        <td className="px-4 py-2">{item.unit}</td>
                        <td className="px-4 py-2">
                          {item.expiryDate ? new Date(item.expiryDate).toLocaleDateString() : '-'}
                        </td>
                        <td className="px-4 py-2">
                          {item.quantity === 0 ? (
                            <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-sm">
                              Out of Stock
                            </span>
                          ) : item.quantity < item.reorderLevel ? (
                            <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm">
                              Low Stock
                            </span>
                          ) : (
                            <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                              In Stock
                            </span>
                          )}
                        </td>
                        <td className="px-4 py-2">
                          <button className="text-blue-500 hover:text-blue-700">
                            Update
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <div className="flex justify-between items-center mt-4">
                  <div className="text-sm text-gray-500">
                    Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, filteredInventoryItems.length)} of {filteredInventoryItems.length} items
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                      className={`px-3 py-1 rounded border ${currentPage === 1
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-white text-gray-700 hover:bg-gray-50'
                        }`}
                    >
                      Previous
                    </button>
                    {[...Array(totalPages)].map((_, i) => (
                      <button
                        key={i + 1}
                        onClick={() => setCurrentPage(i + 1)}
                        className={`px-3 py-1 rounded border ${currentPage === i + 1
                          ? 'bg-blue-500 text-white'
                          : 'bg-white text-gray-700 hover:bg-gray-50'
                          }`}
                      >
                        {i + 1}
                      </button>
                    ))}
                    <button
                      onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                      disabled={currentPage === totalPages}
                      className={`px-3 py-1 rounded border ${currentPage === totalPages
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-white text-gray-700 hover:bg-gray-50'
                        }`}
                    >
                      Next
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow">
              <div className="p-4">
                <h3 className="font-semibold mb-4">Recent Activity</h3>
                <div className="space-y-3">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-center gap-3 text-sm">
                      <span className={`w-2 h-2 rounded-full ${activity.type === 'low_stock' ? 'bg-red-500' : 'bg-yellow-500'
                        }`}></span>
                      <p>
                        {activity.type === 'low_stock'
                          ? `Low stock alert: ${activity.item} (${activity.quantity} units remaining)`
                          : `Expiring soon: ${activity.item} (${new Date(activity.expiryDate).toLocaleDateString()})`
                        }
                      </p>
                      <span className="text-gray-400">
                        {new Date(activity.timestamp).toLocaleTimeString()}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
