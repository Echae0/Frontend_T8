// src/components/Restaurant_detail/RestaurantInfo.jsx
import styles from './RestaurantInfo.module.css';

const RestaurantInfo = ({ restaurant }) => {
  if (!restaurant) return null;

  const {
    restaurantName,
    location,
    openingHours,
    contactNumber,
    description = '열탄불고기로 유명한 식당으로, 다양한 정식 메뉴를 제공합니다.'
  } = restaurant;

  return (
    <div className={styles.container}>
      <div className={styles.column_section}>
        <h2 className={styles.title}>{restaurantName}</h2>
        <p className={styles.address}>{location}</p>
      </div>

      <div className={styles.column_section}>
        <p className={styles.label}>소개</p>
        <p className={styles.detail}>{description}</p>
      </div>
      <div className={styles.row_section}>
        <p className={styles.label}>영업시간</p>
        <p className={styles.detail}>{openingHours}</p>
        <p className={styles.label}>전화번호</p>
        <p className={styles.detail}>{contactNumber}</p>
        <p className={styles.label}>주차</p>
        <p className={styles.detail}>건물 뒤편 주차장 이용 가능</p>
      </div>
    </div>
  );
};

export default RestaurantInfo;
