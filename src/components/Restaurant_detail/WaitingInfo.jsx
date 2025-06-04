import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from './WaitingInfo.module.css';
import axios from "axios";

const WaitingInfo = () => {
  const { restaurantId } = useParams();
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
      <p className={styles.waitingInfo}>현재 대기 인원: {restaurant.currentWaitingTeams}팀</p>
      <p className={styles.waitingInfo}>예상 대기시간: {restaurant.predictedWaitingTime}분</p>
    </div>
  );
};

export default WaitingInfo;
