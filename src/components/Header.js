import React from "react";
import { FaBell, FaSearch } from "react-icons/fa";

const Header = () => {
  return (
    <header className="header">
      <div className="logo">TaskFlow Pro</div>
      <nav className="menu">
        <a href="/">Dashboard</a>
        <a href="/">Projects</a>
        <a href="/">Calendar</a>
        <a href="/">Reports</a>
        <a href="/">Settings</a>
      </nav>
      <div className="header-right">
        <div className="search-bar">
          <FaSearch />
          <input type="text" placeholder="Search tasks..." />
        </div>
        <div className="notification">
          <FaBell />
          <span className="badge">3</span>
        </div>
        <div className="profile">
          <img
            src="https://ui-avatars.com/api/?name=Janaki+Raman&size=32&background=007bff&color=fff&rounded=true
"
            alt="user"
            className="avatar"
          />
          <span>JanakiRaman</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
