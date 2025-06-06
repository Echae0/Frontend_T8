// src/components/mypage/ReservationHistory.jsx

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import "./ReservationHistory.css";

export default function ReservationHistory() {
  const navigate = useNavigate();
  const memberId = useSelector((state) => state.user.memberId);

  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        if (!memberId) {
          setError("로그인이 필요합니다.");
          setLoading(false);
          return;
        }

        const res = await axios.get(
          `http://localhost:8080/api/members/${memberId}/reservations`
        );
        const reservations = Array.isArray(res.data) ? res.data : [];

        // 각 예약의 restaurantId로 식당 정보 요청
        const withRestaurantInfo = await Promise.all(
          reservations.map(async (r) => {
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

        setReservations(withRestaurantInfo);
      } catch (err) {
        console.error("예약 목록 불러오기 실패:", err);
        setError("예약 내역을 불러오는 중 오류가 발생했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchReservations();
  }, [memberId]);

  const formatDate = (isoString) => {
    if (!isoString) return "-";
    const d = new Date(isoString);
    return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(
      2,
      "0"
    )}.${String(d.getDate()).padStart(2, "0")}`;
  };

  const formatTime = (isoString) => {
    if (!isoString) return "-";
    const d = new Date(isoString);
    return `${String(d.getHours()).padStart(2, "0")}:${String(
      d.getMinutes()
    ).padStart(2, "0")}`;
  };

  const handleCardClick = (reservationId) => {
    navigate(`/waiting/${reservationId}`);
  };

  const handleReview = (id) => {
    navigate(`/reviewformpage?reservationId=${id}`);
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case "REQUESTED":
        return "예약중";
      case "JOINED":
        return "입장 완료";
      case "CANCELLED":
        return "예약 취소";
      default:
        return "알 수 없음";
    }
  };

  return (
    <div className="reservation-container">
      <h2 className="reservation-title">내 예약 내역</h2>

      {loading && (
        <p className="reservation-message loading">
          예약 목록을 불러오는 중...
        </p>
      )}
      {error && <p className="reservation-message error">{error}</p>}

      {!loading && !error && Array.isArray(reservations) && (
        <div className="reservation-list">
          {reservations.length === 0 ? (
            <p className="reservation-message empty">예약내용이 없습니다</p>
          ) : (
            reservations.map((item) => (
              <div key={item.id} className="reservation-card">
                <div className="reservation-image">
                  {item.imageUrl ? (
                    <img
                      src={item.imageUrl}
                      alt="식당 이미지"
                      className="reservation-img"
                    />
                  ) : (
                    <div className="no-image-text">이미지 없음</div>
                  )}
                </div>

                {/* ✅ 좌우 레이아웃으로 구성 */}
                <div className="reservation-info-wrapper">
                  <div className="reservation-info">
                    <h3 className="restaurant-name">
                      {item.restaurantInfo?.restaurantName || "알 수 없는 식당"}
                    </h3>
                    <p className="restaurant-location">
                      {item.restaurantInfo?.location || "위치 정보 없음"}
                    </p>
                    <p className="reservation-date">
                      예약일: {formatDate(item.reservedAt)}{" "}
                      <span className="reservation-time">
                        ({formatTime(item.reservedAt)})
                      </span>
                    </p>

                    {item.visitInfo ? (
                      <div className="visit-info">
                        <p>
                          <strong>대기 시간:</strong>{" "}
                          {item.visitInfo.waitingTime}
                        </p>
                        <p>
                          <strong>방문 시간:</strong> {item.visitInfo.visitTime}
                        </p>
                        <p>
                          <strong>방문 횟수:</strong>{" "}
                          {item.visitInfo.visitCount}
                        </p>
                        <p>
                          <strong>인원:</strong> {item.visitInfo.people}
                        </p>
                      </div>
                    ) : (
                      <p className="no-visit-info">방문 정보가 없습니다.</p>
                    )}
                  </div>

                  {/* ✅ 오른쪽 버튼/상태 세로 정렬 */}
                  <div className="card-right-actions">
                    {/* ✅ 하단 리뷰 쓰기 버튼: 상태가 JOINED 때만 표시 */}
                    {(item.status === "JOINED") && (
                      <button
                        className="review-button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleReview(item.id);
                        }}
                      >
                        리뷰 쓰기
                      </button>
                    )}
                    {/* ✅ 상단 상태 라벨 버튼 (동작은 REQUESTED일 때만) */}
                    <button
                      className={`status-label ${item.status.toLowerCase()}`}
                      disabled={item.status !== "REQUESTED"}
                      onClick={(e) => {
                        e.stopPropagation();
                        if (item.status === "REQUESTED") {
                          navigate(`/waiting/${item.id}`);
                        }
                      }}
                    >
                      {getStatusLabel(item.status)}
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
