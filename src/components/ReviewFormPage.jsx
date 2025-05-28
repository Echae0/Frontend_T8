import React, { useState } from 'react';
import styles from './ReviewFormPage.module.css';

export default function ReviewFormPage() {
  const [reviewContent, setReviewContent] = useState('');
  const [selectedAmount, setSelectedAmount] = useState(null); // 선택된 주문 금액
  const [waitingScore, setWaitingScore] = useState(0); // 웨이팅 점수 (0-5)
  const [uploadedImage, setUploadedImage] = useState(null); // 업로드된 이미지 파일
  const [errors, setErrors] = useState({}); // 유효성 검사 오류

  // 임시 식당 정보 (실제로는 백엔드에서 받아오거나 props로 전달)
  const restaurantInfo = {
    name: '새마을 식당',
    address: '신천동 400-2번지 동구 대구광역시 KR',
    openingHours: '영업시간 : 11:00 ~ 22:00 주차 : 가능',
    image: 'https://via.placeholder.com/150/FFC0CB/FFFFFF?text=Restaurant',
    visitInfo: {
      waitingTime: '1시간 10분',
      visitTime: '12시 45분',
      visitCount: '8번째',
      people: '4인',
    }
  };

  const amountOptions = [
    '20000원',
    '30000원',
    '50000원',
    '80000원',
    '100000원 이상'
  ];

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result); // Base64 인코딩된 이미지 데이터
      };
      reader.readAsDataURL(file);
      setErrors((prev) => ({ ...prev, image: '' }));
    }
  };

  const handleAmountSelect = (amount) => {
    setSelectedAmount(amount);
    setErrors((prev) => ({ ...prev, amount: '' }));
  };

  const handleScoreClick = (score) => {
    setWaitingScore(score);
    setErrors((prev) => ({ ...prev, score: '' }));
  };

  const handleSubmit = () => {
    const newErrors = {};

    if (!selectedAmount) {
      newErrors.amount = '대략적인 주문 금액을 선택해주세요.';
    }
    if (!reviewContent.trim()) {
      newErrors.reviewContent = '리뷰 내용을 작성해주세요.';
    }
    if (waitingScore === 0) {
      newErrors.score = '웨이팅 점수를 선택해주세요.';
    }
    // 이미지 업로드를 필수로 하려면 아래 주석 해제
    // if (!uploadedImage) {
    //   newErrors.image = '사진을 업로드해주세요.';
    // }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      alert('필수 입력/선택 사항을 확인해주세요.');
      return;
    }

    // 모든 유효성 검사 통과 시 데이터 처리 (백엔드 전송 등)
    const reviewData = {
      restaurantName: restaurantInfo.name,
      selectedAmount: selectedAmount,
      reviewContent: reviewContent,
      waitingScore: waitingScore,
      uploadedImage: uploadedImage // Base64 데이터 또는 파일 객체를 백엔드로 보낼 준비
    };

    console.log('리뷰 데이터:', reviewData);
    alert('리뷰가 성공적으로 작성되었습니다!');

    // 폼 초기화 (선택 사항)
    setReviewContent('');
    setSelectedAmount(null);
    setWaitingScore(0);
    setUploadedImage(null);
    setErrors({});
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.header}>
        <h1 className={styles.headerTitle}>review</h1>
      </div>

      <div className={styles.contentArea}>
        {/* 가게 정보 섹션 */}
        <div className={styles.restaurantInfoSection}>
          <img src={restaurantInfo.image} alt="가게 사진" className={styles.restaurantImage} />
          <div className={styles.restaurantDetails}>
            <h2 className={styles.restaurantName}>{restaurantInfo.name}</h2>
            <p className={styles.restaurantAddress}>{restaurantInfo.address}</p>
            <p className={styles.restaurantHours}>{restaurantInfo.openingHours}</p>
          </div>
          <div className={styles.visitDetails}>
            <p>대기 시간: {restaurantInfo.visitInfo.waitingTime}</p>
            <p>방문 시간: {restaurantInfo.visitInfo.visitTime}</p>
            <p>방문 횟수: {restaurantInfo.visitInfo.visitCount}</p>
            <p>인원: {restaurantInfo.visitInfo.people}</p>
          </div>
        </div>

        {/* 대략적인 주문 금액 선택 섹션 */}
        <div className={styles.amountSelectSection}>
          <div className={styles.amountTitle}>대략적인 주문 금액</div>
          <div className={styles.amountOptions}>
            {amountOptions.map((amount) => (
              <button
                key={amount}
                className={`${styles.amountButton} ${selectedAmount === amount ? styles.selectedAmount : ''}`}
                onClick={() => handleAmountSelect(amount)}
              >
                {amount}
              </button>
            ))}
          </div>
          {errors.amount && <p className={styles.errorMessage}>{errors.amount}</p>}
        </div>

        {/* 리뷰 작성 섹션 */}
        <div className={styles.reviewSection}>
          <div className={styles.nickname}>nickname</div> {/* 실제 닉네임은 사용자 정보에서 가져와야 함 */}
          <div className={styles.reviewContentArea}>
            <div className={styles.imageUploadContainer}>
              {uploadedImage ? (
                <img src={uploadedImage} alt="업로드된 이미지" className={styles.uploadedImagePreview} />
              ) : (
                <div className={styles.uploadPlaceholder}>
                  <p>사진 업로드</p>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className={styles.fileInput}
                  />
                </div>
              )}
            </div>
            {errors.image && <p className={styles.errorMessage}>{errors.image}</p>}
            <textarea
              className={`${styles.reviewTextarea} ${errors.reviewContent ? styles.inputError : ''}`}
              placeholder="리뷰 내용을 작성해주세요."
              value={reviewContent}
              onChange={(e) => {
                setReviewContent(e.target.value);
                setErrors((prev) => ({ ...prev, reviewContent: '' }));
              }}
              rows="8"
            ></textarea>
          </div>
          {errors.reviewContent && <p className={styles.errorMessage}>{errors.reviewContent}</p>}
        </div>

        {/* 웨이팅 점수 섹션 */}
        <div className={styles.waitingScoreSection}>
          <div className={styles.scoreIcons}>
            {Array.from({ length: 5 }, (_, i) => i + 1).map((score) => (
              <span
                key={score}
                className={`${styles.scoreIcon} ${waitingScore >= score ? styles.filledScore : ''}`}
                onClick={() => handleScoreClick(score)}
              >
                &#128100; {/* 👤 사람 이모지 */}
              </span>
            ))}
          </div>
          <div className={styles.scoreLabel}>웨이팅 점수</div>
          {errors.score && <p className={styles.errorMessage}>{errors.score}</p>}
        </div>

        {/* 작성 완료 버튼 */}
        <button className={styles.submitButton} onClick={handleSubmit}>작성 완료</button>
      </div>
    </div>
  );
}