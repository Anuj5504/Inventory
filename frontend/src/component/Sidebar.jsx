import React,{ useState } from "react";
import {
  Users,
  FileText,
  Video,
  LayoutDashboard,
  CheckSquare,
  Shield,
  BarChart2,
  Home,
  Settings,
  LogOut,
  UserCog,
  PlusSquare,
} from "lucide-react";
import clsx from "clsx";
import { HiOutlineUserCircle } from "react-icons/hi";
import { Link } from "react-router-dom";

const sections = [
  {
    title: "Content",
    items: [
      { label: "Add item", icon: PlusSquare, href: "/inventory/add-item" },
      { label: "Low Stock Items", icon: Video, href: "/inventory/low-stock" },
    ],
  },
//   {
//     title: "Customization",
//     items: [
//       { label: "Hero", icon: LayoutDashboard, href: "/admin//customization/hero" },
//       { label: "FAQ", icon: CheckSquare, href: "/admin//customization/faq" },
//       { label: "Categories", icon: Shield, href: "/admin//customization/categories" },
//     ],
//   },
  {
    title: "Controllers",
    items: [{ label: "Vendors", icon: UserCog, href: "/admin/manage-team" }],
  },
//   {
//     title: "Analytics",
//     items: [{ label: "Courses Analytics", icon: BarChart2, href: "/admin//analytics/courses" }],
//   },
];

export default function AdminSidebar({collapsed,setCollapsed}) {
  

  return (
    <nav
  className={clsx(
    "fixed top-0 left-0 bg-[#0a1435] text-white h-screen p-4 flex flex-col justify-between transition-all duration-300 shadow-lg overflow-y-auto",
    collapsed ? "w-20" : "w-64"
  )}
>
      <div>
        <div className="flex items-center justify-between">
          {!collapsed && (
            <h2 className="text-xl font-bold tracking-wide">Inventory</h2>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-1 rounded-md text-gray-500 hover:text-white flex justify-center items-center"
          >
            {collapsed ? (
              <span className="material-symbols-outlined cursor-pointer">arrow_forward_ios</span>
            ) : (
              <span className="material-symbols-outlined cursor-pointer">arrow_back_ios</span>
            )}
          </button>
        </div>

        <div className="flex flex-col items-center my-6">
          <div className="800px:flex items-center gap-2">
            
              <HiOutlineUserCircle
                size={22}
                className="text-gray-700 dark:text-gray-300 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors"
              />
          </div>
          {!collapsed && (
            <>
              <h3 className="mt-2 text-lg font-semibold">Anuj</h3>
              <p className="text-sm text-gray-400">- Admin</p>
            </>
          )}
        </div>

        <ul className="space-y-2">
          <Link to="/inventory">
            <li className="cursor-pointer flex items-center p-2 rounded-md hover:bg-green-500 transition-transform duration-300 transform hover:scale-105">
              <Home className="w-6 h-6" />
              {!collapsed && <span className="ml-3">Dashboard</span>}
            </li>
          </Link>

          {sections.map((section) => (
            <div key={section.title} className="cursor-pointer">
              {!collapsed && (
                <h4 className="text-xs uppercase text-gray-400 font-semibold my-4">
                  {section.title}
                </h4>
              )}
              {section.items.map((item) => (
                <Link key={item.label} to={item.href} >
                  <li className="flex items-center p-2 rounded-md transition-transform duration-300 transform hover:scale-105 hover:bg-blue-600 cursor-pointer">
                    <item.icon className="w-6 h-6" />
                    {!collapsed && <span className="ml-3">{item.label}</span>}
                  </li>
                </Link>
              ))}
            </div>
          ))}
        </ul>
      </div>

      <div className="mt-10">
        <Link to="/settings" >
          <li className="flex items-center p-2 rounded-md hover:bg-gray-700 transition-transform duration-300 transform hover:scale-105">
            <Settings className="w-6 h-6" />
            {!collapsed && <span className="ml-3">Settings</span>}
          </li>
        </Link>
        <Link to="/logout" >
          <li className="flex items-center p-2 rounded-md hover:bg-red-600 transition-transform duration-300 transform hover:scale-105">
            <LogOut className="w-6 h-6" />
            {!collapsed && <span className="ml-3">Logout</span>}
          </li>
        </Link>
      </div>
    </nav>
  );
}
