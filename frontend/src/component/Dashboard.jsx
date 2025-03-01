import React, { useState } from 'react';
import AdminSidebar from './Sidebar';

const Dashboard = () => {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <div>
      <div className="flex">
        <div className="flex w-full">
          <div className="w-1/5">
            <AdminSidebar collapsed={collapsed} setCollapsed={setCollapsed} />
          </div>
          <div className="w-4/5 p-6 bg-gray-100">
            <div className="grid grid-cols-4 gap-4 mb-6">
              {/* Summary Metrics */}
              <div className="bg-white p-4 rounded-lg shadow">
                <h3 className="text-gray-500 text-sm">Total Items</h3>
                <p className="text-2xl font-bold">2,543</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow">
                <h3 className="text-gray-500 text-sm">Low Stock Items</h3>
                <p className="text-2xl font-bold text-orange-500">45</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow">
                <h3 className="text-gray-500 text-sm">Out of Stock</h3>
                <p className="text-2xl font-bold text-red-500">12</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow">
                <h3 className="text-gray-500 text-sm">Expiring Soon</h3>
                <p className="text-2xl font-bold text-yellow-500">28</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6 mb-6">
              {/* Charts */}
              <div className="bg-white p-4 rounded-lg shadow">
                <h3 className="font-semibold mb-4">Category Breakdown</h3>
                <div className="h-64 bg-gray-50">{/* Add Chart Component Here */}</div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow">
                <h3 className="font-semibold mb-4">Stock Trends</h3>
                <div className="h-64 bg-gray-50">{/* Add Chart Component Here */}</div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow mb-6">
              {/* Inventory Table */}
              <div className="p-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-semibold">Inventory List</h3>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Search items..."
                      className="px-3 py-2 border rounded-lg"
                    />
                    <select className="px-3 py-2 border rounded-lg">
                      <option>All Categories</option>
                      <option>Medicines</option>
                      <option>Equipment</option>
                      <option>Supplies</option>
                    </select>
                  </div>
                </div>
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-2 text-left">Item Name</th>
                      <th className="px-4 py-2 text-left">Category</th>
                      <th className="px-4 py-2 text-left">Quantity</th>
                      <th className="px-4 py-2 text-left">Expiry Date</th>
                      <th className="px-4 py-2 text-left">Status</th>
                      <th className="px-4 py-2 text-left">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t">
                      <td className="px-4 py-2">Paracetamol</td>
                      <td className="px-4 py-2">Medicine</td>
                      <td className="px-4 py-2">150</td>
                      <td className="px-4 py-2">2024-12-31</td>
                      <td className="px-4 py-2">
                        <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                          In Stock
                        </span>
                      </td>
                      <td className="px-4 py-2">
                        <button className="text-blue-500 hover:text-blue-700">Update</button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow">
              {/* Recent Activity */}
              <div className="p-4">
                <h3 className="font-semibold mb-4">Recent Activity</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-sm">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    <p>New stock added: 200 units of Surgical Masks</p>
                    <span className="text-gray-400">2 hours ago</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                    <p>Low stock alert: Insulin (10 units remaining)</p>
                    <span className="text-gray-400">5 hours ago</span>
                  </div>
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
