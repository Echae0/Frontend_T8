import { useEffect } from 'react';
import styles from './MenuList.module.css';

const MenuList = ({ setSelectedMenu }) => {
  // 메뉴 데이터 예시 (이미지 URL, 이름, 가격)
  const menus = [
    { img: '/assets/sample-images/열탄불고기된장찌개세트.jpg', name: '열탄불고기된장찌개세트', price: 31000 },
    { img: '/assets/sample-images/열탄불고기김치찌개세트.jpg', name: '열탄불고기김치찌개세트', price: 32000 },
    { img: '/assets/sample-images/내맘대로 열탄불고기만.jpg', name: '내맘대로 열탄불고기만', price: 27000 },
    { img: '/assets/sample-images/menu-thumb.jpg', name: '제육볶음', price: 10000 },
    { img: '/assets/sample-images/menu-thumb.jpg', name: '비빔밥', price: 9000 },
    { img: '/assets/sample-images/menu-thumb.jpg', name: '갈비탕', price: 11000 }
  ];

  const handleMenuClick = (menu) => {
    setSelectedMenu(menu);
  };

  useEffect(() => {
    if (menus.length > 0) {
      setSelectedMenu(menus[0]); // 배열의 첫 번째 메뉴
    }
  }, [setSelectedMenu]);

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
            <p className={styles.menuPrice}>{menu.price.toLocaleString()}원</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MenuList;