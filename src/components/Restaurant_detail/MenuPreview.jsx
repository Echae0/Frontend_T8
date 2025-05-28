import styles from './MenuPreview.module.css';

const MenuPreview = ({ menu }) => {
  return (
      <div className={styles.menuPreview}>      
        <img src={menu.img} alt={menu.name} className={styles.menuMainImg_pv} />
        <p className={styles.menuCaption_pv}>{menu.name}</p>
        <p className={styles.menuPrice_pv}>{menu.price?.toLocaleString()}원</p>
      </div>
  );
};

export default MenuPreview;
