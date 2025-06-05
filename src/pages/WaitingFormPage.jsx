// src/components/WaitingFormPage.jsx
import React, { useState } from 'react';
import styles from './WaitingFormPage.module.css';
import { useParams, useNavigate } from 'react-router-dom';
import MenuList from '../components/WaitingForm/MenuList';
import WaitingInfo from '../components/WaitingForm/WaitingInfo';

export default function WaitingFormPage() {
  const { restaurantId } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    people: 1,
    request: '',
  });

  const [selectedMenus, setSelectedMenus] = useState([]);
  const [errors, setErrors] = useState({});
  const [currentWaitingTeams, setCurrentWaitingTeams] = useState(0);
  const [predictedWaitingTime, setPredictedWaitingTime] = useState(0);

  const handleWaitingInfoLoaded = (teams, time) => {
    setCurrentWaitingTeams(teams);
    setPredictedWaitingTime(time);
  };

  const handleMenusLoaded = () => {
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
    setForm({ ...form, [name]: value });
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
        },
        body: JSON.stringify(reservationData),
      });

      if (response.ok) {
        alert('대기 등록이 성공적으로 완료되었습니다!');
        setForm({ people: 1, request: '' });
        setSelectedMenus([]);
        setErrors({});
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
          {errors.menus && <p className={`${styles.errorMessage} ${styles.menusError}`}>
            {errors.menus}
          </p>}
          <div className={styles.totalPriceContainer}>
            <span className={styles.totalPriceLabel}>예상 가격: </span>
            <span className={styles.totalPriceValue}>{totalPrice.toLocaleString()}원</span>
          </div>
        </div>
      </div>

      <div className={styles.bottomBar}>
        <div className={styles.hiddenWaitingInfoContainer}>
            <WaitingInfo onDataLoaded={handleWaitingInfoLoaded} />
        </div>

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