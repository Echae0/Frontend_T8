import axios from 'axios';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import styles from './MenuList.module.css';
import { useParams } from 'react-router-dom';

const MenuList = ({ onMenusLoaded, selectedMenus, onMenuToggle }) => {
  const { restaurantId } = useParams();
  const [menus, setMenus] = useState([]);

  useEffect(() => {
    // API 호출을 통해 메뉴 데이터를 불러옵니다.
    axios.get(`http://localhost:8080/api/restaurants/${restaurantId}/menus`)
      .then(res => {
        const menuList = res.data;
        setMenus(menuList);
        // 불러온 메뉴 목록을 상위 컴포넌트(WaitingFormPage)로 전달합니다.
        if (onMenusLoaded) {
          onMenusLoaded(menuList);
        }
      })
      .catch(err => {
        console.error("메뉴 불러오기 실패:", err);
        if (onMenusLoaded) {
            onMenusLoaded([]); // 에러 발생 시 빈 배열 전달
        }
      });
  }, [restaurantId, onMenusLoaded]); // onMenusLoaded를 의존성 배열에 추가

  return (
    <div className={styles.menuListContainer}>
      <div className={styles.menuGrid}> {/* styles.menuList -> styles.menuGrid로 통일 */}
        {menus.length > 0 ? (
          menus.map((menu) => (
            <div
              key={menu.id}
              className={`${styles.menuItem} ${selectedMenus.some((item) => item.id === menu.id) ? styles.selected : ''}`}
              onClick={() => onMenuToggle(menu)} // 클릭 시 메뉴 선택/해제 로직 상위로 위임
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
                src={menu.imageUrl || '/assets/sample-images/menu-thumb.jpg'}
                alt={menu.name}
                className={styles.menuImage}
              />
              <div className={styles.menuPrice}>가격: {menu.price?.toLocaleString()}원</div>
            </div>
          ))
        ) : (
          // 메뉴가 없을 경우 또는 로딩 중일 때 메시지를 표시합니다.
          <p className={styles.loadingMessage}>메뉴를 불러오는 중이거나 메뉴가 없습니다.</p>
        )}
      </div>
    </div>
  );
};

export default MenuList;

MenuList.propTypes = {
  onMenusLoaded: PropTypes.func.isRequired, // 메뉴 데이터 로드 후 호출될 콜백 함수
  selectedMenus: PropTypes.array.isRequired, // 현재 선택된 메뉴 배열
  onMenuToggle: PropTypes.func.isRequired,   // 메뉴 선택/해제 시 호출될 콜백 함수
};