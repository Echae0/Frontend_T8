// src/components/LoginPage.jsx
import React, { useState } from 'react';
import styles from './LoginPage.module.css';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // 에러 메시지를 관리할 상태를 추가합니다.
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => { // 비동기 로직을 위해 async 추가
    e.preventDefault();

    const newErrors = {};

    // 1. 유효성 검사 로직 추가
    if (!email.trim()) {
      newErrors.email = '이메일을 입력해주세요.';
    }
    if (!password.trim()) {
      newErrors.password = '비밀번호를 입력해주세요.';
    }

    // 에러가 하나라도 있으면 업데이트하고 함수 종료
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      // 에러가 발생한 첫 번째 필드로 스크롤 (SignUpPage와 동일)
      const firstErrorField = Object.keys(newErrors)[0];
      const element = document.getElementById(firstErrorField) || document.querySelector(`[name="${firstErrorField}"]`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    // 에러가 없다면 에러 상태 초기화 (필요시)
    setErrors({});

    // 백엔드로 전송할 로그인 데이터 객체
    const loginData = {
      email,
      password,
    };

    console.log('백엔드로 전송될 로그인 데이터:', loginData);

    try {
      // 2. API 호출 로직 추가 (SignUpPage와 유사)
      const response = await fetch('http://localhost:8080/api/login', { // 실제 로그인 API 엔드포인트로 변경 필요
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });

      if (response.ok) {
        // 로그인 성공 처리
        const responseData = await response.json(); // 서버 응답 데이터 (예: 토큰 등)
        alert('로그인이 성공적으로 완료되었습니다!');
        console.log('로그인 성공:', responseData);
        // TODO: 로그인 성공 후 페이지 이동 로직 추가 (예: React Router의 useNavigate 훅 사용)
        // navigate('/dashboard'); 
      } else {
        // 로그인 실패 처리
        const errorData = await response.json();
        console.error('로그인 실패:', errorData);
        alert(`로그인 실패: ${errorData.message || '이메일 또는 비밀번호가 올바르지 않습니다.'}`);
      }
    } catch (error) {
      console.error('네트워크 오류 또는 요청 실패:', error);
      alert('로그인 중 오류가 발생했습니다. 네트워크 상태를 확인하거나 잠시 후 다시 시도해주세요.');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        <img src="/muck-logo.png" alt="MUCK 로고" />
      </div>
      {/* 폼을 감싸는 div 추가 (선택 사항이지만 SignUpPage와 구조를 맞춤) */}
      <div className={styles.loginForm}>
        <h2 className={styles.formTitle}>로그인</h2> {/* 제목 추가 */}
        <form onSubmit={handleSubmit}>
          {/* 이메일 입력 그룹 */}
          <div className={styles['input-group']}>
            <label htmlFor="email" className={styles.formLabel}>이메일</label> {/* formLabel 클래스 사용 */}
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => { setEmail(e.target.value); setErrors((prevErrors) => ({ ...prevErrors, email: '' })); }} // 입력 시 에러 메시지 초기화
              placeholder="이메일을 입력하세요"
              className={`${styles['input-field']} ${errors.email ? styles.inputError : ''}`} // 에러 시 inputError 클래스 적용
              required // HTML5 기본 유효성 검사도 활성화 (선택 사항)
            />
            {/* 에러 메시지 표시 */}
            {errors.email && <p className={styles.errorMessage}>{errors.email}</p>}
          </div>

          {/* 비밀번호 입력 그룹 */}
          <div className={styles['input-group']}>
            <label htmlFor="password" className={styles.formLabel}>비밀번호</label> {/* formLabel 클래스 사용 */}
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => { setPassword(e.target.value); setErrors((prevErrors) => ({ ...prevErrors, password: '' })); }} // 입력 시 에러 메시지 초기화
              placeholder="비밀번호를 입력하세요"
              className={`${styles['input-field']} ${errors.password ? styles.inputError : ''}`} // 에러 시 inputError 클래스 적용
              required // HTML5 기본 유효성 검사도 활성화 (선택 사항)
            />
            {/* 에러 메시지 표시 */}
            {errors.password && <p className={styles.errorMessage}>{errors.password}</p>}
          </div>

          <div className={styles['button-group']}>
            <button type="button" className={styles['signup-btn']}>
              회원가입
            </button>
            <button type="submit" className={styles['login-btn']}>
              LOGIN
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}