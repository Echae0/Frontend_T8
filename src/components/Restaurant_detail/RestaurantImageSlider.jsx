// src/components/Restaurant_detail/RestaurantImageSlider.jsx
import styles from "./RestaurantImageSlider.module.css";

const RestaurantImageSlider = ({ restaurant }) => {
  if (!restaurant) return null;

  return (
    <div className={styles.singleImageContainer}>
      {restaurant?.imageUrl ? (
        <img
          src={`http://localhost:8080${restaurant.imageUrl}`}
          alt="식당 대표 사진"
          className={styles.singleImage}
        />
      ) : (
        <div
          style={{
            height: 300,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#999",
          }}
        >
          이미지 없음
        </div>
      )}
    </div>
  );
};

export default RestaurantImageSlider;
