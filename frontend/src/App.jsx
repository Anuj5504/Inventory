import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./component/Dashboard";
import AddItems from "./component/AddItems";
import LowStockItems from "./component/LowStockItems";
import InventoryNavbar from "./component/InventoryNavbar";
import StockAnalytics from "./component/StockAnalytics";

const App = () => {
  return (
    <div className="overflow-y-hidden overflow-x-hidden">
      <InventoryNavbar/>
      <Routes>
        <Route path="/inventory/" element={<Dashboard />} />
        <Route path="/inventory/add-item" element={<AddItems />} />
        <Route path="/inventory/low-stock" element={<LowStockItems />} />
        <Route path="/inventory/stock-analytics" element={<StockAnalytics />} />
        {/* <Route path="/add-item" element={<InventoryForm />} /> */}
      </Routes>
    </div>
  );
};

export default App;
