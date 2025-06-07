import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import "./MyReviews.css";

export default function MyReviews() {
  const memberId = useSelector((state) => state.user.memberId);

  const [reviews, setReviews] = useState([]);
  const [page, setPage] = useState(0); // 현재 페이지
  const [totalPages, setTotalPages] = useState(1); // 전체 페이지
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchReviews = async (pageNum) => {
    try {
      setLoading(true);
      setError(null);

      if (!memberId) {
        setError("로그인이 필요합니다.");
        setLoading(false);
        return;
      }

      const res = await axios.get(
        `http://localhost:8080/api/members/${memberId}/reviews?page=${pageNum}&size=6`
      );

      const pageData = res.data;
      const reviews = Array.isArray(pageData.content) ? pageData.content : [];

      const withRestaurantInfo = await Promise.all(
        reviews.map(async (r) => {
          if (!r.restaurantId) return r;

          try {
            const restaurantRes = await axios.get(
              `http://localhost:8080/api/restaurants/${r.restaurantId}`
            );
            return { ...r, restaurantInfo: restaurantRes.data };
          } catch {
            return { ...r, restaurantInfo: null };
          }
        })
      );

      setReviews(withRestaurantInfo);
      setPage(pageData.number);
      setTotalPages(pageData.totalPages);
    } catch (err) {
      console.error("리뷰 목록 불러오기 실패:", err);
      setError("리뷰 내역을 불러오는 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews(page);
  }, [memberId, page]);

  const formatDateTime = (isoString) => {
    try {
      if (!isoString || typeof isoString !== "string") throw new Error("Invalid date string");
      const date = new Date(isoString);
      if (isNaN(date.getTime())) throw new Error("Invalid date");

      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      const hours = String(date.getHours()).padStart(2, "0");
      const minutes = String(date.getMinutes()).padStart(2, "0");

      return `${year}/${month}/${day} ${hours}시${minutes}분`;
    } catch (error) {
      console.error("날짜 포맷팅 오류:", error);
      return "날짜 정보 없음";
    }
  };

  const parseISODuration = (durationStr) => {
    const regex = /PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+(?:\.\d+)?)S)?/;
    const match = durationStr.match(regex);
    if (!match) return "바로 입장";
    const minutes = match[2] ? parseInt(match[2]) : 0;
    return minutes === 0 ? "바로 입장" : `${minutes}분`;
  };

  const handlePrevPage = () => {
    if (page > 0) setPage(page - 1);
  };

  const handleNextPage = () => {
    if (page < totalPages - 1) setPage(page + 1);
  };

  const handlePageClick = (pageNum) => {
    setPage(pageNum);
  };

  return (
    <div className="review-container">
      <h2 className="review-title">내 리뷰 내역</h2>

      {loading && <p className="review-message loading">리뷰를 불러오는 중...</p>}
      {error && <p className="review-message error">{error}</p>}

      {!loading && !error && (
        <>
          {reviews.length === 0 ? (
            <p className="review-message empty">작성한 리뷰가 없습니다.</p>
          ) : (
            <div className="review-list">
              {reviews.map((review) => (
                <div key={review.id} className="review-card">
                  <div className="review-info">
                    <h3 className="restaurant-name">
                      {review.restaurantInfo?.restaurantName || "알 수 없는 식당"}
                    </h3>
                    <p className="review-date">방문 시간: {formatDateTime(review.joinedAt)}</p>
                    <p className="review-date">대기 시간: {parseISODuration(review.waitingTime)}</p>
                    <p className="review-rating">평점: ⭐ {review.rating}/5</p>
                    <p className="review-content">&ldquo;{review.comment}&rdquo;</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ✅ 페이지네이션 UI */}
          <div className="pagination">
            <button onClick={handlePrevPage} disabled={page === 0}>
              이전
            </button>
            {[...Array(totalPages).keys()].map((num) => (
              <button
                key={num}
                onClick={() => handlePageClick(num)}
                className={num === page ? "active" : ""}
              >
                {num + 1}
              </button>
            ))}
            <button onClick={handleNextPage} disabled={page === totalPages - 1}>
              다음
            </button>
          </div>
        </>
      )}
    </div>
  );
}
