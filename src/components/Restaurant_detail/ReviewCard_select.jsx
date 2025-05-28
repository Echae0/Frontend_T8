import styles from './ReviewCard_select.module.css';

const ReviewCard_select = ({ 
  nickname = 'nickname', 
  rating = 3, 
  reviewText = '', 
  waitingTime = '', 
  visitTime = '', 
  visitCount = '' 
}) => {
  // 별점 렌더링 함수
  const renderStars = () => {
    return '★'.repeat(rating) + '☆'.repeat(5 - rating);
  };

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <span className={styles.nickname}>{nickname}</span>
        <span className={styles.rating}>{renderStars()}</span>
      </div>
      
      <p className={styles.reviewText}>{reviewText}</p>
      
      <div className={styles.details}>
        {waitingTime && <span>대기 시간: {waitingTime}</span>}
        {visitTime && <span>방문 시간: {visitTime}</span>}
        {visitCount && <span>방문 횟수: {visitCount}</span>}
      </div>
    </div>
  );
};

export default ReviewCard_select;