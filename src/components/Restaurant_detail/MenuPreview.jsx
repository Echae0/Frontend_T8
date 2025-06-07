import styles from './MenuPreview.module.css';
import PropTypes from 'prop-types';

const MenuPreview = ({ menu }) => {
  return (
      <div className={styles.menuPreview}>      
        <img src={`http://localhost:8080${menu.imageUrl}`} alt={menu.name} className={styles.menuMainImg_pv} />
        <p className={styles.menuCaption_pv}>{menu.name}</p>
        <p className={styles.menuPrice_pv}>{menu.price?.toLocaleString()}원</p>
        <p className={styles.menuDescription_pv}> {menu.description}</p>
      </div>
  );
};

export default MenuPreview;

MenuPreview.propTypes = {
  menu: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired, 
    img: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    description: PropTypes.string
  })
};