import { useNavigate } from "react-router-dom";
import "./ReservationHistory.css";

const reservations = [
  {
    name: "모수",
    location: "서울 동대문",
    date: "2025.05.06",
    imageUrl: "/images/store1.jpg",
    visitInfo: {
      waitingTime: "30분",
      visitTime: "18:00",
      visitCount: "2번째",
      people: "2인",
    },
  },
  {
    name: "드래곤 힘",
    location: "서울 홍대",
    date: "2025.05.06",
    imageUrl: "/images/store2.jpg",
    visitInfo: {
      waitingTime: "50분",
      visitTime: "13:00",
      visitCount: "3번째",
      people: "4인",
    },
  },
  {
    name: "강남 억전할맥",
    location: "서울 강남",
    date: "2025.05.06",
    imageUrl: "/images/store3.jpg",
    visitInfo: {
      waitingTime: "1시간",
      visitTime: "20:00",
      visitCount: "1번째",
      people: "3인",
    },
  },
];

export default function ReservationHistory() {
  const navigate = useNavigate();

  const handleWriteReview = (reservation) => {
    // 예약 정보 localStorage에 저장
    localStorage.setItem("reviewReservation", JSON.stringify(reservation));
    // ✅ 리뷰 작성 페이지로 이동
    navigate("/reviewformpage");
  };

  return (
    <div className="reservation-container">
      <h2 className="section-title">내 예약내역</h2>
      {reservations.map((store, i) => (
        <div className="card" key={i}>
          <img className="store-image" src={store.imageUrl} alt={store.name} />
          <div className="card-content">
            <div className="store-name">{store.name}</div>
            <div className="store-location">{store.location}</div>
            <div className="reservation-date">{store.date}</div>
          </div>
          <div className="card-actions">
            {/* ✅ 후기 쓰기 버튼: 클릭 시 이동 */}
            <button
              className="review-button"
              onClick={() => handleWriteReview(store)}
            >
              후기 쓰기
            </button>
            <button className="inquiry-button">문의하기</button>
          </div>
        </div>
      ))}
    </div>
  );
}
