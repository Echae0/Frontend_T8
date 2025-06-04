// src/components/main/RestaurantSection/RestaurantSection.jsx
import RestaurantCard from "../RestaurantCard/RestaurantCard";
import "./RestaurantSection.css";

const RestaurantSection = ({ title, restaurants }) => {
  return (
    <section className="restaurant-section">
      {title && <h2 className="section-title">{title}</h2>}
      <div className="restaurant-grid">
        {restaurants.map((restaurant) => (
          <div className="restaurant-item" key={restaurant.id}>
            <RestaurantCard restaurant={restaurant} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default RestaurantSection;
