import styles from './RestaurantInfo.module.css';

const RestaurantInfo = () => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>새마을 식당</h2>
      <p className={styles.address}>신천동 400-2번지 동구 대구광역시 KR</p>
      <p className={styles.hours}>영업시간: ~~~ | 주차: ~~~</p>
    </div>
  );
};

export default RestaurantInfo;