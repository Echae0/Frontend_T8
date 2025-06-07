import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import "./Home.css"; // ★ 이 파일에 :root 및 .review-container 스타일이 포함되어야 함

export default function Home() {
  const memberId = useSelector((state) => state.user.memberId);
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        if (!memberId) return;

        const res = await axios.get(
          `http://localhost:8080/api/members/${memberId}/reservations`
        );
        const reservationList = Array.isArray(res.data) ? res.data : [];

        const requestedOnly = reservationList.filter(
          (item) => item.status === "REQUESTED"
        );

        const withRestaurant = await Promise.all(
          requestedOnly.map(async (r) => {
            try {
              const restaurantRes = await axios.get(
                `http://localhost:8080/api/restaurants/${r.restaurantId}`
              );
              return {
                ...r,
                restaurantInfo: restaurantRes.data,
              };
            } catch {
              return { ...r, restaurantInfo: null };
            }
          })
        );

        setReservations(withRestaurant);
      } catch (e) {
        console.error("예약 내역 불러오기 실패:", e);
      } finally {
        setLoading(false);
      }
    };

    fetchReservations();
  }, [memberId]);

  return (
    <div className="review-container">
      <h2 className="review-title">홈</h2>
      <p>마이페이지에 오신 것을 환영합니다!</p>

      <div
        style={{
          backgroundColor: "#f9f9f9",
          borderRadius: "10px",
          padding: "30px",
          boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
          minHeight: "160px",
        }}
      >
        <h3 style={{ marginBottom: "12px" }}>현재 예약 중인 내역</h3>

        {loading ? (
          <p style={{ color: "#777" }}>불러오는 중...</p>
        ) : reservations.length === 0 ? (
          <p style={{ color: "#777" }}>예약중인 내역이 없습니다.</p>
        ) : (
          <ul style={{ listStyle: "none", padding: 0 }}>
            {reservations.map((item, idx) => (
              <li key={idx} style={{ marginBottom: "10px" }}>
                📅 {new Date(item.reservedAt).toLocaleDateString()}
                <span style={{ margin: "0 12px" }}>–</span>
                {item.restaurantInfo?.restaurantName || "알 수 없는 식당"}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
