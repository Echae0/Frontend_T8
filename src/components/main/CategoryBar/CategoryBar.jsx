import { useState, useEffect } from "react";
import axios from "axios";
import "./CategoryBar.css";

const CategoryBar = ({ onCategorySelect }) => {
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/categories");
        setCategories(response.data);
      } catch (error) {
        console.error("카테고리 불러오기 실패:", error);
      }
    };

    fetchCategories();
  }, []);

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
