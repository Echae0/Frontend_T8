import axios from "axios";
import { useEffect, useState } from "react";
import styles from './RestaurantInfo.module.css';


const RestaurantInfo = () => {
  
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    axios.get("http://localhost:8080/api/restaurants")
      .then((res) => {
        setRestaurants(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error:", err);
        setLoading(false);
      });
  }, []);

  // 임시로 첫 번째 식당만 표시
  const restaurant = restaurants.length > 0 ? restaurants[0] : null;

  if (loading) return <p>불러오는 중...</p>;
  if (!restaurant) return <p>식당 정보가 없습니다.</p>;
    
  return (
    <div className={styles.container}>
      <div className={styles.column_section}>
        <h2 className={styles.title}>{restaurant.restaurantName}</h2>
        <p className={styles.address}>{restaurant.location}</p>
      </div>

      {/* <div className={styles.column_section}>
        <p className={styles.label}>소개</p>
        <p className={styles.detail}>{restaurant.description || "소개 정보 없음"}</p>
      </div> */}

      <div className={styles.row_section}>
        <p className={styles.label}>영업시간</p>
        <p className={styles.detail}>{restaurant.openingHours || "영업시간 정보 없음"}</p>
        <p className={styles.label}>전화번호</p>
        <p className={styles.detail}>{restaurant.contactNumber || "전화번호 없음"}</p>
        <p className={styles.label}>주차</p>
        <p className={styles.detail}>{restaurant.parking || "주차 정보 없음"}</p>
      </div>
    </div>
  );
};

export default RestaurantInfo;
