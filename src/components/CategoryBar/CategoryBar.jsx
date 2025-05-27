import { useState } from 'react'
import './CategoryBar.css'

const CategoryBar = () => {
  const [activeCategory, setActiveCategory] = useState('한식')
  
  const categories = [
    { id: 1, name: '한식' },
    { id: 2, name: '중식' },
    { id: 3, name: '일식' },
    { id: 4, name: '양식' },
    { id: 5, name: '카페' },
    { id: 6, name: '주점' },
    { id: 7, name: '분식' }
  ]
  
  return (
    <div className="category-bar">
      <div className="category-scroll">
        {categories.map((category) => (
          <button
            key={category.id}
            className={`category-button ${activeCategory === category.name ? 'active' : ''}`}
            onClick={() => setActiveCategory(category.name)}
          >
            {category.name}
          </button>
        ))}
      </div>
    </div>
  )
}

export default CategoryBar