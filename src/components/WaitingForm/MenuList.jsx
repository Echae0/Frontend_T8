import axios from 'axios';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import styles from './MenuList.module.css';
import { useParams } from 'react-router-dom';

const MenuList = ({ onMenusLoaded, selectedMenus, onMenuToggle }) => {
  const { restaurantId } = useParams();
  const [menus, setMenus] = useState([]);

  useEffect(() => {
    if (!restaurantId) {
      console.warn("restaurantId가 없어 메뉴를 불러올 수 없습니다. URL을 확인해주세요.");
      if (onMenusLoaded) {
        onMenusLoaded([]);
      }
      return;
    }

    axios.get(`http://localhost:8080/api/restaurants/${restaurantId}/menus`)
      .then(res => {
        const menuList = res.data;
        setMenus(menuList);
        if (onMenusLoaded) {
          onMenusLoaded(menuList);
        }
        console.log("받아온 메뉴 데이터:", menuList);
      })
      .catch(err => {
        console.error("메뉴 불러오기 실패:", err);
        if (onMenusLoaded) {
          onMenusLoaded([]);
        }
      });
  }, [restaurantId, onMenusLoaded]);

  return (
    <div className={styles.menuListContainer}>
      <div className={styles.menuList}>
        {menus.length > 0 ? (
          menus.map((menu) => (
            <div
              key={menu.id}
              className={`${styles.menuItem} ${selectedMenus.some((item) => item.id === menu.id) ? styles.selected : ''}`}
              onClick={() => onMenuToggle(menu)}
            >
              <div className={styles.checkboxContainer}>
                <input
                  type="checkbox"
                  checked={selectedMenus.some((item) => item.id === menu.id)}
                  readOnly
                  className={styles.checkbox}
                />
                <span className={styles.menuName}>{menu.name}</span>
              </div>
              <img
                src={`http://localhost:8080${menu.imageUrl}` || '/assets/sample-images/menu-thumb.jpg'}
                alt={menu.name}
                className={styles.menuImage}
              />
              <div className={styles.menuPrice}>가격: {menu.price?.toLocaleString()}원</div>
            </div>
          ))
        ) : (
          <p className={styles.loadingMessage}>메뉴를 불러오는 중이거나 메뉴가 없습니다.</p>
        )}
      </div>
    </div>
  );
};

export default MenuList;

MenuList.propTypes = {
  onMenusLoaded: PropTypes.func.isRequired,
  selectedMenus: PropTypes.array.isRequired,
  onMenuToggle: PropTypes.func.isRequired,
};