import { useState, useEffect } from 'react';
import styles from './WaitingFormPage.module.css';
import { useParams, useNavigate } from 'react-router-dom';
import MenuList from '../components/WaitingForm/MenuList';
import { useSelector } from 'react-redux';
import axios from 'axios'; // ⭐ axios 임포트 추가

export default function WaitingFormPage() {
  const { restaurantId } = useParams();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

  // ⭐ 현재 웨이팅 정보 상태 추가
  const [currentWaitingTeams, setCurrentWaitingTeams] = useState(0);
  const [predictedWaitingTime, setPredictedWaitingTime] = useState(0);
  const [waitingInfoLoading, setWaitingInfoLoading] = useState(true); // 웨이팅 정보 로딩 상태

  useEffect(() => {
    if (user && user.memberId) {
      console.log("현재 로그인한 유저 ID:", user.memberId);
    } else {
      console.log("유저 정보가 없습니다.");
    }
  }, [user]);

  useEffect(() => {
    axios.get(`http://localhost:8080/api/restaurants/${restaurantId}`)
      .then((res) => {
        // 데이터를 성공적으로 가져왔을 때 상태 업데이트
        setCurrentWaitingTeams(res.data.currentWaitingTeams || 0);
        setPredictedWaitingTime(res.data.predictedWaitingTime || 0);
        setWaitingInfoLoading(false);
      })
      .catch((err) => {
        console.error("웨이팅 정보를 불러오는 중 오류 발생:", err);
        setCurrentWaitingTeams(0); // 오류 발생 시 기본값
        setPredictedWaitingTime(0); // 오류 발생 시 기본값
        setWaitingInfoLoading(false);
      });
  }, [restaurantId]); // restaurantId가 변경될 때마다 다시 불러옴

  const [form, setForm] = useState({
    people: 1,
    request: '',
  });

  const [selectedMenus, setSelectedMenus] = useState([]);
  const [errors, setErrors] = useState({});

  const handleMenusLoaded = () => {
    // MenuList에서 메뉴 데이터 로드 완료!
  };

  const handleMenuToggle = (menu) => {
    setSelectedMenus((prev) => {
      if (prev.find((item) => item.id === menu.id)) {
        return prev.filter((item) => item.id !== menu.id);
      } else {
        return [...prev, menu];
      }
    });
    setErrors((prev) => ({ ...prev, menus: '' }));
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: name === 'people' ? Number(value) : value });
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};

    if (form.people < 1) {
      newErrors.people = '인원수를 선택해주세요.';
    }
    if (selectedMenus.length === 0) {
      newErrors.menus = '메뉴를 하나 이상 선택해주세요.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      const firstErrorField = Object.keys(newErrors)[0];
      const element = document.querySelector(`[name="${firstErrorField}"]`) || document.querySelector(`.${firstErrorField}Error`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    const reservationData = {
      memberId: user && user.memberId ? user.memberId : null,
      partySize: form.people,
      requestedMenus: selectedMenus.map(menu => ({ // ⭐ 다시 활성화
        menuId: menu.id,
        menuName: menu.name,
        price: menu.price
      })),
      requestDetail: form.request,
      restaurantId: restaurantId // ⭐ restaurantId도 함께 보냅니다.
    };

    console.log("백엔드로 전송될 대기 등록 데이터:", reservationData);

    try {
      const response = await fetch(`http://localhost:8080/api/restaurants/${restaurantId}/reservations`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reservationData),
      });

      if (response.ok) {
        setSelectedMenus([]);
        setErrors({});
        const result = await response.json();
        setForm({ people: result.partySize, request: result.requestDetail || '' });
        const reservationId = result.reservationId || result.id;
        navigate(`/waiting/${reservationId}`);
        alert('대기 등록이 성공적으로 완료되었습니다!');
      } else {
        const errorData = await response.json();
        console.error('대기 등록 실패:', errorData);
        alert(`대기 등록 실패: ${errorData.message || JSON.stringify(errorData) || '서버 오류가 발생했습니다.'}`);
      }
    } catch (error) {
      console.error('네트워크 오류 또는 요청 실패:', error);
      alert('이미 예약된 내역이 있는지 확인해 주세요.');
    }
  };

  const totalPrice = selectedMenus.reduce((sum, item) => sum + item.price, 0);
  const today = new Date().toISOString().split('T')[0];

  return (
    <div className={styles.pageContainer}>
      <div className={styles.header}>
        <h1 className={styles.headerTitle}>대기 등록</h1>
      </div>

      <div className={styles.contentArea}>
        <div className={styles.formSection}>
          <h2 className={styles.sectionTitle}>인원 수</h2>
          <select
            className={`${styles.selectField} ${errors.people ? styles.inputError : ''}`}
            name="people"
            value={form.people}
            onChange={handleFormChange}
            required
          >
            {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
              <option key={n} value={n}>{n}명</option>
            ))}
          </select>
          {errors.people && <p className={styles.errorMessage}>{errors.people}</p>}

          <h2 className={styles.sectionTitle}>날짜</h2>
          <input type="text" value={today} readOnly className={styles.readOnlyField} />

          <h2 className={styles.sectionTitle}>요청 사항</h2>
          <div className={styles.infoText}>ex. 견과류 알러지가 있어요 / 유아 의자가 필요해요.</div>
          <textarea
            rows={4}
            className={styles.textareaField}
            name="request"
            value={form.request}
            onChange={handleFormChange}
          ></textarea>
        </div>

        <div className={styles.menuSection}>
          <h2 className={styles.sectionTitle}>메뉴</h2>
          <MenuList
            onMenusLoaded={handleMenusLoaded}
            selectedMenus={selectedMenus}
            onMenuToggle={handleMenuToggle}
          />
          {errors.menus && <p className={`${styles.errorMessage} ${styles.menusError}`}>{errors.menus}</p>}
          <div className={styles.totalPriceContainer}>
            <span className={styles.totalPriceLabel}>예상 가격: </span>
            <span className={styles.totalPriceValue}>{totalPrice.toLocaleString()}원</span>
          </div>
        </div>
      </div>

      <div className={styles.bottomBar}>
        <div className={styles.waitingInfo}>
          {waitingInfoLoading ? ( // ⭐ 로딩 중일 때 표시
            <span className={styles.waitingText}>웨이팅 정보 불러오는 중...</span>
          ) : (
            <>
              <span className={styles.waitingText}>현재 웨이팅: <strong className={styles.waitingNumber}>{currentWaitingTeams} 팀</strong></span>
              <span className={styles.waitingText}> (예상 대기 시간: <strong className={styles.waitingTime}>{predictedWaitingTime} 분</strong>)</span>
            </>
          )}
        </div>
        <button className={styles.submitButton} onClick={handleSubmit}>등록하기</button>
      </div>
    </div>
  );
}