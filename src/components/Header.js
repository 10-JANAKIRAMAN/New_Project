import React, { useState, useRef, useEffect } from "react";
import { FaSearch, FaBell, FaUser, FaCog, FaQuestionCircle } from "react-icons/fa";

const Header = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [notifications, setNotifications] = useState(3); // sample count

  const menuRef = useRef(null);
  const searchRef = useRef(null);

  const sampleData = [
    "Design Project",
    "Marketing Campaign",
    "Development Sprint",
    "Bug Fixes",
    "Team Meeting",
    "Deadline Tasks",
  ];

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    if (value.trim() === "") {
      setSuggestions([]);
    } else {
      const filtered = sampleData.filter((item) =>
        item.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filtered);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setSuggestions([]);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="header">
      {/* Logo */}
      <div className="logo">TaskFlow Pro</div>

      {/* Navigation */}
      <nav className="menu">
        <a href="/">Dashboard</a>
        <a href="/">Projects</a>
        <a href="/">Calendar</a>
        <a href="/">Reports</a>
        <a href="/">Settings</a>
      </nav>

      {/* Right Section (Search + Notification + Profile) */}
      <div className="header-right">
        {/* Search */}
        <div className="search-bar" ref={searchRef}>
          <FaSearch />
          <input
            type="text"
            placeholder="Search tasks, projects..."
            value={searchQuery}
            onChange={handleSearchChange}
          />
          {suggestions.length > 0 && (
            <div className="search-suggestions">
              {suggestions.map((item, idx) => (
                <div key={idx} className="suggestion-item">
                  {item}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Single Notification Bell */}
        <div className="notification">
          <FaBell />
          {notifications > 0 && <span className="badge">{notifications}</span>}
        </div>

        {/* Profile */}
        <div className="profile" ref={menuRef}>
          <button
            className="profile-button"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <img
              src="https://ui-avatars.com/api/?name=Janaki+Raman&size=32&background=007bff&color=fff&rounded=true"
              alt="user"
              className="avatar"
            />
            <span>JanakiRaman</span>
          </button>

          {menuOpen && (
            <div className="profile-menu">
              <a href="/profile">
                <FaUser /> Profile Settings
              </a>
              <a href="/preferences">
                <FaCog /> Preferences
              </a>
              <a href="/help">
                <FaQuestionCircle /> Help
              </a>
            </div>
          )}
        </div>
      </div>

      <style>{`
        .header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.5rem 1.5rem;
          background: #1f2937;
          color: white;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }

        .logo {
          font-size: 1.3rem;
          font-weight: bold;
          color: #60a5fa;
        }

        .menu {
          display: flex;
          gap: 1.5rem;
        }

        .menu a {
          text-decoration: none;
          color: white;
          font-weight: 500;
          transition: color 0.2s ease;
        }

        .menu a:hover {
          color: #60a5fa;
        }

        .header-right {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        /* Search Bar */
        .search-bar {
          position: relative;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: #374151;
          padding: 0.3rem 0.6rem;
          border-radius: 20px;
        }

        .search-bar input {
          border: none;
          outline: none;
          background: transparent;
          color: white;
          width: 200px;
        }

        .search-suggestions {
          position: absolute;
          top: 110%;
          left: 0;
          background: white;
          color: black;
          border-radius: 6px;
          box-shadow: 0 4px 8px rgba(0,0,0,0.15);
          width: 100%;
          max-height: 200px;
          overflow-y: auto;
          z-index: 100;
        }

        .suggestion-item {
          padding: 0.5rem 0.8rem;
          cursor: pointer;
        }

        .suggestion-item:hover {
          background: #f3f4f6;
        }

        /* Notification */
        .notification {
          position: relative;
          cursor: pointer;
          font-size: 1.2rem;
        }

        .badge {
          position: absolute;
          top: -5px;
          right: -8px;
          background: red;
          color: white;
          font-size: 0.7rem;
          font-weight: bold;
          border-radius: 50%;
          padding: 0.2rem 0.4rem;
        }

        /* Profile */
        .profile {
          position: relative;
        }

        .profile-button {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: #374151;
          padding: 0.3rem 0.6rem;
          border-radius: 20px;
          cursor: pointer;
          border: none;
          color: white;
        }

        .avatar {
          border-radius: 50%;
        }

        .profile-menu {
          position: absolute;
          top: 110%;
          right: 0;
          background: white;
          color: #1f2937;
          border-radius: 8px;
          box-shadow: 0 4px 10px rgba(0,0,0,0.15);
          display: flex;
          flex-direction: column;
          min-width: 180px;
          overflow: hidden;
          animation: fadeIn 0.15s ease-in-out;
        }

        .profile-menu a {
          padding: 0.7rem 1rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          text-decoration: none;
          color: #1f2937;
          font-size: 0.9rem;
          transition: background 0.2s ease;
        }

        .profile-menu a:hover {
          background: #f3f4f6;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-5px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </header>
  );
};

export default Header;
