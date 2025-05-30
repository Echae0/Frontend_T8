import axios from "axios";
import { useEffect, useState } from "react";
import styles from './RestaurantInfo.module.css';
import { useParams } from "react-router-dom";

const RestaurantInfo = () => {
  const { restaurantId } = useParams(); // ✅ URL 파라미터로부터 restaurantId 추출
  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`http://localhost:8080/api/restaurants/${restaurantId}`) // ✅ 단일 식당 조회
      .then((res) => {
        setRestaurant(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error:", err);
        setLoading(false);
      });
  }, [restaurantId]);

  if (loading) return <p>불러오는 중...</p>;
  if (!restaurant) return <p>식당 정보를 불러올 수 없습니다.</p>;

  return (
    <div className={styles.container}>
      <div className={styles.column_section}>
        <h2 className={styles.title}>{restaurant.restaurantName}</h2>
        <p className={styles.address}>{restaurant.location}</p>
      </div>

      {/* 소개란: 필요한 경우 주석 해제 */}
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
