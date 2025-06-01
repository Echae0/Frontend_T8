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
  const [errors, setErrors] = useState({});

  const handlePhoneNumberChange = (e) => {
    let value = e.target.value;

    value = value.replace(/[^0-9]/g, '');

    if (value.length > 3 && value.length <= 7) {
      value = value.replace(/(\d{3})(\d+)/, '$1-$2');
    } else if (value.length > 7) {
      value = value.replace(/(\d{3})(\d{4})(\d+)/, '$1-$2-$3');
    }

    if (value.length > 13) {
      value = value.substring(0, 13);
    }

    setPhoneNumber(value);
    setErrors((prevErrors) => ({ ...prevErrors, phoneNumber: '' }));
  };

  // 월/일 자동 두 자리 포맷팅 핸들러
  const handleDateInputBlur = (setter, value) => {
    if (value && value.length === 1) {
      setter('0' + value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};

    const phoneNumberRegex = /^01(?:0|1|[6-9])-(?:\d{3}|\d{4})-\d{4}$/;

    if (!phoneNumberRegex.test(phoneNumber)) {
      newErrors.phoneNumber = '유효한 전화번호 (예: 010-1234-5678)를 입력해주세요.';
    }

    if (!name.trim()) newErrors.name = '성함을 입력해주세요.';
    if (!email.trim()) newErrors.email = '이메일을 입력해주세요.';
    if (!password.trim()) newErrors.password = '비밀번호를 입력해주세요.';
    if (!address.trim()) {
      newErrors.address = '주소를 입력해주세요.';
    }
    if (!birthYear.trim() || !birthMonth.trim() || !birthDay.trim()) {
      newErrors.birthDate = '생년월일을 모두 입력해주세요.';
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

    const formattedMonth = birthMonth.padStart(2, '0');
    const formattedDay = birthDay.padStart(2, '0');
    const birthDate = `${birthYear}-${formattedMonth}-${formattedDay}`;

    const userData = {
      name,
      email,
      password,
      phoneNumber,
      address,
      birthDate,
    };

    console.log("전송될 회원가입 데이터:", userData);
    alert('가입 요청이 제출되었습니다!');

    setName('');
    setEmail('');
    setPassword('');
    setPhoneNumber('');
    setAddress('');
    setBirthYear('');
    setBirthMonth('');
    setBirthDay('');
    setErrors({});
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
              onChange={(e) => { setName(e.target.value); setErrors((prevErrors) => ({ ...prevErrors, name: '' })); }}
              required
            />
             {errors.name && <p className={styles.errorMessage}>{errors.name}</p>}
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="email" className={styles.formLabel}>이메일</label>
            <input
              type="email"
              id="email"
              className={styles.formInput}
              value={email}
              onChange={(e) => { setEmail(e.target.value); setErrors((prevErrors) => ({ ...prevErrors, email: '' })); }}
              required
            />
             {errors.email && <p className={styles.errorMessage}>{errors.email}</p>}
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="password" className={styles.formLabel}>비밀번호</label>
            <input
              type="password"
              id="password"
              className={styles.formInput}
              value={password}
              onChange={(e) => { setPassword(e.target.value); setErrors((prevErrors) => ({ ...prevErrors, password: '' })); }}
              required
            />
             {errors.password && <p className={styles.errorMessage}>{errors.password}</p>}
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="phoneNumber" className={styles.formLabel}>전화번호</label>
            <input
              type="tel"
              id="phoneNumber"
              className={`${styles.formInput} ${errors.phoneNumber ? styles.inputError : ''}`}
              value={phoneNumber}
              onChange={handlePhoneNumberChange}
              placeholder="010-1234-5678"
              maxLength="13"
              required
            />
            {errors.phoneNumber && <p className={styles.errorMessage}>{errors.phoneNumber}</p>}
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="address" className={styles.formLabel}>주소</label>
            <input
              type="text"
              id="address"
              className={`${styles.formInput} ${errors.address ? styles.inputError : ''}`}
              value={address}
              onChange={(e) => { setAddress(e.target.value); setErrors((prevErrors) => ({ ...prevErrors, address: '' })); }}
              required
            />
            {errors.address && <p className={styles.errorMessage}>{errors.address}</p>}
          </div>
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>생년월일</label>
            <div className={styles.birthDateContainer}>
              <input
                type="number"
                id="birthYear"
                className={`${styles.birthInput} ${styles.birthYear}`}
                placeholder="년도 (YYYY)"
                value={birthYear}
                onChange={(e) => { setBirthYear(e.target.value); setErrors((prevErrors) => ({ ...prevErrors, birthDate: '' })); }}
                min="1900"
                max={new Date().getFullYear()}
                required
              />
              <span className={styles.birthSeparator}>/</span>
              <input
                type="number"
                id="birthMonth"
                className={`${styles.birthInput} ${styles.birthMonth}`}
                placeholder="월 (MM)"
                value={birthMonth}
                onChange={(e) => { setBirthMonth(e.target.value); setErrors((prevErrors) => ({ ...prevErrors, birthDate: '' })); }}
                onBlur={(e) => handleDateInputBlur(setBirthMonth, e.target.value)} // onBlur 이벤트 추가
                min="1"
                max="12"
                required
              />
              <span className={styles.birthSeparator}>/</span>
              <input
                type="number"
                id="birthDay"
                className={`${styles.birthInput} ${styles.birthDay}`}
                placeholder="일 (DD)"
                value={birthDay}
                onChange={(e) => { setBirthDay(e.target.value); setErrors((prevErrors) => ({ ...prevErrors, birthDate: '' })); }}
                onBlur={(e) => handleDateInputBlur(setBirthDay, e.target.value)} // onBlur 이벤트 추가
                min="1"
                max="31"
                required
              />
            </div>
            {errors.birthDate && <p className={styles.errorMessage}>{errors.birthDate}</p>}
          </div>
          <button type="submit" className={styles.submitButton}>가입하기</button>
        </form>
      </div>
    </div>
  );
}