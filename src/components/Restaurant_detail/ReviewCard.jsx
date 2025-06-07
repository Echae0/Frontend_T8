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

const renderStars = (score) => {
  const rating = parseFloat(score);
  if (isNaN(rating)) return '정보 없음';

  const fullStars = Math.floor(rating);
  const hasHalf = rating - fullStars >= 0.25 && rating - fullStars < 0.75;
  const emptyStars = 5 - fullStars - (hasHalf ? 1 : 0);

  return (
    <span className={styles.reviewStars}>
      {'★'.repeat(fullStars)}
      {hasHalf ? '⯨' : ''}
      {'☆'.repeat(emptyStars)}
    </span>
  );
};


const ReviewCard = ({
  nickname = '익명 사용자',
  reviewText = '',
  waitingScore = '',
  visitTime = '',
  waitingTime = '',
  image = '',
}) => {

  return (
    <div className={styles.reviewCard}>
      {/* 상단: 프로필 + 닉네임 */}
      <div className={styles.reviewHeader}>
        <div className={styles.reviewProfile}>
          <div className={styles.reviewAvatar} />
          <span className={styles.reviewNickname}>{nickname}</span>
        </div>
      </div>

      {/* 이미지 + 정보 영역 */}
      <div className={styles.reviewImagebox}>
        <img
      className={styles.reviewImage}
      src={image ? `http://localhost:8080/images/${image}` : "/assets/default.png"}
      alt="리뷰 이미지"
    />
        {/* 리뷰 텍스트 */}
        <p className={styles.reviewText}>{reviewText}</p>
      </div>

        <div className={styles.reviewDetails}>
          <span>방문 일시 : {formatVisitTime(visitTime)}</span>
          <span>대기 시간 : {formatWaitingTime(waitingTime)}</span>
          <span>{renderStars(waitingScore)}</span>
        </div>
    </div>
  );
};

ReviewCard.propTypes = {
  nickname: PropTypes.string,
  reviewText: PropTypes.string,
  waitingScore: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  visitTime: PropTypes.string,
  waitingTime: PropTypes.string,
  image: PropTypes.string, // 이미지 파일명
};

export default ReviewCard;
