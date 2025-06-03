import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen(!menuOpen);
  const navigate = useNavigate();

  const navLinkClass = ({ isActive }) =>
    `${
      isActive
        ? "text-[#ff5835] underline"
        : "text-gray-800 hover:text-[#ff5835]"
    } font-semibold`;

  return (
    <nav className="bg-white w-full shadow-sm fixed top-0 z-50 h-[77px] font-inter">
      <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
        <div onClick={() => navigate("/")} className="text-2xl font-bold tracking-wide font-lora">
          <span className="text-red-500">te</span>
          <span className="italic">sera</span>
        </div>

        <div className="hidden md:flex gap-10 items-center">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `font-lora ${navLinkClass({ isActive })}`
            }
          >
            Home
          </NavLink>
          <NavLink to="/feature" className={navLinkClass}>
            Feature
          </NavLink>
          <NavLink to="/about" className={navLinkClass}>
            About
          </NavLink>
          <NavLink to="/contact" className={navLinkClass}>
            Contact
          </NavLink>
        </div>

        <div className="hidden md:flex space-x-5 font-semibold">
          <button
            onClick={() => navigate("/register")}
            className="border border-gray-400 px-6 py-2 rounded-full hover:bg-gray-100"
          >
            Sign Up
          </button>
          <button
            onClick={() => navigate("/login")}
            className="bg-purple-500 text-white px-6 py-2 rounded-full hover:bg-purple-600"
          >
            Sign In
          </button>
        </div>

        <div className="md:hidden">
          <button onClick={toggleMenu}>
            <span className="text-2xl">{menuOpen ? "✖" : "☰"}</span>
          </button>
        </div>
      </div>

      <div
        className={`md:hidden transition-all duration-300 ease-in-out ${
          menuOpen ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0"
        } overflow-hidden bg-white px-6 pb-4 flex flex-col gap-4 border-t border-gray-200`}
      >
        <NavLink
          to="/"
          className={({ isActive }) =>
            `font-lora ${navLinkClass({ isActive })}`
          }
          onClick={() => setMenuOpen(false)}
        >
          Home
        </NavLink>
        <NavLink
          to="/feature"
          className={navLinkClass}
          onClick={() => setMenuOpen(false)}
        >
          Feature
        </NavLink>
        <NavLink
          to="/about"
          className={navLinkClass}
          onClick={() => setMenuOpen(false)}
        >
          About
        </NavLink>
        <NavLink
          to="/contact"
          className={navLinkClass}
          onClick={() => setMenuOpen(false)}
        >
          Contact
        </NavLink>
        <div className="flex flex-col gap-3 mt-2 font-semibold w-full">
          <button
            onClick={() => navigate("/register")}
            className="w-full border border-gray-400 px-5 py-2 rounded-full text-base hover:bg-gray-100"
          >
            Sign Up
          </button>
          <button
            onClick={() => navigate("/login")}
            className="w-full bg-purple-500 text-white px-5 py-2 rounded-full text-base hover:bg-purple-600"
          >
            Sign In
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
