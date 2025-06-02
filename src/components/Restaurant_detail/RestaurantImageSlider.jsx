import styles from './RestaurantImageSlider.module.css';


const RestaurantImageSlider = () => {
  return (
    <div className={styles.singleImageContainer}>
      <img
        src="/assets/sample-images/restaurant1.jpg"
        alt="식당 대표 사진"
        className={styles.singleImage}
      />
    </div>
  );
};

export default RestaurantImageSlider;