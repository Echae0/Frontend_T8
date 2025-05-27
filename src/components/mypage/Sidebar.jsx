export default function Sidebar({ setView, currentView }) {
  const menuItems = [
    { key: 'home', label: '홈' },
    { key: 'edit', label: '내 정보 수정' },
    { key: 'reservation', label: '내 예약내역' },
    { key: 'favorite', label: '최근 관심있는 가게' },
    { key: 'review', label: '내 리뷰' },
    { key: 'wishlist', label: '찜 목록' },
  ];

  return (
    <div>
      <h2>마이페이지</h2>
      <ul>
        {menuItems.map((item) => (
          <li key={item.key}>
            <button
              className={currentView === item.key ? 'active' : ''}
              onClick={() => setView(item.key)}
            >
              {item.label}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
