import styles from './RestaurantInfo.module.css';

const RestaurantInfo = () => {
  
  const restaurant = {
    name: "새마을 식당",
    address: "신천동 400-2번지 동구 대구광역시 KR",
    hours: "매일 10:00 ~ 22:00",
    parking: "건물 뒤편 주차장 이용 가능",
    phone: "053-123-4567",
    description: "열탄불고기로 유명한 식당으로, 다양한 정식 메뉴를 제공합니다."
  };

  // const { name, address, hours, parking, phone, description } = restaurant;
  
  return (
    <div className={styles.container}>
      <div className={styles.column_section}>
        <h2 className={styles.title}>{restaurant.name}</h2>
        <p className={styles.address}>{restaurant.address}</p>
      </div>

      {/* <div className={styles.divider}></div> */}

      <div className={styles.column_section}>
        <p className={styles.label}>소개</p>
        <p className={styles.detail}>{restaurant.description}</p>
      </div>
      <div className={styles.row_section}>
        <p className={styles.label}>영업시간</p>
        <p className={styles.detail}>{restaurant.hours}</p>
        <p className={styles.label}>전화번호</p>
        <p className={styles.detail}>{restaurant.phone}</p>
        <p className={styles.label}>주차</p>
        <p className={styles.detail}>{restaurant.parking}</p>
      </div>
    </div>
  );
};

export default RestaurantInfo;
