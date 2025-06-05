// src/pages/MyPage.jsx
import { useState } from 'react';
import Sidebar from '../components/mypage/Sidebar';
import TopBar from '../components/mypage/TopBar';

import Home from '../components/mypage/Home';
import EditProfile from '../components/mypage/EditProfile';
import ReservationHistory from '../components/mypage/ReservationHistory';
import MyReviews from '../components/mypage/MyReviews';

import styles from './MyPage.module.css'; // ✅ CSS 모듈로 제대로 import

export default function MyPage() {
  const [view, setView] = useState('home');

  const renderView = () => {
    switch (view) {
      case 'home':
        return <Home />;
      case 'edit':
        return <EditProfile />;
      case 'reservation':
        return <ReservationHistory />;
      case 'reviews':
        return <MyReviews />;
      default:
        return <Home />;
    }
  };

  return (
    <div>
      <TopBar /> {/* ✅ 상단바 */}
      <div className={styles.layout}>
        <Sidebar setView={setView} />
        <div className={styles.mainContent}>
          <div className={styles.contentBox}>
            {renderView()}
          </div>
        </div>
      </div>
    </div>
  );
}
