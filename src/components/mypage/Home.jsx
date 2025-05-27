export default function Home() {
  return (
    <div>
      <h2>홈</h2>
      <p>마이페이지에 오신 것을 환영합니다!</p>

      <div style={{ display: 'flex', gap: '20px', marginTop: '30px' }}>
        {/* 예약 내역 카드 */}
        <div style={{ flex: 1, backgroundColor: '#f9f9f9', borderRadius: '10px', padding: '20px', boxShadow: '0 2px 6px rgba(0,0,0,0.1)' }}>
          <h3>내 예약 내역</h3>
          <ul>
            <li>✅ 2024.07.05 - 서울 홍대 맛집 예약</li>
            <li>✅ 2024.07.10 - 부산 해운대 카페 예약</li>
          </ul>
        </div>

        {/* 관심 가게 카드 */}
        <div style={{ flex: 1, backgroundColor: '#f9f9f9', borderRadius: '10px', padding: '20px', boxShadow: '0 2px 6px rgba(0,0,0,0.1)' }}>
          <h3>최근 관심있는 가게</h3>
          <ul>
            <li>🍜 이자카야 고쿠라쿠</li>
            <li>🍰 달콤한 디저트 카페 루루</li>
          </ul>
        </div>
      </div>
    </div>
  );
}