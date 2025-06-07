import axios from 'axios';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import styles from './MenuList.module.css';
import { useParams } from 'react-router-dom';

const MenuList = ({ setSelectedMenu }) => {
  const { restaurantId } = useParams();
  const [menus, setMenus] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:8080/api/restaurants/${restaurantId}/menus`)
      .then(res => {
        const menuList = res.data;
        setMenus(menuList);

        if (menuList.length > 0) {
          setSelectedMenu(menuList[0]);
        }
      })
      .catch(err => {
        console.error("메뉴 불러오기 실패:", err);
      });
  }, [restaurantId, setSelectedMenu]);

  const handleMenuClick = (menu) => {
    setSelectedMenu(menu);
  };

  return (
    // <div className={styles.menuListHeaderContainer}>
    //   <h2 className={styles.menuListHeader}>메뉴 목록</h2>
    // </div>
    <div className={styles.menuListContainer}>
      <h2 className={styles.menuListHeader}>메뉴 목록</h2>
      
      <div className={styles.menuList}>
        {menus.map((menu) => (
          <div 
            key={menu.id} 
            className={styles.menuItem}
            onClick={() => handleMenuClick(menu)}
          >
            {/* <img 
              src={menu.imageUrl || '/assets/sample-images/menu-thumb.jpg'} 
              alt={menu.name} 
              className={styles.menuImage}
            /> */}
            <img src={`http://localhost:8080${menu.imageUrl}`} className="menyImage" />

            <p className={styles.menuName}>{menu.name}</p>
            <p className={styles.menuPrice}>
              {menu.price?.toLocaleString()}원
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MenuList;

MenuList.propTypes = {
  setSelectedMenu: PropTypes.func.isRequired,
};