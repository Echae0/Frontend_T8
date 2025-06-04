// src/components/main/RestaurantCard/RestaurantCard.jsx
import { useNavigate } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import "./RestaurantCard.css";

const RestaurantCard = ({ restaurant }) => {
  const navigate = useNavigate();
  const { id, restaurantName, imageUrl, categoryCode, location } = restaurant;

  const handleClick = () => {
    localStorage.setItem("selectedRestaurant", JSON.stringify(restaurant));
    navigate(`/restaurant/${id}`); // 백틱으로 감싸기!
  };


  return (
    <div className="restaurant-card" onClick={handleClick}>
      <div className="restaurant-image-container">
        {imageUrl ? (
          <img src={`http://localhost:8080${imageUrl}`} alt={restaurantName} className="restaurant-image" />
        ) : (
          <div className="no-image-text">이미지 없음</div>
        )}
      </div>

      <div className="restaurant-info">
        <h3 className="restaurant-name">{restaurantName}</h3>
        <p className="restaurant-location">{location || "위치 정보 없음"}</p>
        <div className="restaurant-meta">
          <span className="restaurant-category">{categoryCode || "카테고리 없음"}</span>
        </div>
      </div>
    </div>
  );
};

export default RestaurantCard;