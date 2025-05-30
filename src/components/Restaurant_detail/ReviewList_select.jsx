import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import ReviewCard_select from './ReviewCard_select';
import styles from './ReviewList_select.module.css';

const ReviewList_select = () => {
  const { restaurantId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    axios
      .get(`http://localhost:8080/api/restaurants/${restaurantId}/reviews`)
      .then((res) => {
        console.log('✅ 선택 리뷰 응답:', res.data);
        setReviews(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('❌ 선택 리뷰 불러오기 실패:', err);
        setLoading(false);
      });
  }, [restaurantId]);

  if (loading) return <p>리뷰를 불러오는 중...</p>;
  if (reviews.length === 0) return <p>선택 메뉴 관련 리뷰가 없습니다.</p>;

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>선택 메뉴 포함 리뷰</h2>
      <div className={styles.reviewsList}>
        {reviews.map((review, index) => (
          <ReviewCard_select
            key={review.id || index}
            nickname={review.memberName || '익명'}
            reviewText={review.comment || ''}
            waitingTime={'정보 없음'} // 백엔드에 없다면 임의로 넣거나 비워두기
            visitTime={
              review.createdAt
                ? new Date(review.createdAt).toLocaleTimeString()
                : '정보 없음'
            }
            visitCount={'정보 없음'} // visitCount 관련 데이터가 없다면 대체 텍스트
            image={''} // 이미지가 없을 경우 기본 이미지나 빈 문자열
          />
        ))}
      </div>
    </div>
  );
};

export default ReviewList_select;
