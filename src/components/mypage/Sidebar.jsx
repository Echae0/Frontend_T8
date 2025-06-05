import styles from './Sidebar.module.css';


const Sidebar = ({ setView, view }) => {
  const menuItems = [
    { key: 'home', label: '홈' },
    { key: 'edit', label: '내 정보 수정' },
    { key: 'reservation', label: '내 예약내역' },
    { key: 'reviews', label: '내 리뷰' },
  ];

  return (
    <div className={styles.sidebar}>
      <h2>마이페이지</h2>
      <ul>
        {menuItems.map((item) => (
          <li key={item.key}>
            <button
              className={view === item.key ? styles.active : ''}
              onClick={() => setView(item.key)}
            >
              {item.label}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
