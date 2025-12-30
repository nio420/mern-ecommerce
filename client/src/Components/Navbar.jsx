import { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { HiX } from "react-icons/hi";
import { assets } from "../Utils/assets";
import { ShopContext } from "../Context/ShopContext";
import {useNavigate} from 'react-router-dom'
import {toast} from 'react-toastify'

/* ------------------ NAV ITEMS ------------------ */
const navItems = [
  { name: "Home", path: "/" },
  { name: "Collection", path: "/collection" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
];

/* ------------------ NAV List ------------------ */
const NavList = () => {
  return (
    <nav className="hidden md:flex flex-1 justify-center">
      <ul className="flex items-center gap-12">
        {navItems.map((item) => (
          <li key={item.name} className="relative group">
            <NavLink to={item.path}>
              {({ isActive }) => (
                <>
                  <span
                    className={`
                      absolute left-1/2 -bottom-0.5 h-0.5 bg-primary-light rounded-full
                      transition-all duration-300 -translate-x-1/2
                      ${isActive ? "w-6" : "w-0 group-hover:w-6"}
                    `}
                  />
                  <span
                    className={`relative text-[16px] transition-all duration-300
                    ${
                      isActive
                        ? "text-primary font-semibold"
                        : "text-primary-dark hover:text-primary-light"
                    }`}
                  >
                    {item.name}
                  </span>
                </>
              )}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

/* ------------------ NAVBAR ------------------ */
const Navbar = () => {
  const [open, setOpen] = useState(false);
  const {setShowSearch, getCartCounts, token, setToken, setCartItems} = useContext(ShopContext)
  const navigate = useNavigate() 

  // Logout function 
  const logOut = ()=> {
    localStorage.removeItem('token')
    setToken()
    setCartItems({})
    navigate('/login')
  }

  return (
    <>
      {/* Navbar */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/80 shadow-sm md:shadow-none">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center ">
            <img src={assets.logo} alt="Logo" className="w-30 cursor-pointer" />
          </Link>

          {/* Desktop Menu */}
          <NavList />

          {/* Right Icons */}
          <div className="ml-auto flex items-center sm:gap-3 md:gap-3">
            {/* Search */}
            <button className="p-2 rounded-full hover:bg-gray-100 transition cursor-pointer">
              <img onClick={() => setShowSearch(true)} src={assets.search_icon} className="w-5 h-5" alt="Search" />
            </button>

            {/* Profile */}
            <div className="relative group">
              <button className="p-2 rounded-full hover:bg-gray-100 transition cursor-pointer">
                <img
                  onClick={()=> {if(!token) {navigate('/login')} else {toast.info("You are already logged in!")}}}
                  src={assets.profile_icon}
                  className="w-5 h-5"
                  alt="Profile"
                />
              </button>
              { token && 
              <div
                className="absolute right-0 top-12 w-40 bg-white rounded-xl shadow-xl
                opacity-0 invisible group-hover:visible group-hover:opacity-100 transition-all"
              >
                <p onClick={() => navigate('/profile')} className="px-3 py-3 hover:bg-gray-100 cursor-pointer">
                  My Profile
                </p>
                <p onClick={()=> navigate('/order')} className="px-3 py-3 hover:bg-gray-100 cursor-pointer">
                  Orders
                </p>
                <p onClick={logOut} className="px-3 py-3 hover:bg-gray-100 cursor-pointer">
                  Logout
                </p>
              </div>}
            </div> 

            {/* Cart */}
            <Link
              to="/cart"
              className="relative p-2 rounded-full hover:bg-gray-100 transition mr-1"
            >
              <img src={assets.cart_icon} className="w-5 h-5" alt="Cart" />
              <span
                className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-white
                text-[10px] flex items-center justify-center rounded-full"
              >
                {getCartCounts()}
              </span>
            </Link>

            {/* Mobile Menu Button */}
            {!open && (
              <button
                className="md:hidden p-2 rounded-full hover:bg-gray-100"
                onClick={() => setOpen(true)}
              >
                <img
                  src={assets.menu_icon}
                  className="w-5 h-5 ml-1.5"
                  alt="Menu"
                />
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <div
        className={`fixed inset-0 z-50 bg-black/40 transition-opacity duration-300
        ${open ? "opacity-100 visible" : "opacity-0 invisible"}`}
      >
        <aside
          className={`fixed left-0 top-0 w-72 h-full bg-white p-6
          transform transition-transform duration-300 ease-in-out
          ${open ? "translate-x-0" : "-translate-x-full"}`}
        >
          <div className="flex justify-between items-center mb-10">
            <img src={assets.logo} className="w-28" alt="Logo" />
            <HiX
              className="text-3xl cursor-pointer"
              onClick={() => setOpen(false)}
            />
          </div>

          <nav className="flex flex-col gap-6 text-lg">
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `relative inline-block transition-all duration-300
                  ${
                    isActive
                      ? "text-primary font-semibold after:w-10"
                      : "text-gray-700 hover:text-primary after:w-0 hover:after:w-6"
                  }
                    after:content-[''] after:absolute after:left-1 after:bottom-0
                    after:h-0.5 after:bg-primary after:rounded-full
                    after:transition-all after:duration-300`
                }
              >
                {item.name}
              </NavLink>
            ))}
          </nav>
        </aside>
      </div>
    </>
  );
};

export default Navbar;
