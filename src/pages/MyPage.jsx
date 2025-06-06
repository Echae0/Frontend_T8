// src/pages/MyPage.jsx
import { useState, useEffect } from 'react';
import Sidebar from '../components/mypage/Sidebar';
import TopBar from '../components/mypage/TopBar';
import { useSelector } from 'react-redux';
import Home from '../components/mypage/Home';
import EditProfile from '../components/mypage/EditProfile';
import ReservationHistory from '../components/mypage/ReservationHistory';
import MyReviews from '../components/mypage/MyReviews';
import styles from './MyPage.module.css'; // ✅ CSS 모듈로 제대로 import
import axios from 'axios';


export default function MyPage() {
  const [view, setView] = useState('home');
  const user = useSelector((state) => state.user);
  const [username, setUsername] = useState(""); // 이름 상태 추가


  useEffect(() => {
    if (user && user.memberId) {
      axios
        .get(`http://localhost:8080/api/members/${user.memberId}`)  // 예: 유저 정보 API
        .then((res) => {
          setUsername(res.data.name || "손님");
        })
        .catch((err) => {
          console.error("❌ 유저 이름 가져오기 실패:", err);
          setUsername("손님");
        });
    } else {
      setUsername("손님");
    }
  }, [user]);

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
      <TopBar username={username} /> {/* ✅ 상단바 */}
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
