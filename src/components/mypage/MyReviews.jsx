// src/components/mypage/ReviewHistory.jsx

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import PropTypes from "prop-types";
import "./MyReviews.css"; // 필요한 경우 CSS 따로 작성

export default function MyReviews() {
  const memberId = useSelector((state) => state.user.memberId);

  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        if (!memberId) {
          setError("로그인이 필요합니다.");
          setLoading(false);
          return;
        }

        const res = await axios.get(
          `http://localhost:8080/api/members/${memberId}/reviews`
        );
        const reviews = Array.isArray(res.data) ? res.data : [];

        // 각 리뷰의 식당 정보 가져오기
        const withRestaurantInfo = await Promise.all(
          reviews.map(async (r) => {
            if (!r.restaurantId) return r;

            try {
              const restaurantRes = await axios.get(
                `http://localhost:8080/api/restaurants/${r.restaurantId}`
              );
              return { ...r, restaurantInfo: restaurantRes.data };
            } catch {
              return { ...r, restaurantInfo: null };
            }
          })
        );

        setReviews(withRestaurantInfo);
      } catch (err) {
        console.error("리뷰 목록 불러오기 실패:", err);
        setError("리뷰 내역을 불러오는 중 오류가 발생했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [memberId]);

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
    
  };
  
  const handleImageCancel = () => {
    setUploadedImage(null);
    const fileInput = document.getElementById('imageUploadInput');
    if (fileInput) {
      fileInput.value = '';
    }
  };

  return (
    <div className="review-container">
      <h2 className="review-title">내 리뷰 내역</h2>

      {loading && <p className="review-message loading">리뷰를 불러오는 중...</p>}
      {error && <p className="review-message error">{error}</p>}

      {!loading && !error && Array.isArray(reviews) && (
        <div className="review-list">
          {reviews.length === 0 ? (
            <p className="review-message empty">작성한 리뷰가 없습니다.</p>
          ) : (
            reviews.map((review) => (
              <div key={review.id} className="review-card">
                <div className="review-info">
                  <h3 className="restaurant-name">
                    {review.restaurantInfo?.restaurantName || "알 수 없는 식당"}
                  </h3>
                  <p></p>
                  <p className="review-date">방문 시간: {formatDateTime(review.joinedAt)}</p>
                  <p className="review-date">대기 시간: {parseISODuration(review.waitingTime)}</p>
                  <p className="review-rating">평점: ⭐ {review.rating}/5</p>
                  <p className="review-content">&quot;{review.comment}&quot;</p>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
MyReviews.propTypes = {
  memberId: PropTypes.string.isRequired,
};