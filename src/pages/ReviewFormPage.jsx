// src/components/ReviewFormPage.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './ReviewFormPage.module.css';

export default function ReviewFormPage() {
  // ─────────────────────────────────────────────────────────
  // 0) 식당 정보를 담을 state
  // ─────────────────────────────────────────────────────────
  const [restaurantInfo, setRestaurantInfo] = useState(null);
  const [reservationInfo, setReservationInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  // ─────────────────────────────────────────────────────────
  // 0-1) 회원 정보를 담을 state
  // ─────────────────────────────────────────────────────────
  const [memberInfo, setMemberInfo] = useState(null);

  // ─────────────────────────────────────────────────────────
  // 1) 리뷰 폼 상태
  // ─────────────────────────────────────────────────────────
  const [reviewContent, setReviewContent] = useState('');
  const [waitingScore, setWaitingScore] = useState(0);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [errors, setErrors] = useState({});

  // ─────────────────────────────────────────────────────────
  // 2) 예시로 식당 ID = 1, 회원 ID = 1 고정
  // ─────────────────────────────────────────────────────────
  const restaurantId = 1;
  const memberId = 1;

  // ─────────────────────────────────────────────────────────
  // 3) “식당 정보 조회” useEffect
  // ─────────────────────────────────────────────────────────
  useEffect(() => {
    setLoading(true);
    setErrorMessage('');

    axios
      .get(`http://localhost:8080/api/restaurants/${restaurantId}`)
      .then((res) => {
        setRestaurantInfo(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('▶ 식당 정보 조회 실패:', err);
        setErrorMessage('식당 정보를 불러오는 중 오류가 발생했습니다.');
        setLoading(false);
      });
  }, [restaurantId]);

  // ─────────────────────────────────────────────────────────
  // 4) “회원 정보 조회” useEffect
  // ─────────────────────────────────────────────────────────
  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/members/${memberId}`)
      .then((res) => {
        setMemberInfo(res.data);
      })
      .catch((err) => {
        console.error('▶ 회원 정보 조회 실패:', err);
      });
  }, [memberId]);

  // ─────────────────────────────────────────────────────────
  // 5) “예약 정보 조회” useEffect
  //    restaurantInfo가 있으면 실행
  // ─────────────────────────────────────────────────────────
  useEffect(() => {
    if (!restaurantInfo) return;

    axios
      .get(`http://localhost:8080/api/reservations`)
      .then((res) => {
        const matched = res.data.filter(
          (item) => item.restaurantId === restaurantId
        );
        setReservationInfo(matched.length > 0 ? matched[0] : null);
      })
      .catch((err) => {
        console.error('▶ 예약 정보 조회 실패:', err);
      });
  }, [restaurantInfo, restaurantId]);

  // ─────────────────────────────────────────────────────────
  // 6) 이미지 업로드 핸들러
  // ─────────────────────────────────────────────────────────
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result);
      };
      reader.readAsDataURL(file);
      setErrors((prev) => ({ ...prev, image: '' }));
    }
  };

  const handleImageCancel = () => {
    setUploadedImage(null);
    const fileInput = document.getElementById('imageUploadInput');
    if (fileInput) {
      fileInput.value = '';
    }
  };

  // ─────────────────────────────────────────────────────────
  // 7) 웨이팅 점수 클릭 핸들러
  // ─────────────────────────────────────────────────────────
  const handleScoreClick = (score) => {
    setWaitingScore(score);
    setErrors((prev) => ({ ...prev, score: '' }));
  };

  // ─────────────────────────────────────────────────────────
  // 8) 리뷰 제출 핸들러
  // ─────────────────────────────────────────────────────────
  const handleSubmit = () => {
    const newErrors = {};

    if (!reviewContent.trim()) {
      newErrors.reviewContent = '리뷰 내용을 작성해주세요.';
    }
    if (waitingScore === 0) {
      newErrors.score = '웨이팅 점수를 선택해주세요.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      alert('필수 입력/선택 사항을 확인해주세요.');
      return;
    }

    const reviewData = {
      restaurantName: restaurantInfo.restaurantName,
      memberName: memberInfo?.name, // 회원 정보에서 닉네임
      reviewContent: reviewContent,
      waitingScore: waitingScore,
      uploadedImage: uploadedImage,
    };

    console.log('리뷰 데이터:', reviewData);
    alert('리뷰가 성공적으로 작성되었습니다!');

    // 폼 리셋
    setReviewContent('');
    setWaitingScore(0);
    setUploadedImage(null);
    setErrors({});
  };

  // ─────────────────────────────────────────────────────────
  // 9) 렌더링: 로딩, 에러, 그리고 실제 폼
  // ─────────────────────────────────────────────────────────
  if (loading) {
    return (
      <div className={styles.pageContainer}>
        <p>로딩 중...</p>
      </div>
    );
  }

  if (errorMessage) {
    return (
      <div className={styles.pageContainer}>
        <p>{errorMessage}</p>
      </div>
    );
  }

  // restaurantInfo가 정상적으로 세팅된 상태
  return (
    <div className={styles.pageContainer}>
      <div className={styles.contentArea}>
        {/* ──────────────────────────────────────────────────────── */}
        {/* 9-1) 식당 정보 + 방문 정보 섹션 (좌: 가게 정보, 우: 방문 정보) */}
        {/* ──────────────────────────────────────────────────────── */}
        <div className={styles.restaurantInfoSection}>
          {/* 좌측: 가게 이미지 + 기본 정보 */}
          {restaurantInfo.imageUrl ? (
            <img
              src={`http://localhost:8080${restaurantInfo.imageUrl}`}
              alt="가게 사진"
              className={styles.restaurantImage}
              onError={() => {
                console.error('이미지 로드 실패');
              }}
            />
          ) : (
            <div className={styles.imagePlaceholder}>
              <p>가게 사진 없음</p>
            </div>
          )}

          <div className={styles.restaurantDetails}>
            <h2 className={styles.restaurantName}>
              {restaurantInfo.restaurantName}
            </h2>
            <p className={styles.restaurantAddress}>
              {restaurantInfo.location}
            </p>
            <p className={styles.restaurantHours}>
              영업시간: {restaurantInfo.openingHours}
            </p>
            <p className={styles.restaurantContact}>
              연락처: {restaurantInfo.contactNumber || '정보 없음'}
            </p>
            <p className={styles.restaurantParking}>
              주차: {restaurantInfo.parking || '주차 정보 없음'}
            </p>
          </div>

          {/* 세로 분할선 */}
          <div className={styles.divider} />

          {/* 우측: 방문 정보 */}
          <div className={styles.visitDetails}>
            <h3 className={styles.visitInfoTitle}>방문 정보</h3>
            {reservationInfo ? (
              <>
                <p className={styles.visitInfoDetail}>
                  대기 시간: {reservationInfo.predictedWait}분
                </p>
                <p className={styles.visitInfoDetail}>
                  방문 시간:{' '}
                  {new Date(reservationInfo.joinedAt).toLocaleTimeString(
                    [],
                    {
                      hour: '2-digit',
                      minute: '2-digit',
                    }
                  )}
                </p>
                <p className={styles.visitInfoDetail}>
                  인원: {reservationInfo.partySize}명
                </p>
              </>
            ) : (
              <p className={styles.visitInfoDetail}>예약 정보 없음</p>
            )}
          </div>
        </div>

        {/* ──────────────────────────────────────────────────────── */}
        {/* 9-2) 리뷰 작성 섹션 */}
        {/* ──────────────────────────────────────────────────────── */}
        <div className={styles.reviewSection}>
          <div className={styles.reviewCard}>
            {/* ─ 프로필 헤더 (회원 닉네임) */}
            <div className={styles.profileHeader}>
              <div className={styles.avatar}></div>
              <div className={styles.nickname}>
                {memberInfo?.name || '닉네임 정보 없음'}
              </div>
            </div>

            <div className={styles.reviewContentArea}>
              <div
                className={styles.imageUploadContainer}
                onClick={uploadedImage ? handleImageCancel : null}
              >
                {uploadedImage ? (
                  <img
                    src={uploadedImage}
                    alt="업로드된 이미지"
                    className={styles.uploadedImagePreview}
                  />
                ) : (
                  <div className={styles.uploadPlaceholder}>
                    <p>사진 업로드</p>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className={styles.fileInput}
                      id="imageUploadInput"
                    />
                  </div>
                )}
              </div>
              <div className={styles.reviewTextareaWrapper}>
                <textarea
                  className={`${styles.reviewTextarea} ${
                    errors.reviewContent ? styles.inputError : ''
                  }`}
                  placeholder="리뷰 내용을 작성해주세요."
                  value={reviewContent}
                  onChange={(e) => {
                    setReviewContent(e.target.value);
                    setErrors((prev) => ({ ...prev, reviewContent: '' }));
                  }}
                  rows="8"
                ></textarea>
                {errors.reviewContent && (
                  <p className={styles.reviewContentErrorMessage}>
                    {errors.reviewContent}
                  </p>
                )}
              </div>
            </div>
            {errors.image && (
              <p className={`${styles.errorMessage} ${styles.imageErrorMessage}`}>
                {errors.image}
              </p>
            )}
          </div>

          <div className={styles.waitingScoreSection}>
            <div className={styles.scoreIcons}>
              {Array.from({ length: 5 }, (_, i) => i + 1).map((score) => (
                <span
                  key={score}
                  className={`${styles.scoreIcon} ${
                    waitingScore >= score ? styles.filledScore : ''
                  }`}
                  onClick={() => handleScoreClick(score)}
                >
                  &#128340;
                </span>
              ))}
            </div>
            <div className={styles.scoreLabel}>웨이팅 점수</div>
            {errors.score && (
              <p className={styles.errorMessage}>{errors.score}</p>
            )}
          </div>
        </div>

        {/* ──────────────────────────────────────────────────────── */}
        {/* 9-3) 작성 완료 버튼 */}
        {/* ──────────────────────────────────────────────────────── */}
        <button className={styles.submitButton} onClick={handleSubmit}>
          작성 완료
        </button>
      </div>
    </div>
  );
}
