// ReservationHistory.jsx
import "./ReservationHistory.css";

const reservations = [
  {
    name: "모수",
    location: "서울 동대문",
    date: "2025.05.06",
    imageUrl: "/images/store1.jpg",
  },
  {
    name: "드래곤 힘",
    location: "서울 홍대",
    date: "2025.05.06",
    imageUrl: "/images/store2.jpg",
  },
  {
    name: "강남 억전할맥",
    location: "서울 강남",
    date: "2025.05.06",
    imageUrl: "/images/store3.jpg",
  },
];

export default function ReservationHistory() {
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
            <button className="review-button">후기 쓰기</button>
            <button className="inquiry-button">문의하기</button>
          </div>
        </div>
      ))}
    </div>
  );
}
