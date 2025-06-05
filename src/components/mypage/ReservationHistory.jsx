// src/components/mypage/ReservationHistory.jsx

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

/**
 * ReservationHistory 컴포넌트
 * - 서버에서 사용자의 예약 목록을 가져와 카드 형태로 렌더링합니다.
 * - 예약이 없거나, 가져온 데이터가 배열이 아닐 경우 “예약내용이 없습니다” 문구를 표시합니다.
 * - 배경을 모두 흰색으로 설정했습니다.
 */
export default function ReservationHistory() {
  const navigate = useNavigate();

  // 1) 예약 데이터를 저장할 state
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 2) 마운트 시 API 호출
  useEffect(() => {
    const fetchReservations = async () => {
      try {
        // const token = localStorage.getItem("accessToken");
        const response = await axios.get("/api/reservations", {
          // headers: { Authorization: `Bearer ${token}` },
        });

        console.log("서버 응답:", response.data);
        if (Array.isArray(response.data)) {
          setReservations(response.data);
        } else {
          setReservations([]);
          console.warn("response.data가 배열이 아닙니다. 빈 배열로 초기화합니다.");
        }
      } catch (err) {
        console.error("예약 목록 불러오기 실패:", err);
        setError("예약 내역을 불러오는 중 오류가 발생했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchReservations();
  }, []);

  // 3) 날짜/시간 포맷팅 유틸
  const formatDate = (isoString) => {
    if (!isoString) return "-";
    const d = new Date(isoString);
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    return `${yyyy}.${mm}.${dd}`;
  };
  const formatTime = (isoString) => {
    if (!isoString) return "-";
    const d = new Date(isoString);
    const hh = String(d.getHours()).padStart(2, "0");
    const mi = String(d.getMinutes()).padStart(2, "0");
    return `${hh}:${mi}`;
  };

  // 4) 카드 클릭 시 라우팅
  const handleCardClick = (id) => {
    navigate(`/reservation/${id}`);
  };

  return (
    <div
      style={{
        padding: "20px",
        backgroundColor: "#ffffff", // 배경을 흰색으로 변경
        minHeight: "100vh",
        boxSizing: "border-box",
      }}
    >
      {/* 제목 */}
      <h2
        style={{
          marginBottom: "16px",
          fontSize: "1.8rem",
          fontWeight: 600,
          color: "#333",
        }}
      >
        내 예약 내역
      </h2>

      {/* 로딩 중 */}
      {loading && (
        <p style={{ color: "#777", marginTop: "20px", textAlign: "center" }}>
          예약 목록을 불러오는 중...
        </p>
      )}

      {/* 에러 */}
      {error && (
        <p style={{ color: "#c0392b", marginTop: "20px", textAlign: "center" }}>
          {error}
        </p>
      )}

      {/* 예약 카드 또는 빈 상태 */}
      {!loading && !error && (
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "20px",
            marginTop: "30px",
            justifyContent: "flex-start",
          }}
        >
          {reservations.length === 0 ? (
            <p
              style={{
                color: "#777",
                marginTop: "20px",
                textAlign: "center",
                width: "100%",
              }}
            >
              예약내용이 없습니다
            </p>
          ) : (
            reservations.map((item, idx) => (
              <div
                key={item.id}
                onClick={() => handleCardClick(item.id)}
                style={{
                  display: "flex",
                  backgroundColor: "#ffffff", // 카드 내부도 흰색
                  borderRadius: "10px",
                  boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)",
                  cursor: "pointer",
                  transition: "transform 0.2s",
                  width: "280px",
                  overflow: "hidden",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.transform = "translateY(-4px)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.transform = "translateY(0)")
                }
              >
                {/* 가게 이미지 */}
                <div
                  style={{
                    width: "100px",
                    height: "100px",
                    overflow: "hidden",
                    flexShrink: 0,
                  }}
                >
                  <img
                    src={
                      item.imageUrl
                        ? item.imageUrl
                        : require("../../assets/resto1.png")
                    }
                    alt={item.restaurantName}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </div>

                {/* 카드 정보 */}
                <div
                  style={{
                    flex: 1,
                    padding: "12px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  {/* 가게 이름 */}
                  <h3
                    style={{
                      fontSize: "1.1rem",
                      margin: 0,
                      color: "#333",
                    }}
                  >
                    {item.restaurantName}
                  </h3>

                  {/* 가게 위치 */}
                  <p
                    style={{
                      fontSize: "0.9rem",
                      color: "#666",
                      margin: "4px 0 8px 0",
                    }}
                  >
                    {item.location}
                  </p>

                  {/* 예약 날짜 및 시간 */}
                  <p
                    style={{
                      fontSize: "0.95rem",
                      color: "#333",
                      margin: "4px 0",
                    }}
                  >
                    예약일:{" "}
                    {item.date ? formatDate(item.date) : "-"}{" "}
                    <span
                      style={{
                        color: "#777",
                        fontSize: "0.85rem",
                      }}
                    >
                      ({item.date ? formatTime(item.date) : "-"})
                    </span>
                  </p>

                  {/* 방문 정보 */}
                  {item.visitInfo && (
                    <div>
                      <p
                        style={{
                          fontSize: "0.85rem",
                          color: "#555",
                          margin: "2px 0",
                        }}
                      >
                        <strong>대기 시간:</strong>{" "}
                        {item.visitInfo.waitingTime}
                      </p>
                      <p
                        style={{
                          fontSize: "0.85rem",
                          color: "#555",
                          margin: "2px 0",
                        }}
                      >
                        <strong>방문 시간:</strong>{" "}
                        {item.visitInfo.visitTime}
                      </p>
                      <p
                        style={{
                          fontSize: "0.85rem",
                          color: "#555",
                          margin: "2px 0",
                        }}
                      >
                        <strong>방문 횟수:</strong>{" "}
                        {item.visitInfo.visitCount}
                      </p>
                      <p
                        style={{
                          fontSize: "0.85rem",
                          color: "#555",
                          margin: "2px 0",
                        }}
                      >
                        <strong>인원:</strong> {item.visitInfo.people}
                      </p>
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
