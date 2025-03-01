import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./component/Dashboard";
import AddItems from "./component/AddItems";
import LowStockItems from "./component/LowStockItems";

const App = () => {
  return (
    <div>
      
      <Routes>
        <Route path="/inventory/" element={<Dashboard />} />
        <Route path="/inventory/add-item" element={<AddItems />} />
        <Route path="/inventory/low-stock" element={<LowStockItems />} />
        {/* <Route path="/add-item" element={<InventoryForm />} /> */}
      </Routes>
    </div>
  );
};

export default App;
