import styles from './ReviewCard.module.css';

const ReviewCard = ({ nickname = 'nickname', menuImage }) => {
  return (
    <div className={styles.card}>
      <div className={styles.content}>
        <img src={menuImage} alt="메뉴" className={styles.menuImage} />
        <div className={styles.textContainer}>
          <p className={styles.nickname}>{nickname}</p>
          <p className={styles.reviewText}>먹고도 맛있고 먹었더니 불고기불타고 마늘후라이...</p>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;