import styles from './ReviewList.module.css';
import ReviewCard from './ReviewCard';

const ReviewList = ({ isBottomSection }) => {
  const reviews = Array(2).fill('/assets/sample-images/menu-thumb.jpg');
  return (
    <div className={`${styles.container} ${isBottomSection ? styles.bottomSection : ''}`}>
      {reviews.map((img, idx) => (
        <ReviewCard key={idx} menuImage={img} />
      ))}
    </div>
  );
};

export default ReviewList;