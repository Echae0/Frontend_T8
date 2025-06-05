import { useState, useEffect } from 'react';
import styles from './WaitingFormPage.module.css';
import { useParams, useNavigate } from 'react-router-dom';
import MenuList from '../components/WaitingForm/MenuList';
import { useSelector } from 'react-redux';


export default function WaitingFormPage() {
  const { restaurantId } = useParams(); // URL 파라미터에서 restaurantId를 가져옵니다.
  const navigate = useNavigate(); // 페이지 이동을 위해 navigate 훅 추가
  const user = useSelector((state) => state.user); // state.user가 userSlice에 있는 데이터라고 가정

  useEffect(() => {
    if (user && user.id) {
      console.log("현재 로그인한 유저 ID:", user.id);
    } else {
      console.log("유저 정보가 없습니다.");
    }
  }, [user]);

  // 폼 입력 값 상태 관리: 이름(제거됨), 인원수, 요청 사항
  const [form, setForm] = useState({
    // name: '', // 'name' 상태 제거됨
    people: 1, // 초기값을 숫자 1로 설정
    request: '',
  });

  // 사용자가 선택한 메뉴 목록 상태 관리
  const [selectedMenus, setSelectedMenus] = useState([]);

  // 폼 유효성 검사 시 발생하는 에러 메시지 상태 관리
  const [errors, setErrors] = useState({});

  const handleMenusLoaded = () => {
    // MenuList에서 메뉴 데이터 로드 완료!
    // 필요하다면 여기서 추가 로직을 구현할 수 있습니다.
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
    // ⭐ 'people' 필드는 숫자로 명시적으로 변환하여 저장합니다.
    setForm({ ...form, [name]: name === 'people' ? Number(value) : value });
    setErrors((prev) => ({ ...prev, [name]: '' }));
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

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      const firstErrorField = Object.keys(newErrors)[0];
      const element = document.querySelector(`[name="${firstErrorField}"]`) || document.querySelector(`.${firstErrorField}Error`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    // 백엔드로 전송할 대기 등록 데이터 객체 구성
    const reservationData = {
      memberId: user.id, 
      partySize: form.people, 
      requestDetail: form.request,
      restaurantId: restaurantId
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
        alert('대기 등록이 성공적으로 완료되었습니다!');
        // 폼 초기화 및 에러 메시지 초기화
        setForm({ people: 1, request: '' });
        setSelectedMenus([]);
        setErrors({});
        navigate(`/restaurant/${restaurantId}/waiting`); // 웨이팅 완료 후 해당 음식점 상세 페이지로 이동
      } else {
        const errorData = await response.json();
        console.error('대기 등록 실패:', errorData);
        // 에러 메시지를 더 상세하게 출력하여 백엔드 오류 확인에 도움을 줍니다.
        alert(`대기 등록 실패: ${errorData.message || JSON.stringify(errorData) || '서버 오류가 발생했습니다.'}`);
      }
    } catch (error) {
      console.error('네트워크 오류 또는 요청 실패:', error);
      alert('대기 등록 중 오류가 발생했습니다. 네트워크 상태를 확인하거나 잠시 후 다시 시도해주세요.');
    }
  };

  const totalPrice = selectedMenus.reduce((sum, item) => sum + item.price, 0);
  const today = new Date().toISOString().split('T')[0];

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
        <div className={styles.waitingInfo}>
          <span className={styles.waitingText}>현재 웨이팅: <strong className={styles.waitingNumber}>10 팀</strong></span>
          <span className={styles.waitingText}> (예상 대기 시간: <strong className={styles.waitingTime}>xx</strong>)</span>
        </div>
        <button className={styles.submitButton} onClick={handleSubmit}>등록하기</button>
      </div>
    </div>
  );
}