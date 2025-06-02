// src/components/main/RestaurantCard/RestaurantCard.jsx
import { FaStar } from "react-icons/fa";
import "./RestaurantCard.css";

const RestaurantCard = ({ restaurant }) => {
  const { id, restaurantName, imageUrl, categoryCode, location } = restaurant;

  return (
    <div className="restaurant-card">
      <div className="restaurant-image-container">
        {imageUrl ? (
          <img src={`http://localhost:8080${restaurant.imageUrl}`} alt="" className="restaurantName" />
        ) : (
          <div className="no-image-text">이미지 없음</div>
        )}
      </div>

      <div className="restaurant-info">
        <h3 className="restaurant-name">{restaurantName}</h3>
        <p className="restaurant-location">{location || "위치 정보 없음"}</p>
        <div className="restaurant-meta">
          <span className="restaurant-category">
            {categoryCode || "카테고리 없음"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default RestaurantCard;
