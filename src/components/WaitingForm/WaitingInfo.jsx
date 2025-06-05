// src/components/WaitingForm/WaitingInfo.jsx
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from "axios";

const WaitingInfo = ({ onDataLoaded }) => {
  const { restaurantId } = useParams();
  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`http://localhost:8080/api/restaurants/${restaurantId}`)
      .then((res) => {
        setRestaurant(res.data);
        setLoading(false);
        if (onDataLoaded) {
          onDataLoaded(res.data.currentWaitingTeams, res.data.predictedWaitingTime);
        }
      })
      .catch((err) => {
        console.error("웨이팅 정보를 불러오는 중 오류 발생:", err);
        setLoading(false);
        if (onDataLoaded) {
          onDataLoaded(0, 0);
        }
      });
  }, [restaurantId, onDataLoaded]);

  if (loading) return <p style={{ display: 'none' }}>불러오는 중...</p>;
  if (!restaurant) return <p style={{ display: 'none' }}>식당 정보를 불러올 수 없습니다.</p>;

  return (
    <div style={{ display: 'none' }}>
    </div>
  );
};

export default WaitingInfo;