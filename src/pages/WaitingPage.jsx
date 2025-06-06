import { useState, useEffect } from 'react';
import styles from './WaitingPage.module.css';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';

export default function WaitingStatusPage() {
  const { restaurantId } = useParams();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

  const [restaurantName, setRestaurantName] = useState('식당 이름을 불러오는 중...');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [myOrder, setMyOrder] = useState(0);
  const [expectedWaitTime, setExpectedWaitTime] = useState(0);
  const [specialRequests, setSpecialRequests] = useState('요청사항 없음');
  const [totalGuests, setTotalGuests] = useState(0);
  const [currentReservationId, setCurrentReservationId] = useState(null);
  // ⭐ 여기에 현재 활성화된 예약의 전체 데이터를 저장할 상태를 추가합니다.
  const [activeReservationData, setActiveReservationData] = useState(null);

  const today = new Date();
  const reservationDate = `${today.getFullYear()}.${(today.getMonth() + 1)
    .toString()
    .padStart(2, '0')}.${today.getDate().toString().padStart(2, '0')}`;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const restaurantResponse = await axios.get(
          `http://localhost:8080/api/restaurants/${restaurantId}`
        );
        setRestaurantName(restaurantResponse.data.restaurantName || '알 수 없는 식당'); 

        if (user && user.memberId) {
          const reservationResponse = await axios.get(
            `http://localhost:8080/api/members/${user.memberId}/reservations`
          );
          const reservationData = reservationResponse.data.find(
            (reservation) => 
              reservation.restaurantId === parseInt(restaurantId) &&
              reservation.status === 'REQUESTED' 
          );

          if (reservationData) {
            setCurrentReservationId(reservationData.id); 
            setMyOrder(reservationData.turnTime || 0);
            setExpectedWaitTime(reservationData.predictedWait || 0);
            setSpecialRequests(reservationData.requestDetail || '요청사항 없음');
            setTotalGuests(reservationData.partySize || 0);
            // ⭐ 활성화된 예약의 전체 데이터를 저장합니다.
            setActiveReservationData(reservationData); 
          } else {
            setError('해당 식당에 활성화된 예약 정보가 없습니다.'); 
            setCurrentReservationId(null); 
            setActiveReservationData(null); // 예약 없으면 데이터도 초기화
          }
        } else {
          setError('로그인 정보가 없습니다.');
          setCurrentReservationId(null); 
          setActiveReservationData(null); // 로그인 없으면 데이터도 초기화
        }
      } catch (err) {
        console.error('데이터를 불러오는 중 오류 발생:', err);
        setError('데이터를 불러오는 데 실패했습니다.');
        setCurrentReservationId(null); 
        setActiveReservationData(null); // 오류 발생 시 데이터 초기화
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [restaurantId, user]); 

  const handleCancelWaiting = async () => {
    if (!currentReservationId || !activeReservationData) { // 전체 데이터도 있는지 확인
      alert('취소할 예약 정보가 없습니다.');
      return;
    }

    if (window.confirm('정말로 웨이팅을 취소하시겠습니까?')) {
      try {
        // ⭐ 핵심 수정: 기존 예약 데이터 복사 후 status만 변경하여 전송
        const updatedReservation = { 
          ...activeReservationData, // 기존 예약 정보 전체 복사
          status: 'CANCELLED'       // status만 'CANCELLED'로 변경
        };

        await axios.put(
          `http://localhost:8080/api/members/${user.memberId}/reservations`,
          updatedReservation // 변경된 전체 예약 객체를 본문으로 전송
        );
        alert('✅ 웨이팅 취소가 완료되었습니다.');
        navigate('/maindisplay'); 
      } catch (error) {
        console.error('웨이팅 취소 실패:', error);
        alert('웨이팅 취소에 실패했습니다. 다시 시도해주세요.');
      }
    }
  };

  const handleEntered = async () => {
    if (!currentReservationId || !activeReservationData) { // 전체 데이터도 있는지 확인
      alert('입장 처리할 예약 정보가 없습니다.');
      return;
    }

    if (window.confirm('입장 처리하시겠습니까?')) {
      try {
        // ⭐ 핵심 수정: 기존 예약 데이터 복사 후 status만 변경하여 전송
        const updatedReservation = { 
          ...activeReservationData, // 기존 예약 정보 전체 복사
          status: 'JOINED'          // status만 'JOINED'로 변경
        };

        await axios.put(
          `http://localhost:8080/api/members/${user.memberId}/reservations`,
          updatedReservation // 변경된 전체 예약 객체를 본문으로 전송
        );
        alert('✅ 입장이 완료되었습니다.');
        navigate('/maindisplay'); 
      } catch (error) {
        console.error('입장 처리 실패:', error);
        alert('입장 처리에 실패했습니다. 다시 시도해주세요.');
      }
    }
  };

  if (loading) {
    return (
      <div className={styles.container}>
        <p>로딩 중...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.container}>
        <p>{error}</p>
        <button className={styles.refreshButton} onClick={() => window.location.reload()}>다시 시도</button>
      </div>
    );
  }

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