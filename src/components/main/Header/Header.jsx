import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaKey, FaChevronDown, FaUser } from "react-icons/fa";
import PropTypes from "prop-types";
import "./Header.css";

const Header = ({ location, setLocation, searchQuery, setSearchQuery }) => {
  const [isLocationOpen, setIsLocationOpen] = useState(false);
  const navigate = useNavigate();

  const locations = [
    "전체",
    "강서구",
    "강동구",
    "강북구",
    "강남구",
    "서초구",
    "송파구",
    "마포구",
    "용산구",
    "종로구",
    "중구",
    "영등포구"
   
  ];

  const handleLogout = () => {
    if (window.confirm("로그아웃하시겠습니까?")) {
      alert("✅ 로그아웃합니다.");
      localStorage.removeItem("token");
      navigate("/login");
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleLocationChange = (loc) => {
    setLocation(loc);
    setIsLocationOpen(false);
  };

  return (
    <header className="header">
      <div className="container header-container">
        {/* 위치 선택 */}
        <div className="location-selector">
          <button
            className="location-button"
            onClick={() => setIsLocationOpen(!isLocationOpen)}
          >
            {location}
            <FaChevronDown className={`icon ${isLocationOpen ? "open" : ""}`} />
          </button>
          {isLocationOpen && (
            <div className="location-dropdown">
              {locations.map((loc) => (
                <button
                  key={loc}
                  className={`location-option ${loc === location ? "active" : ""}`}
                  onClick={() => handleLocationChange(loc)}
                >
                  {loc}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* 검색창 */}
        <div className="search-wrapper">
          <input
            type="text"
            className="search-input"
            placeholder="식당을 검색해 보세요..."
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>

        {/* 아이콘 */}
        <div className="top-icons">
          <button className="icon-button" onClick={handleLogout}>
            <FaKey size={30} />
          </button>
          <button className="icon-button" onClick={() => navigate("/mypage")}>
            <FaUser size={30} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;

Header.propTypes = {
  location: PropTypes.string.isRequired,
  setLocation: PropTypes.func.isRequired,
  searchQuery: PropTypes.string.isRequired,
  setSearchQuery: PropTypes.func.isRequired,
};
