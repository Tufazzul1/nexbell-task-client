import { FaHome, FaNewspaper } from "react-icons/fa";
import { Link, NavLink, Outlet } from "react-router-dom";
import { useState, useEffect } from "react";

const Dashboard = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);


    useEffect(() => {
        const handleClickOutside = (event) => {
            if (!event.target.closest('.sidebar') && sidebarOpen) {
                setSidebarOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [sidebarOpen]);

    return (
        <div className="flex flex-col md:flex-row min-h-screen grow">
            {/* Sidebar */}
            <div
                className={`sidebar fixed z-20 top-0 left-0 h-full bg-green-200 text-gray-600 p-5 transition-transform duration-300 ease-in-out ${sidebarOpen ? "translate-x-0" : "-translate-x-full"
                    } md:translate-x-0 md:relative md:w-[20%] min-h-screen`}
            >
                <Link to={'/'} className="text-xl md:text-3xl flex justify-center font-bold mt-6">
                    TShop
                </Link>

                <div className="divider"></div>

                {/* Sidebar links for adding and editing products */}
                <ul className="space-y-4">
                    <li>
                        <NavLink
                            onClick={() => setSidebarOpen(false)}  
                            className={"flex gap-2 items-center"} to={'/dashboard/products/add'}>
                            <FaNewspaper />
                            Add Product
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            onClick={() => setSidebarOpen(false)}  
                            className={"flex gap-2 items-center"} to={'/dashboard/products/edit'}>
                            <FaNewspaper />
                            Edit Product
                        </NavLink>
                    </li>
                </ul>

                <div className="divider"></div>

                {/* Shared navigation links */}
                <ul className="space-y-4">
                    <li>
                        <NavLink
                            onClick={() => setSidebarOpen(false)}
                            className={"flex gap-2 items-center"} to={'/'}>
                            <FaHome />
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            onClick={() => setSidebarOpen(false)}
                            className={"flex gap-2 items-center"} to={'/products'}>
                            <FaNewspaper />
                            Products
                        </NavLink>
                    </li>
                </ul>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex justify-between items-center p-4 bg-green-200">
                <button
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                    className="text-gray-800">
                    {sidebarOpen ? "Close" : "Menu"}
                </button>
                <Link to={'/'} className="text-2xl font-bold">
                    TShop
                </Link>
            </div>

            {/* Main Content */}
            <div className="flex-1 p-4 mt-16 md:mt-0">
                <Outlet />
            </div>
        </div>
    );
};

export default Dashboard;

