import React, { useState } from 'react';
import styles from './WaitingFormPage.module.css';

const menuList = [
  { id: 1, name: '메뉴 이름 1', price: 8000, image: 'https://via.placeholder.com/150/FFC0CB/FFFFFF?text=Menu1' },
  { id: 2, name: '메뉴 이름 2', price: 7500, image: 'https://via.placeholder.com/150/ADD8E6/FFFFFF?text=Menu2' },
  { id: 3, name: '메뉴 이름 3', price: 10000, image: 'https://via.placeholder.com/150/90EE90/FFFFFF?text=Menu3' },
  { id: 4, name: '메뉴 이름 4', price: 9000, image: 'https://via.placeholder.com/150/FFD700/FFFFFF?text=Menu4' },
  { id: 5, name: '메뉴 이름 5', price: 11000, image: 'https://via.placeholder.com/150/DDA0DD/FFFFFF?text=Menu5' },
  { id: 6, name: '메뉴 이름 6', price: 8500, image: 'https://via.placeholder.com/150/AFEEEE/FFFFFF?text=Menu6' },
  { id: 7, name: '메뉴 이름 7', price: 12000, image: 'https://via.placeholder.com/150/FF6347/FFFFFF?text=Menu7' },
  { id: 8, name: '메뉴 이름 8', price: 7800, image: 'https://via.placeholder.com/150/4682B4/FFFFFF?text=Menu8' },
  { id: 9, name: '메뉴 이름 9', price: 13000, image: 'https://via.placeholder.com/150/BA55D3/FFFFFF?text=Menu9' },
  { id: 10, name: '메뉴 이름 10', price: 5000, image: 'https://via.placeholder.com/150/F08080/FFFFFF?text=Menu10' },
  { id: 11, name: '메뉴 이름 11', price: 11000, image: 'https://via.placeholder.com/150/20B2AA/FFFFFF?text=Menu11' },
  { id: 12, name: '메뉴 이름 12', price: 9500, image: 'https://via.placeholder.com/150/87CEEB/FFFFFF?text=Menu12' },
];

export default function WaitingFormPage() {
  const [form, setForm] = useState({
    name: '',
    people: 2,
    request: '',
  });

  const [selectedMenus, setSelectedMenus] = useState([]);
  const [errors, setErrors] = useState({});

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

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};

    if (!form.name.trim()) {
      newErrors.name = '성함을 입력해주세요.';
    }
    if (form.people < 2) {
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

    alert(`대기 등록 완료!\n성함: ${form.name}\n인원: ${form.people}명\n선택 메뉴: ${selectedMenus.map(m => m.name).join(', ')}\n총 가격: ${totalPrice.toLocaleString()}원\n요청 사항: ${form.request || '없음'}`);

    setForm({ name: '', people: 2, request: '' });
    setSelectedMenus([]);
    setErrors({});
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
            {Array.from({ length: 9 }, (_, i) => i + 2).map((n) => (
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
          <div className={styles.menuGrid}>
            {menuList.map((menu) => (
              <div
                key={menu.id}
                className={`${styles.menuItem} ${selectedMenus.some((item) => item.id === menu.id) ? styles.selected : ''}`}
                onClick={() => handleMenuToggle(menu)}
              >
                <div className={styles.checkboxContainer}>
                  <input
                    type="checkbox"
                    checked={selectedMenus.some((item) => item.id === menu.id)}
                    readOnly
                    className={styles.checkbox}
                  />
                  <span className={styles.menuName}>{menu.name}</span>
                </div>
                <img src={menu.image} alt={menu.name} className={styles.menuImage} />
                <div className={styles.menuPrice}>가격: {menu.price.toLocaleString()}원</div>
              </div>
            ))}
          </div>
          {errors.menus && <p className={`${styles.errorMessage} ${styles.menusError}`}>{errors.menus}</p>}
          <div className={styles.totalPriceContainer}>
            <span className={styles.totalPriceLabel}>예상 가격: </span>
            <span className={styles.totalPriceValue}>{totalPrice.toLocaleString()}원</span>
          </div>
        </div>
      </div>

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