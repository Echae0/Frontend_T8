import styles from './MenuList.module.css';

const MenuList = ({ setSelectedMenu }) => {
  // 메뉴 데이터 예시 (이미지 URL과 이름)
  const menus = [
    { img: '/assets/sample-images/열탄불고기된장찌개세트.jpg', name: '열탄불고기된장찌개세트' },
    { img: '/assets/sample-images/열탄불고기김치찌개세트.jpg', name: '열탄불고기김치찌개세트' },
    { img: '/assets/sample-images/내맘대로 열탄불고기만.jpg', name: '내맘대로 열탄불고기만' },
    { img: '/assets/sample-images/menu-thumb.jpg', name: '제육볶음' },
    { img: '/assets/sample-images/menu-thumb.jpg', name: '비빔밥' },
    { img: '/assets/sample-images/menu-thumb.jpg', name: '갈비탕' }
  ];

  const handleMenuClick = (menu) => {
    setSelectedMenu(menu);
  };

  return (
    <div className={styles.menuListContainer}>
      <div className={styles.menuList}>
        {menus.map((menu, i) => (
          <div 
            key={i} 
            className={styles.menuItem}
            onClick={() => handleMenuClick(menu)}
          >
            <img 
              src={menu.img} 
              alt={menu.name} 
              className={styles.menuImage}
            />
            <p className={styles.menuName}>{menu.name}</p>
          </div>
        ))}
      </div>
    </div>
  );


};


export default MenuList;

