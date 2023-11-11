import React from "react";
import "./header.css";

function Header() {
  return (
    <div>
      <header className="header">
        <a href="/landing" className="logo">
          Anonymate
        </a>
        <input className="menu-btn" type="checkbox" id="menu-btn" />
        <label className="menu-icon" htmlFor="menu-btn">
          <span className="navicon"></span>
        </label>
        <ul className="menu">
          <li>
            <a href="#work">Sign-up</a>
          </li>
          <li>
            <a href="#about">Donate</a>
          </li>
         
          <li>
            <a href="#contact">Blog</a>
          </li>
          <li>
            <a href="#contact">Contact</a>
          </li>
        </ul>
      </header>
    </div>
  );
}
export default Header;