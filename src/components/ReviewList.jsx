import styles from './ReviewList.module.css';
import ReviewCard from './ReviewCard';

const ReviewList = () => {
  const reviews = [
    {
      nickname: 'nickname1',
      rating: 3,
      reviewText: '먹국도 맛있고 캣알위에 불고기올리고 마늘올려서 왕하고 먹..',
      waitingTime: '1시간 10분',
      visitTime: '12시 45분',
      visitCount: '8번째'
    },
    {
      nickname: 'nickname2',
      rating: 2,
      reviewText: '맛은 괜찮지만 서비스가 별로였습니다.',
      waitingTime: '30분',
      visitTime: '18시 20분',
      visitCount: '2번째'
    },
    // 더 많은 리뷰 데이터...
  ];

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>선택 메뉴 포함 리뷰</h2>
      <div className={styles.reviewsList}>
        {reviews.map((review, index) => (
          <ReviewCard key={index} {...review} />
        ))}
      </div>
    </div>
  );
};

export default ReviewList;