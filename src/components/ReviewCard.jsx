import styles from './ReviewCard.module.css';

const ReviewCard = ({
  nickname = 'nickname',
  reviewText = '',
  waitingTime = '',
  visitTime = '',
  visitCount = '',
  waitingScore = '',
  imageList = [],
}) => {
  return (
    <div className={styles.card}>
      {/* 상단: 프로필 + 닉네임 */}
      <div className={styles.header}>
        <div className={styles.profile}>
          <div className={styles.avatar} />
          <span className={styles.nickname}>{nickname}</span>
        </div>
      </div>

      {/* 이미지 영역 */}
      {imageList.length > 0 && (
        <div className={styles.imageScroll}>
          {imageList.map((src, i) => (
            <img key={i} src={src} alt={`리뷰 이미지 ${i + 1}`} className={styles.image} />
          ))}
        </div>
      )}

      {/* 정보: 대기 시간, 방문 시각 등 */}
      <div className={styles.details}>
        <span>대기 시간 : {waitingTime}</span>
        <span>방문 시각 : {visitTime}</span>
        <span>방문 횟수 : {visitCount}</span>
        <span>웨이팅 점수 : {waitingScore}</span>
      </div>

      {/* 리뷰 텍스트 */}
      <p className={styles.reviewText}>{reviewText}</p>
    </div>
  );
};

export default ReviewCard;
