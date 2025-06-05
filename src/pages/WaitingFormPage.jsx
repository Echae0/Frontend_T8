import React, { useState, useEffect } from 'react';
import styles from './WaitingFormPage.module.css';
import { useParams, useNavigate } from 'react-router-dom';
import MenuList from '../components/WaitingForm/MenuList';
import WaitingInfo from '../components/WaitingForm/WaitingInfo'; // WaitingInfo 컴포넌트 임포트
import { useSelector } from 'react-redux'; // Redux useSelector 훅 임포트

export default function WaitingFormPage() {
  const { restaurantId } = useParams();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user); // Redux store에서 유저 정보 가져오기

  // 폼 입력 값 상태 관리
  const [form, setForm] = useState({
    people: 1,
    request: '',
  });

  // 사용자가 선택한 메뉴 목록 상태 관리
  const [selectedMenus, setSelectedMenus] = useState([]);

  // 폼 유효성 검사 시 발생하는 에러 메시지 상태 관리
  const [errors, setErrors] = useState({});

  // 실시간 웨이팅 정보 상태 관리
  const [currentWaitingTeams, setCurrentWaitingTeams] = useState(0);
  const [predictedWaitingTime, setPredictedWaitingTime] = useState(0);

  // Redux에서 유저 정보가 로드되면 콘솔에 출력
  useEffect(() => {
    if (user && user.id) {
      console.log("현재 로그인한 유저 ID:", user.id);
    } else {
      console.log("유저 정보가 없습니다.");
      // 유저 정보가 없으면 로그인 페이지 등으로 리다이렉트하거나 경고를 표시할 수 있습니다.
      // navigate('/login');
    }
  }, [user]);

  // WaitingInfo 컴포넌트로부터 현재 웨이팅 팀 수와 예상 대기 시간을 받아 상태 업데이트
  const handleWaitingInfoLoaded = (teams, time) => {
    setCurrentWaitingTeams(teams);
    setPredictedWaitingTime(time);
  };

  const handleMenusLoaded = () => {
    // MenuList에서 메뉴 데이터 로드 완료 시 추가 작업이 필요하면 여기에 구현합니다.
  };

  const handleMenuToggle = (menu) => {
    setSelectedMenus((prev) => {
      if (prev.find((item) => item.id === menu.id)) {
        return prev.filter((item) => item.id !== menu.id);
      } else {
        return [...prev, menu];
      }
    });
    setErrors((prev) => ({ ...prev, menus: '' })); // 메뉴 선택 시 메뉴 에러 메시지 초기화
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    setErrors((prev) => ({ ...prev, [name]: '' })); // 입력 변경 시 해당 필드 에러 메시지 초기화
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};

    // 폼 유효성 검사 로직
    if (form.people < 1) {
      newErrors.people = '인원수를 선택해주세요.';
    }
    if (selectedMenus.length === 0) {
      newErrors.menus = '메뉴를 하나 이상 선택해주세요.';
    }

    // 에러가 있으면 상태 업데이트 및 스크롤 이동
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      const firstErrorField = Object.keys(newErrors)[0];
      const element = document.querySelector(`[name="${firstErrorField}"]`) || document.querySelector(`.${firstErrorField}Error`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    // Redux에서 가져온 user.id를 reservationData에 포함
    if (!user || !user.id) {
        alert('대기 등록을 위해 로그인 정보가 필요합니다.');
        navigate('/login'); // 로그인 페이지로 리다이렉트
        return;
    }

    // 백엔드로 전송할 대기 등록 데이터 객체 구성
    const reservationData = {
      memberId: user.id, // Redux store에서 가져온 유저 ID를 memberId로 사용
      partySize: form.people,
      requestedMenus: selectedMenus.map(menu => ({
        menuId: menu.id,
        menuName: menu.name,
        price: menu.price
      })),
      requestDetail: form.request,
    };

    console.log("백엔드로 전송될 대기 등록 데이터:", reservationData);

    try {
      const response = await fetch(`http://localhost:8080/api/restaurants/${restaurantId}/reservations`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // 인증이 필요하다면 여기에 Authorization 헤더를 추가합니다.
          // 'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
        },
        body: JSON.stringify(reservationData),
      });

      if (response.ok) {
        alert('대기 등록이 성공적으로 완료되었습니다!');
        // 폼 초기화 및 에러 메시지 초기화
        setForm({ people: 1, request: '' });
        setSelectedMenus([]);
        setErrors({});
        // 웨이팅 완료 후 해당 음식점의 웨이팅 상태 페이지로 이동 (WaitingStatusPage)
        navigate(`/restaurant/${restaurantId}/waiting`);
      } else {
        const errorData = await response.json();
        console.error('대기 등록 실패:', errorData);
        alert(`대기 등록 실패: ${errorData.message || '서버 오류가 발생했습니다.'}`);
      }
    } catch (error) {
      console.error('네트워크 오류 또는 요청 실패:', error);
      alert('대기 등록 중 오류가 발생했습니다. 네트워크 상태를 확인하거나 잠시 후 다시 시도해주세요.');
    }
  };

  const totalPrice = selectedMenus.reduce((sum, item) => sum + item.price, 0);
  const today = new Date().toISOString().split('T')[0]; // 오늘 날짜 YYYY-MM-DD 형식

  return (
    <div className={styles.pageContainer}>
      {/* 헤더 섹션 */}
      <div className={styles.header}>
        <h1 className={styles.headerTitle}>대기 등록</h1>
      </div>

      {/* 컨텐츠 영역: 폼 섹션과 메뉴 섹션 */}
      <div className={styles.contentArea}>
        {/* 대기자 정보 입력 섹션 */}
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

        {/* 메뉴 선택 섹션 - MenuList 컴포넌트가 이곳에 렌더링됩니다. */}
        <div className={styles.menuSection}>
          <h2 className={styles.sectionTitle}>메뉴</h2>
          <MenuList
            restaurantId={restaurantId} // MenuList에 restaurantId 전달
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

      {/* 하단 바: 현재 웨이팅 정보 및 등록 버튼 */}
      <div className={styles.bottomBar}>
        {/* WaitingInfo 컴포넌트를 숨겨진 채로 렌더링하여 데이터만 가져오도록 합니다. */}
        {/* restaurantId가 필요하므로 useParams로 가져온 값을 전달합니다. */}
        {restaurantId && (
          <div style={{ display: 'none' }}>
            <WaitingInfo onDataLoaded={handleWaitingInfoLoaded} />
          </div>
        )}

        <div className={styles.waitingInfo}>
          <span className={styles.waitingText}>
            현재 웨이팅: <strong className={styles.waitingNumber}>{currentWaitingTeams}팀</strong>
          </span>
          <span className={styles.waitingText}>
            (예상 대기 시간: <strong className={styles.waitingTime}>{predictedWaitingTime}분</strong>)
          </span>
        </div>
        <button className={styles.submitButton} onClick={handleSubmit}>등록하기</button>
      </div>
    </div>
  );
}