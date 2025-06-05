import React, { useState, useEffect } from 'react';
import styles from './WaitingPage.module.css';
import { useNavigate, useParams } from 'react-router-dom';
import WaitingInfo from '../components/WaitingForm/WaitingInfo';

export default function WaitingStatusPage() {
  const { restaurantId } = useParams();
  const navigate = useNavigate();

  const getTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}.${month}.${day}`;
  };

  const [restaurantName, setRestaurantName] = useState('정보를 불러오는 중...');
  const [myOrder, setMyOrder] = useState(0);
  const [expectedWaitTime, setExpectedWaitTime] = useState(0);
  const [reservationDate, setReservationDate] = useState(getTodayDate());
  const [specialRequests, setSpecialRequests] = useState('토마토 못먹어요');
  const [totalGuests, setTotalGuests] = useState(2);

  const handleWaitingInfoLoaded = (currentWaitingTeams, predictedTime, restaurantData) => {
    setExpectedWaitTime(predictedTime);
    setMyOrder(currentWaitingTeams);

    if (restaurantData && restaurantData.restaurantName) {
      setRestaurantName(restaurantData.restaurantName);
    } else {
      setRestaurantName('식당 이름을 불러올 수 없음');
    }
  };

  useEffect(() => {
    // 여기에 실제 예약 정보를 불러오는 API 호출 로직을 추가할 수 있습니다.
    // (예: /api/members/{memberId}/reservations/{reservationId} 등)
  }, [restaurantId]);

  const handleCancelWaiting = () => {
    if (window.confirm('정말로 웨이팅을 취소하시겠습니까?')) {
      console.log('웨이팅 취소 처리');
      // 백엔드 웨이팅 취소 API 호출 로직 추가
      alert('✅ 웨이팅 취소가 완료되었습니다.');
      navigate('/maindisplay');
    }
  };

  const handleEntered = () => {
    if (window.confirm('입장 처리하시겠습니까?')) {
      console.log('✅ 입장이 완료되었습니다.');
      // 백엔드 입장 처리 API 호출 로직 추가
      alert('✅ 입장이 완료되었습니다.');
      navigate('/maindisplay');
    }
  };

  return (
    <div className={styles.container}>
      {restaurantId && <WaitingInfo onDataLoaded={handleWaitingInfoLoaded} />}

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