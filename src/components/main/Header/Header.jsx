import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; 
import { FaKey, FaChevronDown, FaUser } from "react-icons/fa";
import PropTypes from "prop-types"; 
import "./Header.css";


const Header = ({ location, setLocation, restaurants, onSearch }) => {
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [isLocationOpen, setIsLocationOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();


  
  useEffect(() => {
    const filtered = restaurants.filter((restaurant) =>
      restaurant.restaurantName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    restaurant.description.toLowerCase().includes(searchQuery.toLowerCase())
  );
  setFilteredRestaurants(filtered);
}, [searchQuery, restaurants]);

const handleLogout = () => {
  const confirmLogout = window.confirm("로그아웃하시겠습니까?");
  if (confirmLogout) {
    // 사용자에게 안내 메시지
    alert("✅ 로그아웃합니다.");
    
    // 토큰 제거
    localStorage.removeItem("token");
    console.log("삭제 후:", localStorage.getItem("token")); // null 이어야 정상
    console.log("🗑️ Token 삭제 완료");
    
    // 로그인 페이지로 이동
    navigate("/login");
    console.log("➡️ 로그인 페이지로 이동");
  } else {
    console.log("❎ 로그아웃 취소됨");
  }
};

const locations = [
  "강남구",
  "서초구",
  "송파구",
  "마포구",
  "용산구",
  "종로구",
  "중구",
  "영등포구",
];

const handleSearch = (e) => {
  if (e.key === "Enter") {
    console.log("🔍 검색어:", searchQuery);
    onSearch?.(searchQuery);
  }
};
const handleChange = (e) => {
  const query = e.target.value;
  setSearchQuery(query);
  onSearch?.(query); // 🔴 여기서 실시간 호출
};
const handleLocationChange = (loc) => {
  setLocation(loc);
  setIsLocationOpen(false);
};


  return (
    <header className="header">
      <div className="container header-container">
        {/* 좌측: 위치 선택 */}
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
                  className={`location-option ${
                    loc === location ? "active" : ""
                  }`}
                  onClick={() => handleLocationChange(loc)}
                >
                  {loc}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* 중앙: 검색창 */}
        <div className="search-wrapper">
          <input
            type="text"
            className="search-input"
            placeholder="식당을 검색해 보세요..."
            value={searchQuery}
            // onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleSearch}
            onChange={handleChange}
          />
        </div>
        <div className="top-icons">
          <button className="icon-button" onClick={handleLogout}>
            <FaKey size={30} />
          </button>
          <button
            className="icon-button"
            onClick={() => navigate("/mypage")}
          >
            <FaUser size={30} />
          </button>
        </div>
      </div>
      {/* {searchQuery && (
        <div className="search-results">
          {filteredRestaurants.length > 0 ? (
            filteredRestaurants.map((restaurant) => (
              <div key={restaurant.id} className="search-result-item">
                <h4>{restaurant.name}</h4>
                <p>{restaurant.description}</p>
              </div>
            ))
          ) : (
            <p>검색 결과가 없습니다.</p>
          )}
        </div>
      )} */}
    </header>
    
  );
};

export default Header;

Header.propTypes = {
  location: PropTypes.string.isRequired,
  setLocation: PropTypes.func.isRequired,
  restaurants: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      description: PropTypes.string,
      onSearch: PropTypes.func.isRequired,
      restaurantName: PropTypes.string.isRequired,
    })
  ),
  onSearch: PropTypes.func.isRequired,
};
