// ✅ 2. src/pages/RestaurantDetail.jsx
import { useEffect, useState } from 'react';
import styles from './RestaurantDetail.module.css';
import { Link } from 'react-router-dom';

import RestaurantImageSlider from '../components/Restaurant_detail/RestaurantImageSlider';
import RestaurantInfo from '../components/Restaurant_detail/RestaurantInfo';
import MenuList from '../components/Restaurant_detail/MenuList';
import MenuPreview from '../components/Restaurant_detail/MenuPreview';
import ReviewList from '../components/Restaurant_detail/ReviewList';
import ReviewList_select from '../components/Restaurant_detail/ReviewList_select';

const RestaurantDetail = () => {
  const [selectedMenu, setSelectedMenu] = useState(null);
  const [restaurant, setRestaurant] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("selectedRestaurant");
    if (stored) {
      setRestaurant(JSON.parse(stored));
    }
  }, []);

  if (!restaurant) return <div>로딩 중...</div>;

  return (
    <div className={styles.container}>
      <RestaurantImageSlider restaurant={restaurant} />

      <div className={styles.infoSection}>
        <RestaurantInfo restaurant={restaurant} />
      </div>

      <div className={styles.contentWrapper}>
        <div className={styles.leftColumn}>
          {selectedMenu && <MenuPreview menu={selectedMenu} />}
          <MenuList setSelectedMenu={setSelectedMenu} />
        </div>

        <div className={styles.rightColumn}>
          <ReviewList_select />
        </div>
      </div>

      <div className={styles.bottomReviewSection}>
        <ReviewList isBottomSection />
      </div>

      <div className={styles.waitingButtonContainer}>
        <Link to="/restaurant/waiting">
          <button className={styles.waitingButton}>웨이팅</button>
        </Link>
      </div>
    </div>
  );
};

export default RestaurantDetail;
