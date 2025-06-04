// src/components/WaitingStatusPage.jsx
import React, { useState, useEffect } from 'react';
import styles from './WaitingPage.module.css';

import { useNavigate } from 'react-router-dom'; // 필요 시 주석 해제

export default function WaitingStatusPage() {
  const [restaurantName, setRestaurantName] = useState('새마을 식당');
  const [myOrder, setMyOrder] = useState(3);
  const [expectedWaitTime, setExpectedWaitTime] = useState(15);
  const [reservationDate, setReservationDate] = useState('2025.05.27');
  const [specialRequests, setSpecialRequests] = useState('토마토 못먹어요');
  const [totalGuests, setTotalGuests] = useState(2);

  const navigate = useNavigate();

  useEffect(() => {
    // API 호출 로직 (생략 가능)
  }, []);

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
      navigate('/maindisplay');  // ✅ 메인 페이지로 이동
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.restaurantName}>{restaurantName}</h1>
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