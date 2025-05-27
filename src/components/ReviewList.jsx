import ReviewCard from './ReviewCard';

const ReviewList = ({ isBottomSection }) => {
  const reviews = Array(2).fill('/assets/sample-images/menu-thumb.jpg');
  return (
    <div className={isBottomSection ? 'border-t pt-4 mt-4' : ''}>
      {reviews.map((img, idx) => (
        <ReviewCard key={idx} menuImage={img} />
      ))}
    </div>
  );
};

export default ReviewList;
