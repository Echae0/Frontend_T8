import React, { useState } from 'react';
import styles from './SignUpPage.module.css';

export default function SignUpPage() {
  const [name, setName] = useState(''); 
  const [email, setEmail] = useState(''); 
  const [password, setPassword] = useState(''); 
  const [phoneNumber, setPhoneNumber] = useState(''); 
  const [address, setAddress] = useState(''); 
  const [birthYear, setBirthYear] = useState(''); 
  const [birthMonth, setBirthMonth] = useState(''); 
  const [birthDay, setBirthDay] = useState(''); 

  const handleSubmit = (e) => {
    e.preventDefault();
    const dateOfBirth = `${birthYear}-${birthMonth}-${birthDay}`;
    console.log({
      name,
      email,
      password,
      phoneNumber,
      address,
      dateOfBirth,
    });
    alert('가입 요청이 제출되었습니다!');
    // 폼 초기화화
    setName('');
    setEmail('');
    setPassword('');
    setPhoneNumber('');
    setAddress('');
    setBirthYear('');
    setBirthMonth('');
    setBirthDay('');
  };

  return (
    <div className={styles.signUpContainer}>
      <div className={styles.signUpForm}>
        <h2 className={styles.formTitle}>회원 가입</h2>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="name" className={styles.formLabel}>성함</label>
            <input
              type="text"
              id="name"
              className={styles.formInput}
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="email" className={styles.formLabel}>이메일</label>
            <input
              type="email"
              id="email"
              className={styles.formInput}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="password" className={styles.formLabel}>비밀번호</label>
            <input
              type="password"
              id="password"
              className={styles.formInput}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="phoneNumber" className={styles.formLabel}>전화번호</label>
            <input
              type="tel"
              id="phoneNumber"
              className={styles.formInput}
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="address" className={styles.formLabel}>주소</label>
            <input
              type="text"
              id="address"
              className={styles.formInput}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>생년월일</label>
            <div className={styles.birthDateContainer}>
              <input
                type="number"
                id="birthYear"
                className={`${styles.birthInput} ${styles.birthYear}`}
                placeholder="년도"
                value={birthYear}
                onChange={(e) => setBirthYear(e.target.value)}
                min="1900"
                max={new Date().getFullYear()} 
                required
              />
              <span className={styles.birthSeparator}>/</span>
              <input
                type="number"
                id="birthMonth"
                className={`${styles.birthInput} ${styles.birthMonth}`}
                placeholder="월"
                value={birthMonth}
                onChange={(e) => setBirthMonth(e.target.value)}
                min="1"
                max="12"
                required
              />
              <span className={styles.birthSeparator}>/</span>
              <input
                type="number"
                id="birthDay"
                className={`${styles.birthInput} ${styles.birthDay}`}
                placeholder="일"
                value={birthDay}
                onChange={(e) => setBirthDay(e.target.value)}
                min="1"
                max="31"
                required
              />
            </div>
          </div>
          <button type="submit" className={styles.submitButton}>가입하기</button>
        </form>
      </div>
    </div>
  );
}