// src/pages/Home.jsx
export default function Home() {
  // (1) 예약 내역과 관심 가게를 배열로 정의합니다.
  //     실제로는 나중에 API를 통해 받아온 데이터를 여기에 넣으면 됩니다.
  const reservations = [];          // 예시: [] → 비어 있으면 “최근 예약내역 없음” 출력
  // const likedRestaurants = [];      // 예시: [] → 비어 있으면 “찜한 내역이 없습니다” 출력

  return (
    <div style={{ padding: '20px' }}>
      <h2 style={{ marginBottom: '16px' }}>홈</h2>
      <p>마이페이지에 오신 것을 환영합니다!</p>

      <div style={{ display: 'flex', gap: '20px', marginTop: '30px' }}>
        {/* ───────────────────────────────────────────────────────────── */}
        {/* 1) 예약 내역 카드 */}
        {/* ───────────────────────────────────────────────────────────── */}
        <div
          style={{
            flex: 1,
            backgroundColor: '#f9f9f9',
            borderRadius: '10px',
            padding: '30px',
            boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
            minHeight: '200px'
          }}
        >
          <h3>내 예약 내역</h3>

          {reservations.length === 0 ? (
            <p style={{ color: '#777', marginTop: '12px' }}>
              최근 예약내역이 없습니다.
            </p>
          ) : (
            <ul style={{ listStyle: 'none', padding: 0, marginTop: '12px' }}>
              {reservations.map((item, idx) => (
                <li key={idx} style={{ marginBottom: '8px' }}>
                  ✅ {item.date} – {item.restaurantName}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
