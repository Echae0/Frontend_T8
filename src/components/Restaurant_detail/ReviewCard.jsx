import PropTypes from 'prop-types';
import styles from './ReviewCard.module.css';

const formatVisitTime = (isoString) => {
  if (!isoString) return '정보 없음';
  const date = new Date(isoString);
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const dd = String(date.getDate()).padStart(2, '0');
  const hh = String(date.getHours()).padStart(2, '0');
  const min = String(date.getMinutes()).padStart(2, '0');
  return `${yyyy}/${mm}/${dd} ${hh}:${min}`;
};

const formatWaitingTime = (duration) => {
  if (!duration) return '정보 없음';
  const match = duration.match(/P(?:([0-9]+)D)?T?(?:([0-9]+)H)?(?:([0-9]+)M)?/);
  if (!match) return '정보 없음';
  const [, days, hours, minutes] = match.map((x) => (x ? parseInt(x, 10) : 0));
  let result = '';
  if (days) result += `${days * 24}시간 `;
  if (hours) result += `${hours}시간 `;
  if (minutes) result += `${minutes}분`;
  return result.trim() || '정보 없음';
};


const ReviewCard = ({
  nickname = '익명 사용자',
  reviewText = '',
  waitingScore = '',
  visitTime = '',
  waitingTime = '',
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
      <div className={styles.imageScroll}>
        {imageList.length > 0 ? (
          imageList.map((src, i) => (
            <img key={i} src={src} alt={`리뷰 이미지 ${i + 1}`} className={styles.image} />
          ))
        ) : (
          <span className={styles.reviewText}>이미지 정보 없음</span>
        )}
      </div>

      {/* 정보 */}
      <div className={styles.details}>
        <span>방문 일시 : {formatVisitTime(visitTime)}</span>
        <span>대기 시간 : {formatWaitingTime(waitingTime)}</span>
        <span>별점 : {waitingScore || '0.0'}</span>
      </div>

      {/* 리뷰 텍스트 */}
      <p className={styles.reviewText}>{reviewText}</p>
    </div>
  );
};

ReviewCard.propTypes = {
  nickname: PropTypes.string,
  reviewText: PropTypes.string,
  waitingScore: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  visitTime: PropTypes.string,
  waitingTime: PropTypes.string,
  imageList: PropTypes.arrayOf(PropTypes.string),
};

export default ReviewCard;

