import { FaStar } from 'react-icons/fa'
import './RestaurantCard.css'

const RestaurantCard = ({ restaurant }) => {
  const { name, image, category, rating } = restaurant
  
  return (
    <div className="restaurant-card">
      <div className="restaurant-image-container">
        <img 
          src={image} 
          alt={name} 
          className="restaurant-image" 
        />
      </div>
      <div className="restaurant-info">
        <h3 className="restaurant-name">{name}</h3>
        <div className="restaurant-meta">
          <span className="restaurant-category">{category}</span>
          <div className="restaurant-rating">
            <FaStar className="star-icon" />
            <span>{rating}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RestaurantCard