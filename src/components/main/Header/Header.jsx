// src/components/Header.jsx

import { Link } from 'react-router-dom';
import { FaUser } from 'react-icons/fa';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="container header-container">
        <div className="header-left">
          <strong className="site-name">MUCK.</strong>
        </div>
        <div className="header-center">
        </div>
        <div className="header-right">
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

