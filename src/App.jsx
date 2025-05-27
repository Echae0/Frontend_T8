import { useState } from 'react';
import Sidebar from './components/mypage/Sidebar';
import ReservationHistory from './components/mypage/ReservationHistory';
import EditProfile from './components/mypage/EditProfile';
import FavoriteStores from './components/mypage/FavoriteStores';
import MyReviews from './components/mypage/MyReviews';
import Wishlist from './components/mypage/Wishlist';
import Home from './components/mypage/Home';

import './App.css';

export default function App() {
  const [view, setView] = useState('Home');

  const renderView = () => {
  switch (view) {
    case 'home':
      return <Home />;
    case 'edit':
      return <EditProfile />;
    case 'reservation':
      return <ReservationHistory />;
    case 'favorite':
      return <FavoriteStores />;
    case 'review':
      return <MyReviews />;
    case 'wishlist':
      return <Wishlist />;
    default:
      return <Home />;
  }
};

  return (
    <div className="layout">
      {/* 사이드바 */}
      <div className="sidebar">
        <Sidebar setView={setView} currentView={view} />
      </div>

      {/* 메인 콘텐츠 */}
      <div className="main-content">
        {/* 상단바 */}
        <div className="top-bar">
          <h1 className="page-title">마이페이지</h1>
          <div className="top-icons">
            <button className="icon-button">💬</button>
            <button className="icon-button">👤</button>
          </div>
        </div>

        {/* 본문 영역 */}
        <div className="content-box">
          {renderView()}
        </div>
      </div>
    </div>
  );
}
