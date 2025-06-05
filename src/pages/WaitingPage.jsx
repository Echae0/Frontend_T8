import React, { useState, useEffect } from 'react';
import styles from './WaitingPage.module.css';
import { useNavigate, useParams } from 'react-router-dom';
// import WaitingInfo from '../components/WaitingForm/WaitingInfo'; // WaitingInfo는 더 이상 필요 없으므로 제거합니다.

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
  const [specialRequests, setSpecialRequests] = useState('정보를 불러오는 중...');
  const [totalGuests, setTotalGuests] = useState(0);
  const [myReservationId, setMyReservationId] = useState(null);

  // WaitingInfo 콜백 함수는 더 이상 필요 없으므로 제거합니다.
  // const handleWaitingInfoLoaded = (currentWaitingTeamsOverall, predictedTimeOverall, restaurantData) => {
  //   if (restaurantData && restaurantData.name) {
  //     setRestaurantName(restaurantData.name);
  //   } else {
  //     setRestaurantName('식당 이름을 불러올 수 없음');
  //   }
  // };

  // 나의 예약 정보를 불러오는 useEffect
  useEffect(() => {
    const memberId = localStorage.getItem('memberId');
    const authToken = localStorage.getItem('authToken');

    if (!memberId || !authToken) {
      alert('로그인이 필요합니다.');
      navigate('/login');
      return;
    }

    const fetchMyReservationDetails = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/restaurants/${restaurantId}/reservations`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${authToken}`,
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const reservations = await response.json();
          const myReservation = reservations.find(
            (res) => res.memberId && res.memberId.toString() === memberId.toString()
          );

          if (myReservation) {
            // 식당 이름 업데이트 (reservation 객체 안에 restaurantName 필드가 있다고 가정)
            // 만약 reservations API 응답에 restaurantName이 없다면, 별도로 restaurant API를 호출해야 합니다.
            // 여기서는 myReservation 객체 안에 restaurantName이 있다고 가정합니다.
            setRestaurantName(myReservation.restaurantName || '식당 이름 없음'); 
            
            const myIndex = reservations.findIndex(
              (res) => res.memberId && res.memberId.toString() === memberId.toString()
            );
            if (myIndex !== -1) {
              setMyOrder(myIndex + 1);
            } else {
              setMyOrder(0);
            }
            
            // predictedWait는 나의 예약에 대한 예상 대기 시간
            setExpectedWaitTime(myReservation.predictedWait || 0); 
            
            setSpecialRequests(myReservation.requestDetail || '없음');
            setTotalGuests(myReservation.partySize || 0);
            
            // 예약 날짜 (백엔드에서 reservationDate 필드를 제공한다면)
            if (myReservation.reservationDate) {
                const resDate = new Date(myReservation.reservationDate);
                setReservationDate(`${resDate.getFullYear()}.${String(resDate.getMonth() + 1).padStart(2, '0')}.${String(resDate.getDate()).padStart(2, '0')}`);
            }

            setMyReservationId(myReservation.id); // 나의 예약 ID 저장
            
          } else {
            console.warn('현재 로그인된 사용자의 예약 정보를 찾을 수 없습니다.');
            alert('현재 식당에 대기 등록된 내역이 없습니다.');
            navigate(`/restaurant/${restaurantId}`);
          }
        } else {
          const errorData = await response.json();
          console.error('예약 정보를 불러오는데 실패했습니다:', errorData);
          alert('예약 정보를 불러오는데 오류가 발생했습니다.');
          navigate(`/restaurant/${restaurantId}`);
        }
      } catch (error) {
        console.error('네트워크 오류 또는 예약 정보 불러오기 실패:', error);
        alert('예약 정보를 불러오는 중 네트워크 오류가 발생했습니다.');
        navigate(`/restaurant/${restaurantId}`);
      }
    };

    fetchMyReservationDetails();
  }, [restaurantId, navigate]);

  const handleCancelWaiting = async () => {
    if (window.confirm('정말로 웨이팅을 취소하시겠습니까?')) {
      if (!myReservationId) {
        alert('취소할 웨이팅 정보를 찾을 수 없습니다.');
        return;
      }
      const authToken = localStorage.getItem('authToken');

      try {
        const response = await fetch(`http://localhost:8080/api/reservations/${myReservationId}/cancel`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${authToken}`,
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          alert('✅ 웨이팅 취소가 완료되었습니다.');
          navigate('/maindisplay');
        } else {
          const errorData = await response.json();
          console.error('웨이팅 취소 실패:', errorData);
          alert(`웨이팅 취소에 실패했습니다: ${errorData.message || '서버 오류'}`);
        }
      } catch (error) {
        console.error('네트워크 오류 또는 취소 실패:', error);
        alert('웨이팅 취소 중 오류가 발생했습니다.');
      }
    }
  };

  const handleEntered = async () => {
    if (window.confirm('입장 처리하시겠습니까?')) {
      if (!myReservationId) {
        alert('입장 처리할 웨이팅 정보를 찾을 수 없습니다.');
        return;
      }
      const authToken = localStorage.getItem('authToken');

      try {
        const response = await fetch(`http://8080/api/reservations/${myReservationId}/entered`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${authToken}`,
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          alert('✅ 입장이 완료되었습니다.');
          navigate('/maindisplay');
        } else {
          const errorData = await response.json();
          console.error('입장 처리 실패:', errorData);
          alert(`입장 처리에 실패했습니다: ${errorData.message || '서버 오류'}`);
        }
      } catch (error) {
        console.error('네트워크 오류 또는 입장 처리 실패:', error);
        alert('입장 처리 중 오류가 발생했습니다.');
      }
    }
  };

  return (
    <div className={styles.container}>
      {/* WaitingInfo 컴포넌트를 더 이상 렌더링하지 않습니다. */}
      {/* {restaurantId && <WaitingInfo onDataLoaded={handleWaitingInfoLoaded} />} */}

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