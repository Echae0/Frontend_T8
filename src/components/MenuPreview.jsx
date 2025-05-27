import './MenuPreview.module.css';

const MenuPreview = () => {
  return (
    <div className="menu-preview">
      <img src="/assets/sample-images/menu-main.jpg" alt="대표 메뉴" className="menu-main-img" />
      <p className="menu-caption">얼큰불고기김치세트 31,000원</p>
    </div>
  );
};

export default MenuPreview;
