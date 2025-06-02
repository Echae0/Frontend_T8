import React, { useState } from 'react';
import styles from './LoginPage.module.css';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => { 
    e.preventDefault();

    const newErrors = {};

    if (!email.trim()) {
      newErrors.email = '이메일을 입력해주세요.';
    }
    if (!password.trim()) {
      newErrors.password = '비밀번호를 입력해주세요.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      const firstErrorField = Object.keys(newErrors)[0];
      const element = document.getElementById(firstErrorField) || document.querySelector(`[name="${firstErrorField}"]`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    setErrors({});

    const loginData = {
      email,
      password,
    };

    console.log('백엔드로 전송될 로그인 데이터:', loginData);

    try {
      const response = await fetch('http://localhost:8080/api/login', {
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

      <div className={styles.loginForm}>
        <h2 className={styles.formTitle}>로그인</h2> 
        <form onSubmit={handleSubmit}>
          <div className={styles['input-group']}>
            <label htmlFor="email" className={styles.formLabel}>이메일</label> 
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => { setEmail(e.target.value); setErrors((prevErrors) => ({ ...prevErrors, email: '' })); }} 
              placeholder="이메일을 입력하세요"
              className={`${styles['input-field']} ${errors.email ? styles.inputError : ''}`} 
              required 
            />
            {errors.email && <p className={styles.errorMessage}>{errors.email}</p>}
          </div>

          <div className={styles['input-group']}>
            <label htmlFor="password" className={styles.formLabel}>비밀번호</label> 
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => { setPassword(e.target.value); setErrors((prevErrors) => ({ ...prevErrors, password: '' })); }} 
              placeholder="비밀번호를 입력하세요"
              className={`${styles['input-field']} ${errors.password ? styles.inputError : ''}`}
              required 
            />
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