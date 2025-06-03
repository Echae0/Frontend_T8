import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaChevronDown, FaBell, FaUser } from 'react-icons/fa';
import './Header.css';

const Header = ({ location, setLocation }) => {
  const [isLocationOpen, setIsLocationOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

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

        {/* 우측: 알림 + 마이페이지 */}
        <div className="header-icons">
          <button
            className="icon-button"
            onClick={() => console.log('알림 클릭')}
          >
            <FaBell size={30} />
          </button>
          <Link to="/mypage">
            <button className="icon-button">
              <FaUser size={30} />
            </button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
