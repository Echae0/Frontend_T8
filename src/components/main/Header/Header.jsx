import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { FaKey, FaChevronDown, FaBell, FaUser } from 'react-icons/fa';
import './Header.css';

const Header = ({ location, setLocation }) => {
  const [isLocationOpen, setIsLocationOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleLogout = () => {
    // accessToken 확인 (디버깅용 로그)
    const token = localStorage.getItem("token");
    console.log("📦 token:", token);

    // 사용자에게 안내 메시지
    alert("✅ 로그아웃합니다.");

    // 토큰 제거
    localStorage.removeItem("token"); // ✅ 삭제
    console.log("삭제 후:", localStorage.getItem("token")); // null 이어야 정상

    console.log("🗑️ Token 삭제 완료");

    // 로그인 페이지로 이동
    navigate("/login");
    console.log("➡️ 로그인 페이지로 이동");
  };

  const locations = [
    '강남구', '서초구', '송파구',
    '마포구', '용산구', '종로구',
    '중구', '영등포구'
  ];

  const handleLocationChange = (loc) => {
    setLocation(loc);
    setIsLocationOpen(false);
  };

  const handleSearch = (e) => {
    if (e.key === 'Enter') {
      console.log('검색어:', searchQuery);
      // TODO: 검색 결과 페이지 이동 또는 필터링 로직
    }
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
            <FaChevronDown className={`icon ${isLocationOpen ? 'open' : ''}`} />
          </button>
          {isLocationOpen && (
            <div className="location-dropdown">
              {locations.map((loc) => (
                <button
                  key={loc}
                  className={`location-option ${loc === location ? 'active' : ''}`}
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
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleSearch}
          />
        </div>
        <button className="icon-button" onClick={handleLogout}>
          <FaKey size={20} />
        </button>
        {/* 마이페이지 */}
          <Link to="/mypage">
            <button className="icon-button">
              <FaUser size={30} />
            </button>
          </Link>
        </div>
    </header>
  );
};

export default Header;
