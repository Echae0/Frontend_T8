// src/components/WaitingStatusPage.jsx
import React, { useState, useEffect } from 'react';
import styles from './WaitingPage.module.css';
import { useNavigate, useParams } from 'react-router-dom';
import WaitingInfo from '../components/WaitingForm/WaitingInfo';

export default function WaitingStatusPage() {
  const { restaurantId } = useParams();
  const navigate = useNavigate();

  // 현재 날짜를 YYYY.MM.DD 형식으로 가져오는 헬퍼 함수
  const getTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 +1
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}.${month}.${day}`;
  };

  const [restaurantName, setRestaurantName] = useState('새마을 식당');
  const [myOrder, setMyOrder] = useState(0);
  const [expectedWaitTime, setExpectedWaitTime] = useState(0);
  const [reservationDate, setReservationDate] = useState(getTodayDate());
  const [specialRequests, setSpecialRequests] = useState('토마토 못먹어요');
  const [totalGuests, setTotalGuests] = useState(2);

  // WaitingInfo로부터 데이터를 받을 콜백 함수
  const handleWaitingInfoLoaded = (currentWaitingTeams, predictedTime) => {
    // predictedTime (예상 대기 시간)은 WaitingInfo에서 받은 값을 그대로 사용
    setExpectedWaitTime(predictedTime);

    // currentWaitingTeams (현재 대기팀 수)를 myOrder에 설정합니다.
    // 만약 '내 앞에 대기 중인 팀 수'가 currentWaitingTeams라면,
    // 나의 순서는 'currentWaitingTeams + 1'이 됩니다. (이전 제안)
    // 현재 코드에서는 '나를 포함한 현재 대기팀의 총 수'로 해석하거나,
    // 백엔드에서 받은 currentWaitingTeams가 이미 '나의 순서'를 의미한다고 가정합니다.
    setMyOrder(currentWaitingTeams);
  };

  useEffect(() => {
    // 이펙트는 그대로 유지됩니다.
    // 여기에 실제 식당 이름, 예약 날짜, 요청 사항, 총 입장 인원 등
    // 나의 고유한 예약 정보를 불러오는 API 호출 로직을 추가할 수 있습니다.
    // (예: /api/members/{memberId}/reservations/{reservationId} 등)
  }, [restaurantId]);

  const handleCancelWaiting = () => {
    if (window.confirm('정말로 웨이팅을 취소하시겠습니까?')) {
      console.log('웨이팅 취소 처리');
      // 여기에 백엔드 웨이팅 취소 API 호출 로직 추가
      alert('✅ 웨이팅 취소가 완료되었습니다.');
      navigate('/maindisplay');
    }
  };

  const handleEntered = () => {
    if (window.confirm('입장 처리하시겠습니까?')) {
      console.log('✅ 입장이 완료되었습니다.');
      // 여기에 백엔드 입장 처리 API 호출 로직 추가
      alert('✅ 입장이 완료되었습니다.');
      navigate('/maindisplay');
    }
  };

  return (
    <div className={styles.container}>
      {/* WaitingInfo 컴포넌트를 숨겨진 채로 렌더링하여 데이터만 가져오도록 합니다. */}
      {/* restaurantId가 필요하므로 useParams로 가져온 값을 전달합니다. */}
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