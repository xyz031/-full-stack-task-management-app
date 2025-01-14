import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-blue-500 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">
          FoodApp
        </Link>
        <ul className="flex space-x-6">
          <li>
            <Link to="/menu" className="hover:text-gray-200">
              Menu
            </Link>
          </li>
          <li>
            <Link to="/orders" className="hover:text-gray-200">
              Order
            </Link>
          </li>
        
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
