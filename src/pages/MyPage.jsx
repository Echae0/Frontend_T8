import { useState } from 'react';
import Sidebar from '../components/mypage/Sidebar';
import Home from '../components/mypage/Home';
import EditProfile from '../components/mypage/EditProfile';
import ReservationHistory from '../components/mypage/ReservationHistory';
import FavoriteStores from '../components/mypage/FavoriteStores';
import MyReviews from '../components/mypage/MyReviews';
import Wishlist from '../components/mypage/Wishlist';

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
      case 'favorites':
        return <FavoriteStores />;
      case 'reviews':
        return <MyReviews />;
      case 'wishlist':
        return <Wishlist />;
      default:
        return <Home />;
    }
  };

  return (
    <div className="layout">
      <Sidebar setView={setView} />
      <div className="main-content">
        <div className="content-box">
          {renderView()}
        </div>
      </div>
    </div>
  );
}
