import { useState } from 'react';
import styles from './RestaurantDetail.module.css';
import { Link } from 'react-router-dom';

import RestaurantImageSlider from '../components/Restaurant_detail/RestaurantImageSlider.jsx';
import RestaurantInfo from '../components/Restaurant_detail/RestaurantInfo';
// import WaitingInfo from '../components/main/Restaurant_detail/WaitingInfo';

import MenuList from '../components/Restaurant_detail/MenuList';
import MenuPreview from '../components/Restaurant_detail/MenuPreview';

import ReviewList from '../components/Restaurant_detail/ReviewList';
// import ReviewList_select from '../components/Restaurant_detail/ReviewList_select';

const RestaurantDetail = () => {
  const [selectedMenu, setSelectedMenu] = useState(null);

  return (
    <div className={styles.container}>
      <RestaurantImageSlider />
      
      <div className={styles.infoSection}>
        <RestaurantInfo />
        {/* <WaitingInfo /> */}
      </div>

      <div className={styles.contentWrapper}>
        <div className={styles.leftColumn}>
          {selectedMenu && <MenuPreview menu={selectedMenu} />}
          {/* <MenuList setSelectedMenu={setSelectedMenu} /> */}
        </div>

        <div className={styles.rightColumn}>
          
          <MenuList setSelectedMenu={setSelectedMenu} />
          {/* <ReviewList_select /> */}
        </div>
      </div>

      <div className={styles.bottomReviewSection}>
        <ReviewList isBottomSection />
      </div>

      <div className={styles.waitingButtonContainer}>
        {/* ✅ Link로 감싸기 */}
        <Link to="/restaurant/waiting">
          <button className={styles.waitingButton}>웨이팅</button>
        </Link>
      </div>
    </div>
  );
};

export default RestaurantDetail;
