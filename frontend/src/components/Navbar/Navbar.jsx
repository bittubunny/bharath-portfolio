import "./Navbar.css";

import { Link } from "react-router-dom";

import { useState } from "react";

import { FaBars, FaTimes } from "react-icons/fa";

function Navbar() {

  const [menuOpen, setMenuOpen] = useState(false);

  return (

    <nav className="navbar">

      <div className="logo">
        Bharath
      </div>

      <div
        className="menu-icon"
        onClick={() => setMenuOpen(!menuOpen)}
      >

        {menuOpen ? <FaTimes /> : <FaBars />}

      </div>

      <ul className={menuOpen ? "nav-links active" : "nav-links"}>

        <li>
          <Link to="/">Home</Link>
        </li>

        <li>
          <Link to="/about">About</Link>
        </li>

        <li>
          <Link to="/projects">Projects</Link>
        </li>

        <li>
          <Link to="/resume">Resume</Link>
        </li>

        <li>
          <Link to="/blog">Blog</Link>
        </li>

        <li>
          <Link to="/contact">Contact</Link>
        </li>

      </ul>

    </nav>

  );
}

export default Navbar;