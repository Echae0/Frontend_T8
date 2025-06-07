import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from './RestaurantImageSlider.module.css';

const RestaurantImageSlider = () => {
  const { restaurantId } = useParams();
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:8080/api/restaurants/${restaurantId}`)
      .then((res) => {
        setImageUrl(res.data.imageUrl); // ⚠️ imageUrl 필드명은 DB에 따라 다를 수 있음
      })
      .catch((err) => {
        console.error("Error loading restaurant image:", err);
      });
  }, [restaurantId]);

  if (!imageUrl) {
    return <div className={styles.singleImageContainer}>이미지를 불러오는 중...</div>;
  }

  return (
    <div className={styles.singleImageContainer}>
      <img src={`http://localhost:8080${imageUrl}`} className="singleImage" />
    </div>
  );
};

export default RestaurantImageSlider;