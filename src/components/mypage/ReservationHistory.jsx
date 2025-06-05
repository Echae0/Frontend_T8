// src/components/mypage/ReservationHistory.jsx

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./ReservationHistory.css";

export default function ReservationHistory() {
  const navigate = useNavigate();
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const storedUser = localStorage.getItem("user");
        const memberId = storedUser ? JSON.parse(storedUser).id : null;

        if (!memberId) {
          setError("로그인이 필요합니다.");
          setLoading(false);
          return;
        }

        // ✅ URL 문자열 오류 및 템플릿 리터럴 수정
        const response = await axios.get(`http://localhost:8080/api/member/${memberId}/reservations`);
        console.log("예약 응답:", response.data); // ✅ 확인용 로그

        setReservations(Array.isArray(response.data) ? response.data : []);
      } catch (err) {
        console.error("예약 목록 불러오기 실패:", err);
        setError("예약 내역을 불러오는 중 오류가 발생했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchReservations();
  }, []);

  const formatDate = (isoString) => {
    if (!isoString) return "-";
    const d = new Date(isoString);
    return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, "0")}.${String(d.getDate()).padStart(2, "0")}`;
  };

  const formatTime = (isoString) => {
    if (!isoString) return "-";
    const d = new Date(isoString);
    return `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
  };

  const handleCardClick = (id) => {
    navigate(`/reservation/${id}`);
  };

  return (
    <div className="reservation-container">
      <h2 className="reservation-title">내 예약 내역</h2>

      {loading && (
        <p className="reservation-message loading">예약 목록을 불러오는 중...</p>
      )}

      {error && (
        <p className="reservation-message error">{error}</p>
      )}

      {!loading && !error && (
        <div className="reservation-list">
          {reservations.length === 0 ? (
            <p className="reservation-message empty">예약내용이 없습니다</p>
          ) : (
            reservations.map((item) => (
              <div
                key={item.id}
                className="reservation-card"
                onClick={() => handleCardClick(item.id)}
              >
                <div className="reservation-image">
                  <img
                    src={item.imageUrl || require("../../assets/resto1.png")}
                    alt={item.restaurantName}
                    className="reservation-img"
                  />
                </div>

                <div className="reservation-info">
                  <h3 className="restaurant-name">{item.restaurantName}</h3>
                  <p className="restaurant-location">{item.location}</p>
                  <p className="reservation-date">
                    예약일: {formatDate(item.date)}{" "}
                    <span className="reservation-time">({formatTime(item.date)})</span>
                  </p>

                  {item.visitInfo && (
                    <div className="visit-info">
                      <p><strong>대기 시간:</strong> {item.visitInfo?.waitingTime}</p>
                      <p><strong>방문 시간:</strong> {item.visitInfo?.visitTime}</p>
                      <p><strong>방문 횟수:</strong> {item.visitInfo?.visitCount}</p>
                      <p><strong>인원:</strong> {item.visitInfo?.people}</p>
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
