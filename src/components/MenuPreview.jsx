import styles from './MenuPreview.module.css';

const MenuPreview = ({ menu }) => {
  return (
    <div className={styles.menuPreview}>
      <img src={menu.img} alt={menu.name} className={styles.menuMainImg} />
      <p className={styles.menuCaption}>{menu.name}</p>
    </div>
  );
};

export default MenuPreview;