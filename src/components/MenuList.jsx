// src/components/MenuList.jsx
import axios from 'axios';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import styles from './MenuList.module.css'; // MenuList에 대한 CSS 모듈
import { useParams } from 'react-router-dom';

const MenuList = ({ onMenusLoaded, selectedMenus, onMenuToggle }) => {
  const { restaurantId } = useParams(); // URL 파라미터에서 restaurantId 가져오기
  const [menus, setMenus] = useState([]); // 백엔드에서 불러온 메뉴 목록 상태

  // 컴포넌트 마운트 시 또는 restaurantId 변경 시 메뉴 데이터 불러오기
  useEffect(() => {
    // restaurantId가 유효한지 확인 (예: undefined가 아닌지)
    if (!restaurantId) {
      console.warn("restaurantId가 없어 메뉴를 불러올 수 없습니다. URL을 확인해주세요.");
      if (onMenusLoaded) {
        onMenusLoaded([]); // 상위 컴포넌트에 빈 배열 전달
      }
      return;
    }

    // axios를 사용하여 백엔드 API 호출
    axios.get(`http://localhost:8080/api/restaurants/${restaurantId}/menus`)
      .then(res => {
        const menuList = res.data;
        setMenus(menuList); // 메뉴 상태 업데이트
        if (onMenusLoaded) {
          onMenusLoaded(menuList); // 상위 컴포넌트로 메뉴 데이터 전달 (여기서의 menus는 사용됩니다!)
        }
      })
      .catch(err => {
        console.error("메뉴 불러오기 실패:", err);
        // 오류 발생 시 빈 배열을 상위 컴포넌트로 전달
        if (onMenusLoaded) {
          onMenusLoaded([]);
        }
      });
  }, [restaurantId, onMenusLoaded]); // restaurantId와 onMenusLoaded가 변경될 때마다 실행

  return (
    <div className={styles.menuListContainer}>
      <div className={styles.menuGrid}>
        {menus.length > 0 ? (
          // 메뉴 데이터가 있을 경우 각 메뉴 아이템 렌더링
          menus.map((menu) => (
            <div
              key={menu.id}
              className={`${styles.menuItem} ${selectedMenus.some((item) => item.id === menu.id) ? styles.selected : ''}`}
              onClick={() => onMenuToggle(menu)} // 클릭 시 onMenuToggle 함수 호출
            >
              <div className={styles.checkboxContainer}>
                <input
                  type="checkbox"
                  checked={selectedMenus.some((item) => item.id === menu.id)} // 선택 여부에 따라 체크박스 상태 결정
                  readOnly // 사용자 직접 클릭 방지 (부모 div 클릭으로 처리)
                  className={styles.checkbox}
                />
                <span className={styles.menuName}>{menu.name}</span>
              </div>
              {/* 메뉴 이미지가 없거나 오류가 발생할 경우를 대비하여 기본 이미지 경로 설정 */}
              <img
                src={menu.imageUrl || '/assets/sample-images/menu-thumb.jpg'} // 대체 이미지 경로 예시
                alt={menu.name}
                className={styles.menuImage}
              />
              <div className={styles.menuPrice}>가격: {menu.price?.toLocaleString()}원</div>
            </div>
          ))
        ) : (
          // 메뉴가 없을 경우 또는 로딩 중일 때 메시지를 표시
          <p className={styles.loadingMessage}>메뉴를 불러오는 중이거나 메뉴가 없습니다.</p>
        )}
      </div>
    </div>
  );
};

export default MenuList;

// PropTypes로 MenuList 컴포넌트가 받을 props의 타입을 정의 (오류 방지 및 가독성 향상)
MenuList.propTypes = {
  // onMenusLoaded는 MenuList가 메뉴 로딩 완료 시 호출하며, MenuList는 이 함수에 실제 메뉴 데이터를 전달합니다.
  // WaitingFormPage에서는 이 데이터를 직접 사용하지 않아도 되므로, 매개변수를 받지 않도록 변경했습니다.
  onMenusLoaded: PropTypes.func.isRequired, 
  selectedMenus: PropTypes.array.isRequired, // 현재 선택된 메뉴 배열 (필수)
  onMenuToggle: PropTypes.func.isRequired,   // 메뉴 선택/해제 시 호출될 콜백 함수 (필수)
};