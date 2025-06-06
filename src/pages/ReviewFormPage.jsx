import { useState, useEffect } from 'react';
import styles from './ReviewFormPage.module.css';
import { useLocation, useNavigate  } from 'react-router-dom';
import axios from 'axios';


export default function ReviewFormPage() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const reservationId = searchParams.get('reservationId');
  const navigate = useNavigate(); // 👈 추가
  // ✅ 리뷰 작성 상태
  const [reviewContent, setReviewContent] = useState('');
  const [waitingScore, setWaitingScore] = useState(0);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [errors, setErrors] = useState({});
  const [setLoading] = useState(true);
  const [setReservation] = useState(null);
  

  // ✅ 예약 정보 상태
  const [restaurantInfo, setRestaurantInfo] = useState({
    name: '',
    address: '',
    openingHours: '',
    image: '',
    visitInfo: {
      waitingTime: '',
      visitTime: ''
    }
  });

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/reservations/${reservationId}`)
      .then((res) => {
        setReservation(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('❌ 리뷰 불러오기 실패:', err);
        setLoading(false);
      });
      loadReservationAndRestaurant(reservationId);
  }, [reservationId]);


  const loadReservationAndRestaurant  = async (reservationId) => {
    try {
      // 1. 예약 정보 가져오기
      const res = await fetch(`http://localhost:8080/api/reservations/${reservationId}`);
      if (!res.ok) {
        throw new Error(`서버 오류: ${res.status}`);
      }
      const reservationData = await res.json();
      const restaurantId = reservationData.restaurantId;
      
      // 2. 레스토랑 정보 가져오기
      const restaurantRes = await fetch(`http://localhost:8080/api/restaurants/${restaurantId}`);
      if (!restaurantRes.ok) throw new Error("레스토랑 정보 불러오기 실패");
      const restaurantData = await restaurantRes.json();
      
      console.log("예약 데이터:", reservationData.joinedAt);
      // 3. 화면 상태 구성
      // 올바르게 적용
      setRestaurantInfo({
        name: restaurantData.restaurantName,
        address: restaurantData.location,
        openingHours: restaurantData.openingHours,
        image: restaurantData.imageUrl,
        visitInfo: {
          waitingTime: parseISODuration(reservationData.waitingTime), // "PT1M51.014737S" → "1분"
          visitTime: formatDateTime(reservationData.joinedAt) // "2025-06-06T20:26:02.790291" → "2025/06/06 20시26분"
        }
      });

    } catch (e) {
      console.error("리뷰 페이지 데이터 로딩 실패:", e);
    }
  };

  // 수정된 함수들
  const formatDateTime = (isoString) => {
    try {
      // 먼저 ISO 문자열이 유효한지 확인
      if (!isoString || typeof isoString !== 'string') {
        throw new Error('Invalid date string');
      }
      
      // Date 객체 생성
      const date = new Date(isoString);
      
      // Date 객체가 유효한지 확인 (Invalid Date 체크)
      if (isNaN(date.getTime())) {
        throw new Error('Invalid date');
      }
      
      // 날짜 구성 요소 추출
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      const hours = String(date.getHours()).padStart(2, '0');
      const minutes = String(date.getMinutes()).padStart(2, '0');
      
      return `${year}/${month}/${day} ${hours}시${minutes}분`;
    } catch (error) {
      console.error('날짜 포맷팅 오류:', error);
      return '날짜 정보 없음'; // 또는 원하는 기본값
    }
  };

  const parseISODuration = (durationStr) => {
    const regex = /PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+(?:\.\d+)?)S)?/;
    const match = durationStr.match(regex);

    if (!match) return '바로 입장';

    const minutes = match[2] ? parseInt(match[2]) : 0;
    
    if (minutes === 0) {
      return '바로 입장';
    }
    
    return `${minutes}분`;
    // 예: "PT1M51.014737S" → "1분"
    // 예: "PT0M30S" → "바로 입장"
  };
  
  const handleImageCancel = () => {
    setUploadedImage(null);
    const fileInput = document.getElementById('imageUploadInput');
    if (fileInput) {
      fileInput.value = '';
    }
  };

  // 이미지 업로드 핸들러 수정
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // 파일 크기 검증 (예: 5MB 이하)
      if (file.size > 5 * 1024 * 1024) {
        setErrors((prev) => ({ ...prev, image: '이미지 크기는 5MB 이하로 해주세요.' }));
        return;
      }
      
      // 파일 타입 검증
      if (!file.type.match('image.*')) {
        setErrors((prev) => ({ ...prev, image: '이미지 파일만 업로드 가능합니다.' }));
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result);
      };
      reader.readAsDataURL(file);
      setErrors((prev) => ({ ...prev, image: '' }));
    }
  };

  const handleScoreClick = (score) => {
    setWaitingScore(score);
    setErrors((prev) => ({ ...prev, score: '' }));
  };

  const handleSubmit = async () => {
    const newErrors = {};

    if (!reviewContent.trim()) {
      newErrors.reviewContent = '리뷰를 작성해주세요.';
    }
    if (waitingScore === 0) {
      newErrors.score = '웨이팅 점수를 선택해주세요.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      alert('필수 입력/선택 사항을 확인해주세요.');
      return;
    }
    try {

      const reviewData = {
        comment: reviewContent,
        rating: waitingScore,
        imgeUrl: uploadedImage ? uploadedImage : null, // 이미지 URL이 있을 때만 포함
      }

      const response = await fetch(`http://localhost:8080/api/reservations/${reservationId}/reviews`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reviewData),
      });

      console.log('리뷰 데이터:', response.data);
      alert('리뷰가 성공적으로 작성되었습니다!');
      navigate('/mypage');
      localStorage.removeItem("reviewReservation");

      setReviewContent('');
      setWaitingScore(0);
      setUploadedImage(null);
      setErrors({});
      } catch (err) {
      console.error('❌ 리뷰 업로드 실패:', err);
      alert('리뷰 작성 중 오류가 발생했습니다.');
    }
  };

  return (
    

    <div className={styles.pageContainer}>
      <div className={styles.contentArea}>
        <div className={styles.restaurantInfoSection}>
          <img src={restaurantInfo.image} alt="가게 사진" className={styles.restaurantImage} />
          <div className={styles.restaurantDetails}>
            <h2 className={styles.restaurantName}>{restaurantInfo.name}</h2>
            <p className={styles.restaurantAddress}>{restaurantInfo.address}</p>
            {/* <p className={styles.restaurantHours}>{restaurantInfo.openingHours}</p> */}
          </div>
          <div className={styles.visitDetails}>
            <p>대기 시간: {restaurantInfo.visitInfo.waitingTime}</p>
            <p>방문 시간: {restaurantInfo.visitInfo.visitTime}</p>
          </div>
        </div>

        <div className={styles.reviewSection}>
          <div className={styles.reviewCard}>
            <div className={styles.profileHeader}>
              <div> </div>
            </div>

            <div className={styles.reviewContentArea}>
              <div className={styles.imageUploadContainer} onClick={uploadedImage ? handleImageCancel : null}>
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
                      id="imageUploadInput"
                    />
                  </div>
                )}
              </div>
              <div className={styles.reviewTextareaWrapper}>
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
                {errors.reviewContent && <p className={styles.reviewContentErrorMessage}>{errors.reviewContent}</p>}
              </div>
            </div>
            {errors.image && <p className={`${styles.errorMessage} ${styles.imageErrorMessage}`}>{errors.image}</p>}
          </div>

          <div className={styles.waitingScoreSection}>
            <div className={styles.scoreIcons}>
              {Array.from({ length: 5 }, (_, i) => i + 1).map((score) => (
                <span
                  key={score}
                  className={`${styles.scoreIcon} ${waitingScore >= score ? styles.filledScore : ''}`}
                  onClick={() => handleScoreClick(score)}
                >
                  &#128340;
                </span>
              ))}
            </div>
            <div className={styles.scoreLabel}>웨이팅 점수</div>
            {errors.score && <p className={styles.errorMessage}>{errors.score}</p>}
          </div>
        </div>

        <button className={styles.submitButton} onClick={handleSubmit}>작성 완료</button>
      </div>
    </div>
  );
}
