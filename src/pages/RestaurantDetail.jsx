import styles from './RestaurantDetail.module.css';
import RestaurantImageSlider from '../components/RestaurantImageSlider';
import RestaurantInfo from '../components/RestaurantInfo';
import MenuPreview from '../components/MenuPreview';
import MenuList from '../components/MenuList';
import ReviewList from '../components/ReviewList';
import WaitingButton from '../components/WaitingButton';

const RestaurantDetail = () => {
  return (
    <div className={styles.container}>
      <RestaurantImageSlider />
      
      <div className={styles.infoSection}>
        <RestaurantInfo />
        <WaitingButton />
      </div>

      <div className={styles.contentWrapper}>
        <div className={styles.leftColumn}>
          <MenuPreview />
          <MenuList />
        </div>

        <div className={styles.rightColumn}>
          <ReviewList />
        </div>
      </div>

      <div className={styles.bottomReviewSection}>
        <ReviewList isBottomSection />
      </div>

      <div className={styles.waitingButtonContainer}>
        <button className={styles.waitingButton}>웨이팅</button>
      </div>
    </div>
  );
};

export default RestaurantDetail;