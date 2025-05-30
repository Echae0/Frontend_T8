import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import ReviewCard from './ReviewCard';
import styles from './ReviewList.module.css';



const ReviewList = () => {
  const { restaurantId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {

    axios
      .get(`http://localhost:8080/api/restaurants/${restaurantId}/reviews`)
      .then((res) => {
        console.log('✅ 리뷰 응답:', res.data); // 👈 추가
        setReviews(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('❌ 리뷰 불러오기 실패:', err);
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
            waitingScore={review.rating || ''}
            // visitTime={
            //   review.createdAt
            //     ? new Date(review.createdAt).toLocaleString()
            //     : '정보 없음'
            // }
            // imageList={[]} // 이미지 데이터 없음
          />
        ))}
      </div>
    </div>
  );
};

export default ReviewList;
