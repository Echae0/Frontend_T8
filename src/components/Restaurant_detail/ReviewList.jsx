import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import ReviewCard from './ReviewCard';
import styles from './ReviewList.module.css';

const ReviewList = () => {
  const { restaurantId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortOption, setSortOption] = useState('latest');

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/restaurants/${restaurantId}/reviews`)
      .then((res) => {
        setReviews(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('❌ 리뷰 불러오기 실패:', err);
        setLoading(false);
      });
  }, [restaurantId]);

  const sortReviews = (reviews, option) => {
    const sorted = [...reviews];
    switch (option) {
      case 'highest':
        return sorted.sort((a, b) => b.rating - a.rating);
      case 'lowest':
        return sorted.sort((a, b) => a.rating - b.rating);
      case 'latest':
      default:
        return sorted.sort((a, b) => new Date(b.reservedAt) - new Date(a.reservedAt));
    }
  };

  if (loading) return <p>리뷰를 불러오는 중...</p>;
  if (reviews.length === 0) return <p>리뷰가 없습니다.</p>;

  const sortedReviews = sortReviews(reviews, sortOption);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>전체 리뷰</h2>

      <div className={styles.sortButtons}>
        <button
          className={sortOption === 'latest' ? styles.active : ''}
          onClick={() => setSortOption('latest')}
        >
          최신순
        </button>
        <button
          className={sortOption === 'highest' ? styles.active : ''}
          onClick={() => setSortOption('highest')}
        >
          별점 높은순
        </button>
        <button
          className={sortOption === 'lowest' ? styles.active : ''}
          onClick={() => setSortOption('lowest')}
        >
          별점 낮은순
        </button>
      </div>


      <div className={styles.reviewsList}>
        {sortedReviews.map((review, index) => (
          <ReviewCard
            key={review.id || index}
            nickname={review.memberName || '익명'}
            reviewText={review.comment || ''}
            waitingScore={review.rating || ''}
            visitTime={review.reservedAt || ''}
            waitingTime={review.waitingTime || ''}
          />
        ))}
      </div>
    </div>
  );
};

export default ReviewList;