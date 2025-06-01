// src/components/WaitingFormPage.jsx
import React, { useState } from 'react';
import styles from './WaitingFormPage.module.css';
import { useParams } from 'react-router-dom';
import MenuList from './MenuList'; // MenuList 컴포넌트를 불러옵니다.

export default function WaitingFormPage() {
  const { restaurantId } = useParams(); // URL 파라미터에서 restaurantId를 가져옵니다.

  // 폼 입력 값 상태 관리: 이름, 인원수, 요청 사항
  const [form, setForm] = useState({
    name: '',
    people: 1,
    request: '',
  });

  // 사용자가 선택한 메뉴 목록 상태 관리
  const [selectedMenus, setSelectedMenus] = useState([]);
  
  // 폼 유효성 검사 시 발생하는 에러 메시지 상태 관리
  const [errors, setErrors] = useState({});

  // MenuList 컴포넌트에서 메뉴 데이터를 성공적으로 불러왔을 때 호출될 콜백 함수입니다.
  // WaitingFormPage에서는 불러온 전체 메뉴 데이터를 직접 사용하지 않아도 되므로,
  // PropTypes를 만족시키기 위한 더미 함수로 두거나 필요에 따라 디버깅 로깅으로 활용할 수 있습니다.
  const handleMenusLoaded = () => { // 'menus' 매개변수를 제거했습니다.
    // console.log("MenuList에서 메뉴 데이터 로드 완료!");
    // 현재 이 함수에서 메뉴 데이터를 WaitingFormPage의 상태로 저장할 필요가 없습니다.
    // MenuList 컴포넌트가 자체적으로 메뉴를 관리하고 렌더링합니다.
  };

  // MenuList로부터 전달받아 메뉴를 선택/해제하는 로직입니다.
  // 이 함수는 MenuList의 각 메뉴 아이템 클릭 시 호출됩니다.
  const handleMenuToggle = (menu) => {
    setSelectedMenus((prev) => {
      // 이미 선택된 메뉴라면 배열에서 제거하고, 아니면 배열에 추가합니다.
      if (prev.find((item) => item.id === menu.id)) {
        return prev.filter((item) => item.id !== menu.id);
      } else {
        return [...prev, menu];
      }
    });
    // 메뉴 선택/해제 시 메뉴 관련 에러 메시지를 초기화합니다.
    setErrors((prev) => ({ ...prev, menus: '' }));
  };

  // 폼 입력 필드(이름, 인원수, 요청 사항) 변경 핸들러
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value }); // 해당 필드의 값으로 폼 상태 업데이트
    setErrors((prev) => ({ ...prev, [name]: '' })); // 해당 필드의 에러 메시지 초기화
  };

  // 폼 제출 핸들러
  const handleSubmit = async (e) => {
    e.preventDefault(); // 기본 폼 제출 동작(페이지 새로고침) 방지

    const newErrors = {};

    // 폼 유효성 검사 로직
    if (!form.name.trim()) { // 이름이 비어있으면 에러
      newErrors.name = '성함을 입력해주세요.';
    }
    if (form.people < 1) { // 인원수가 1 미만이면 에러
      newErrors.people = '인원수를 선택해주세요.';
    }
    if (selectedMenus.length === 0) { // 선택된 메뉴가 없으면 에러
      newErrors.menus = '메뉴를 하나 이상 선택해주세요.';
    }

    // 에러가 하나라도 있다면 폼 제출을 막고 에러 메시지를 표시합니다.
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      // 첫 번째 에러가 발생한 필드로 스크롤하여 사용자에게 보여줍니다.
      const firstErrorField = Object.keys(newErrors)[0];
      const element = document.querySelector(`[name="${firstErrorField}"]`) || document.querySelector(`.${firstErrorField}Error`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return; // 폼 제출 중단
    }

    // 백엔드로 전송할 대기 등록 데이터 객체 구성
    const reservationData = {
      customerName: form.name,
      numberOfPeople: form.people,
      requestedMenus: selectedMenus.map(menu => ({
        menuId: menu.id,
        menuName: menu.name,
        price: menu.price
      })),
      specialRequests: form.request,
    };

    console.log("백엔드로 전송될 대기 등록 데이터:", reservationData);

    try {
      // fetch API를 사용하여 백엔드로 POST 요청을 보냅니다.
      const response = await fetch(`http://localhost:8080/api/restaurants/${restaurantId}/reservations`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // 필요하다면 'Authorization': `Bearer ${yourAuthToken}` 와 같은 인증 토큰을 추가합니다.
        },
        body: JSON.stringify(reservationData), // JavaScript 객체를 JSON 문자열로 변환하여 전송
      });

      if (response.ok) { // HTTP 상태 코드가 2xx (성공)인 경우
        alert('대기 등록이 성공적으로 완료되었습니다!');
        // 폼 초기화 및 에러 메시지 초기화
        setForm({ name: '', people: 1, request: '' });
        setSelectedMenus([]);
        setErrors({});
      } else { // HTTP 상태 코드가 2xx가 아닌 경우 (예: 4xx, 5xx)
        const errorData = await response.json(); // 서버에서 보낸 에러 응답 파싱
        console.error('대기 등록 실패:', errorData);
        alert(`대기 등록 실패: ${errorData.message || '서버 오류가 발생했습니다.'}`);
      }
    } catch (error) { // 네트워크 오류 등 요청 자체에서 예외 발생 시
      console.error('네트워크 오류 또는 요청 실패:', error);
      alert('대기 등록 중 오류가 발생했습니다. 네트워크 상태를 확인하거나 잠시 후 다시 시도해주세요.');
    }
  };

  // 선택된 메뉴들의 총 가격 계산
  const totalPrice = selectedMenus.reduce((sum, item) => sum + item.price, 0);
  
  // 오늘 날짜를 "YYYY-MM-DD" 형식으로 가져와서 표시
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
          <h2 className={styles.sectionTitle}>대기자 성함</h2>
          <input
            type="text"
            placeholder="성함을 입력해주세요."
            className={`${styles.inputField} ${errors.name ? styles.inputError : ''}`}
            name="name"
            value={form.name}
            onChange={handleFormChange}
            required
          />
          {errors.name && <p className={styles.errorMessage}>{errors.name}</p>}

          <h2 className={styles.sectionTitle}>인원 수</h2>
          <select
            className={`${styles.selectField} ${errors.people ? styles.inputError : ''}`}
            name="people"
            value={form.people}
            onChange={handleFormChange}
            required
          >
            {/* 1명부터 10명까지 인원수 선택 옵션 생성 */}
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
            // MenuList에서 메뉴 데이터를 성공적으로 불러왔을 때 호출됩니다.
            // 현재 WaitingFormPage에서는 불러온 전체 메뉴 데이터를 직접 사용하지 않아도 됩니다.
            onMenusLoaded={handleMenusLoaded} 
            // 현재 WaitingFormPage에서 관리하는 selectedMenus 상태를 MenuList에 전달하여
            // MenuList가 어떤 메뉴가 선택되었는지 시각적으로 표시할 수 있도록 합니다.
            selectedMenus={selectedMenus}
            // MenuList에서 메뉴 항목을 클릭했을 때 호출될 함수입니다.
            // 이 함수를 통해 WaitingFormPage의 selectedMenus 상태를 업데이트합니다.
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