import React, { useState, useEffect } from 'react';
import styles from './WaitingPage.module.css';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function WaitingStatusPage() {
  const { restaurantId } = useParams();
  const navigate = useNavigate();

  const [restaurantName, setRestaurantName] = useState('식당 이름을 불러오는 중...');
  const [loadingRestaurantName, setLoadingRestaurantName] = useState(true);

  const [myOrder, setMyOrder] = useState(3);
  const [expectedWaitTime, setExpectedWaitTime] = useState(15);
  const [specialRequests, setSpecialRequests] = useState('토마토 못먹어요');
  const [totalGuests, setTotalGuests] = useState(2);

  const today = new Date();
  const reservationDate = `${today.getFullYear()}.${(today.getMonth() + 1).toString().padStart(2, '0')}.${today.getDate().toString().padStart(2, '0')}`;

  useEffect(() => {
    const fetchRestaurantName = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/restaurants/${restaurantId}`);
        setRestaurantName(response.data.restaurantName || '알 수 없는 식당');
      } catch (err) {
        console.error("식당 이름 불러오기 오류:", err);
        setRestaurantName('식당 이름 로드 실패');
      } finally {
        setLoadingRestaurantName(false);
      }
    };

    fetchRestaurantName();
  }, [restaurantId]);

  const handleCancelWaiting = () => {
    if (window.confirm('정말로 웨이팅을 취소하시겠습니까?')) {
      console.log('웨이팅 취소 처리');
      alert('✅ 웨이팅 취소가 완료되었습니다.');
      navigate('/maindisplay');
    }
  };

  const handleEntered = () => {
    if (window.confirm('입장 처리하시겠습니까?')) {
      console.log('✅ 입장이 완료되었습니다.');
      alert('✅ 입장이 완료되었습니다.'); 
      navigate('/maindisplay');
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.restaurantName}>
        {loadingRestaurantName ? '식당 이름을 불러오는 중...' : restaurantName}
      </h1>
      
      <p className={styles.currentOrder}>
        현재 나의 순서: <span className={styles.orderNumber}>{myOrder}번째 팀</span>
      </p>
      <p className={styles.expectedTime}>
        예상 대기 시간: <span className={styles.timeValue}>{expectedWaitTime}분</span>
      </p>

      <div className={styles.detailsContainer}>
        <div className={styles.detailItem}>
          <span className={styles.detailLabel}>예약날짜</span>
          <span className={styles.detailValue}>{reservationDate}</span>
        </div>
        <div className={styles.detailItem}>
          <span className={styles.detailLabel}>요청사항</span>
          <span className={styles.detailValue}>{specialRequests}</span>
        </div>
        <div className={styles.detailItem}>
          <span className={styles.detailLabel}>총 입장인원</span>
          <span className={styles.detailValue}>{totalGuests}명</span>
        </div>
      </div>

      <div className={styles.buttonGroup}>
        <button className={styles.cancelButton} onClick={handleCancelWaiting}>
          웨이팅 취소
        </button>
        <button className={styles.enteredButton} onClick={handleEntered}>
          입장했어요!
        </button>
      </div>
    </div>
  );
}