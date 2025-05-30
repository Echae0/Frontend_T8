import PropTypes from 'prop-types';
import styles from './ReviewCard.module.css';

const ReviewCard = ({
  nickname = '익명 사용자',
  reviewText = '',
  waitingScore = '',
  visitTime = '',
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

      {/* 정보 */}
      <div className={styles.details}>
        <span>리뷰 작성 시각 : {visitTime}</span>
        <span>별점 : {waitingScore}점</span>
      </div>

      {/* 텍스트 */}
      <p className={styles.reviewText}>{reviewText}</p>
    </div>
  );
};

ReviewCard.propTypes = {
  nickname: PropTypes.string,
  reviewText: PropTypes.string,
  waitingScore: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  visitTime: PropTypes.string,
  imageList: PropTypes.arrayOf(PropTypes.string),
};

export default ReviewCard;
