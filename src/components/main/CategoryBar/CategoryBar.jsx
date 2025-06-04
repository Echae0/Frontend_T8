// src/components/main/CategoryBar/CategoryBar.jsx
import { useState } from "react";
import "./CategoryBar.css";

const CategoryBar = ({ onCategorySelect }) => {
  const [activeCategory, setActiveCategory] = useState(null);

  const categories = [
    { categoryCode: "KOREAN", categoryName: "한식" },
    { categoryCode: "CHINESE", categoryName: "중식" },
    { categoryCode: "JAPANESE", categoryName: "일식" },
    { categoryCode: "WESTERN", categoryName: "양식" },
    { categoryCode: "ASIAN", categoryName: "아시안" },
    { categoryCode: "DESSERT", categoryName: "디저트" },
  ];

  const handleClick = (code) => {
    setActiveCategory(code);
    onCategorySelect(code);
  };

  return (
    <div className="category-bar">
      <div className="category-scroll">
        <button
          className={`category-button ${activeCategory === null ? "active" : ""}`}
          onClick={() => handleClick(null)}
        >
          전체
        </button>
        {categories.map((category) => (
          <button
            key={category.categoryCode}
            className={`category-button ${activeCategory === category.categoryCode ? "active" : ""}`}
            onClick={() => handleClick(category.categoryCode)}
          >
            {category.categoryName}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryBar;
