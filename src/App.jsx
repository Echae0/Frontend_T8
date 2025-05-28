// src/App.jsx
import React, { useState } from 'react'
import { Routes, Route, Link } from 'react-router-dom'

import Header from './components/Header/Header'
import CategoryBar from './components/CategoryBar/CategoryBar'
import RestaurantSection from './components/RestaurantSection/RestaurantSection'
import ReviewPage from './pages/ReviewPage'

import mosuImg from './assets/trending1.png'
import dragonHoleImg from './assets/trending2.png'
import gangnamExcellentImg from './assets/trending3.png'
import resto1Img from './assets/resto1.png'
import resto2Img from './assets/resto2.png'
import resto3Img from './assets/resto3.png'

import './App.css'

function App() {
  const [location, setLocation] = useState('강남구')

  const openRestaurants = [
    { id: 1, name: '모수',           image: mosuImg,             category: '한식', rating: 4.5, isOpen: true },
    { id: 2, name: '드레곤 홀',     image: dragonHoleImg,       category: '중식', rating: 4.3, isOpen: true },
    { id: 3, name: '강남 엑셀런트', image: gangnamExcellentImg, category: '양식', rating: 4.7, isOpen: true }
  ]

  const recommendedRestaurants = [
    { id: 4, name: '맛있는 식당 1', image: resto1Img, category: '한식', rating: 4.8, isRecommended: true },
    { id: 5, name: '맛있는 식당 2', image: resto2Img, category: '일식', rating: 4.6, isRecommended: true },
    { id: 6, name: '맛있는 식당 3', image: resto3Img, category: '카페', rating: 4.4, isRecommended: true }
  ]

  return (
    <div className="app">
      <Header location={location} setLocation={setLocation} />

      <nav style={{ padding: '0 16px' }}>
        <Link to="/">홈</Link> |&nbsp;
        <Link to="/review">리뷰</Link>
      </nav>

      <main className="main-content">
        <div className="container">
          <Routes>
            {/* 홈 화면 경로 */}
            <Route
              path="/"
              element={
                <>
                  <CategoryBar />
                  <RestaurantSection
                    title="지금 가는 식당"
                    restaurants={openRestaurants}
                  />
                  <RestaurantSection
                    title="추천 식당"
                    restaurants={recommendedRestaurants}
                  />
                </>
              }
            />
            {/* 리뷰 페이지 경로 */}
            <Route path="/review" element={<ReviewPage />} />
          </Routes>
        </div>
      </main>
    </div>
  )
}

export default App

