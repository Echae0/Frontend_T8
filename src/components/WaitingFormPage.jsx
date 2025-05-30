import React, { useState, useEffect, useCallback } from 'react';
import styles from './WaitingFormPage.module.css';
import axios from 'axios'; // axios 임포트

const menuList = [
    { id: 1, name: '메뉴 이름 1', price: 8000, image: 'https://via.placeholder.com/150/FFC0CB/FFFFFF?text=Menu1' },
    { id: 2, name: '메뉴 이름 2', price: 7500, image: 'https://via.placeholder.com/150/ADD8E6/FFFFFF?text=Menu2' },
    { id: 3, name: '메뉴 이름 3', price: 10000, image: 'https://via.placeholder.com/150/90EE90/FFFFFF?text=Menu3' },
    { id: 4, name: '메뉴 이름 4', price: 9000, image: 'https://via.placeholder.2.com/150/FFD700/FFFFFF?text=Menu4' },
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
    const [currentWaitingCount, setCurrentWaitingCount] = useState(0);
    const [estimatedWaitingTime, setEstimatedWaitingTime] = useState('0분');

    const API_BASE_URL = 'http://localhost:8080/api/reservations'; // 백엔드 API 기본 URL

    // 현재 대기열 정보 가져오기 (useCallback으로 최적화)
    const fetchWaitingInfo = useCallback(async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/current`);
            const waitingList = response.data;
            setCurrentWaitingCount(waitingList.length);

            // 대기열이 있을 경우, 가장 마지막 팀의 예상 대기 시간을 표시
            if (waitingList.length > 0) {
                setEstimatedWaitingTime(waitingList[waitingList.length - 1].estimatedWaitingTime);
            } else {
                setEstimatedWaitingTime('0분'); // 대기열이 없으면 0분
            }
        } catch (error) {
            console.error('Error fetching waiting info:', error.response ? error.response.data : error.message);
            setCurrentWaitingCount(0);
            setEstimatedWaitingTime('정보 없음');
        }
    }, [API_BASE_URL]);


    useEffect(() => {
        fetchWaitingInfo(); // 컴포넌트 마운트 시 초기 정보 로드

        // 5초마다 대기열 정보 새로고침 (실시간 업데이트 효과)
        const intervalId = setInterval(fetchWaitingInfo, 5000);
        return () => clearInterval(intervalId); // 컴포넌트 언마운트 시 인터벌 해제
    }, [fetchWaitingInfo]);


    const handleMenuToggle = (menu) => {
        setSelectedMenus((prev) => {
            if (prev.find((item) => item.id === menu.id)) {
                return prev.filter((item) => item.id !== menu.id);
            } else {
                return [...prev, menu];
            }
        });
        setErrors((prev) => ({ ...prev, menus: '' })); // 메뉴 선택 시 메뉴 오류 메시지 제거
    };

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
        setErrors((prev) => ({ ...prev, [name]: '' })); // 입력 시 해당 필드의 오류 메시지 제거
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newErrors = {};

        // 유효성 검사 로직
        if (!form.name.trim()) {
            newErrors.name = '성함을 입력해주세요.';
        }
        if (form.people < 2) {
            newErrors.people = '인원수는 최소 2명 이상이어야 합니다.'; // 백엔드 @Min과 일치
        }
        if (selectedMenus.length === 0) {
            newErrors.menus = '메뉴를 하나 이상 선택해주세요.';
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            // 첫 번째 에러 필드로 스크롤 이동
            const firstErrorField = Object.keys(newErrors)[0];
            const element = document.querySelector(`[name="${firstErrorField}"]`) || document.querySelector(`.${firstErrorField}Error`);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
            return;
        }

        // 백엔드로 보낼 데이터 구성 (프론트의 필드명과 백엔드 DTO 필드명 매핑)
        const requestData = {
            name: form.name,
            people: form.people,
            request: form.request,
            // selectedMenus 배열을 JSON 문자열로 변환하여 백엔드로 전송
            selectedMenusJson: JSON.stringify(selectedMenus)
        };

        try {
            const response = await axios.post(API_BASE_URL, requestData);
            console.log('대기 등록 성공:', response.data);
            alert(`대기 등록이 완료되었습니다!\n성함: ${response.data.customerName}\n인원: ${response.data.numberOfPeople}명\n선택 메뉴: ${response.data.selectedMenus.map(m => m.name).join(', ')}\n요청 사항: ${response.data.specialRequests || '없음'}`);

            // 폼 초기화
            setForm({ name: '', people: 2, request: '' });
            setSelectedMenus([]);
            setErrors({});
            fetchWaitingInfo(); // 등록 후 대기열 정보 즉시 업데이트하여 숫자와 시간 갱신
        } catch (error) {
            console.error('대기 등록 실패:', error.response ? error.response.data : error.message);
            let errorMessage = '대기 등록 중 알 수 없는 오류가 발생했습니다.';

            if (error.response && error.response.data) {
                // 백엔드 @Valid 오류 메시지 처리 (FieldError 배열)
                if (error.response.data.errors && error.response.data.errors.length > 0) {
                    const backendErrors = {};
                    errorMessage = error.response.data.errors.map(err => {
                        if (err.field) {
                            backendErrors[err.field] = err.defaultMessage;
                            return `${err.field}: ${err.defaultMessage}`;
                        }
                        return err.defaultMessage || '유효성 검사 오류';
                    }).join('\n');
                    setErrors(prev => ({ ...prev, ...backendErrors })); // 백엔드 유효성 검사 오류를 프론트엔드에 표시
                } else if (error.response.data.message) {
                    errorMessage = error.response.data.message; // 일반적인 백엔드 에러 메시지
                }
            }
            alert(`대기 등록 실패: \n${errorMessage}`);
        }
    };

    const totalPrice = selectedMenus.reduce((sum, item) => sum + item.price, 0);
    const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD 형식

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
                    <span className={styles.waitingText}>현재 웨이팅: <strong className={styles.waitingNumber}>{currentWaitingCount} 팀</strong></span>
                    <span className={styles.waitingText}> (예상 대기 시간: <strong className={styles.waitingTime}>{estimatedWaitingTime}</strong>)</span>
                </div>
                <button className={styles.submitButton} onClick={handleSubmit}>등록하기</button>
            </div>
        </div>
    );
}