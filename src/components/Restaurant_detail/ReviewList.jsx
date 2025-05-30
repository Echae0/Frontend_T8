import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import ReviewCard from './ReviewCard';
import styles from './ReviewList.module.css';

const ReviewList = () => {
  const { id: restaurantId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!restaurantId) return;

    axios.get(`http://localhost:8080/api/restaurants/${restaurantId}/reviews`)
      .then((res) => {
        setReviews(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('리뷰 불러오기 실패:', err);
        setLoading(false);
      });
  }, [restaurantId]);

  if (loading) return <p>리뷰를 불러오는 중...</p>;
  if (reviews.length === 0) return <p>리뷰가 없습니다.</p>;

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>전체 리뷰</h2>
      <div className={styles.reviewsList}>
        {reviews.map((review, index) => (
          <ReviewCard
            key={review.id || index}
            nickname={review.memberName || '익명'}
            reviewText={review.comment || ''}
            // waitingTime={/* 서버에서 제공하지 않으므로 빈값 혹은 별도 처리 */}
            visitTime={review.createdAt ? new Date(review.createdAt).toLocaleString() : ''}
            visitCount={''} // DTO에 없으므로 빈 문자열 처리
            waitingScore={review.rating || ''} // rating 점수로 사용
            imageList={[]} // 이미지 정보 DTO에 없으므로 빈 배열 처리
          />
        ))}
      </div>
    </div>
  );
};

export default ReviewList;
