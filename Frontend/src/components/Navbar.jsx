/* eslint-disable no-unused-vars */
import { useContext, useState } from "react";
import { assets } from "../assets/assets.js";
import { Link, NavLink } from "react-router-dom";
import { ShopContext } from "../context/ShopContext.jsx";
import { useLocation } from 'react-router-dom';

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const location = useLocation(); // Get the current location
  // Check if the current path is "/collection"
  const isCollectionPage = location.pathname === '/collection';

  const { setShowSearch, getCartCount, navigate, accessToken, setAccessToken, setCartItems } = useContext(ShopContext);

  const logout = () => {
    navigate('/login')
    localStorage.removeItem('accessToken');
    setAccessToken('');
    setCartItems({});
  }

  return (
    // Logo section
    <div className="flex items-center justify-between py-5 font-medium">
      <Link to="/">
        <img src={assets.logo} className="w-36" alt="" />
      </Link>

      <ul className="hidden sm:flex gap-5 text-sm text-gray-700">
        <NavLink to="/" className="flex flex-col items-center gap-1">
          <p>HOME</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
        <NavLink to="/collection" className="flex flex-col items-center gap-1">
          <p>COLLECTION</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
        <NavLink to="/about" className="flex flex-col items-center gap-1">
          <p>ABOUT</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
        <NavLink to="/contact" className="flex flex-col items-center gap-1">
          <p>CONTACT</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700  hidden" />
        </NavLink>
      </ul>
      {/* Right corner side of navbar */}
      <div className="flex items-center gap-6">

        <div>
          {/* Conditionally render the icon based on the path */}
          {isCollectionPage && (
            <img
              onClick={() => setShowSearch(true)}
              src={assets.search_icon}
              className="w-5 cursor-pointer"
              alt="Search Icon"
            />
          )}
        </div>
        <div className="group relative">

          <img
            onClick={() => accessToken ? null : navigate('login')}
            className="w-5 cursor-pointer"
            src={assets.profile_icon}
            alt=""
          />

          {/* Dropdown Menu */}
          {
            accessToken &&
            <div className="group-hover:block hidden absolute dropdown-menu right-0 pt-4">
              <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded">
                {/* <p className="cursor-pointer hover:text-black">My Profile</p> */}
                <p onClick={() => navigate('/orders')} className="cursor-pointer hover:text-black">Orders</p>
                <p onClick={logout} className="cursor-pointer hover:text-black">Logout</p>
              </div>
            </div>
          }
        </div>
        <Link to="/cart" className="relative">
          <img src={assets.cart_icon} className="w-5 min-w-5" alt="" />
          <p className="absoulte right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]">
            {getCartCount()}
          </p>
        </Link>
        <img
          onClick={() => setVisible(true)}
          className="w-5 cursor-pointer sm:hidden"
          src={assets.menu_icon}
          alt=""
        />
      </div>

      {/* Side Menubar for small screen */}
      <div
        className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all 
          ${visible ? "w-full" : "w-0"}`}
      // ternary operator
      >
        <div className="flex flex-col text-gray-600 ">
          <div
            onClick={() => setVisible(false)}
            className="flex items-center gap-4 p-3 cursor-pointer"
          >
            <img className="h-4 rotate-180" src={assets.dropdown_icon} alt="" />
            <p>Back</p>
          </div>
          <NavLink
            onClick={() => setVisible(false)}
            className="py-2 pl-6 border"
            to="/"
          >
            HOME
          </NavLink>
          <NavLink
            onClick={() => setVisible(false)}
            className="py-2 pl-6 border"
            to="/collection"
          >
            COLLECTION
          </NavLink>
          <NavLink
            onClick={() => setVisible(false)}
            className="py-2 pl-6 border"
            to="/about"
          >
            ABOUT
          </NavLink>
          <NavLink
            onClick={() => setVisible(false)}
            className="py-2 pl-6 border"
            to="/contact"
          >
            CONTACT
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
