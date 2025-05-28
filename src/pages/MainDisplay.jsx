// src/pages/MainDisplay.jsx
import { useState } from 'react';
import { Link } from 'react-router-dom';

import styles from './MainDisplay.module.css';
import '../App.css';

import Header from '../components/main/Header/Header';
import CategoryBar from '../components/main/CategoryBar/CategoryBar';
import RestaurantSection from '../components/main/RestaurantSection/RestaurantSection';

import mosuImg from '../assets/trending1.png';
import dragonHoleImg from '../assets/trending2.png';
import gangnamExcellentImg from '../assets/trending3.png';
import resto1Img from '../assets/resto1.png';
import resto2Img from '../assets/resto2.png';
import resto3Img from '../assets/resto3.png';


export default function MainDisplay() {
  const [location, setLocation] = useState('강남구')

  const openRestaurants = [
    { id: 1, name: '모수', image: mosuImg, category: '한식', rating: 4.5, isOpen: true },
    { id: 2, name: '드레곤 홀', image: dragonHoleImg, category: '중식', rating: 4.3, isOpen: true },
    { id: 3, name: '강남 엑셀런트', image: gangnamExcellentImg, category: '양식', rating: 4.7, isOpen: true },
  ]

  const recommendedRestaurants = [
    { id: 4, name: '맛있는 식당 1', image: resto1Img, category: '한식', rating: 4.8, isRecommended: true },
    { id: 5, name: '맛있는 식당 2', image: resto2Img, category: '일식', rating: 4.6, isRecommended: true },
    { id: 6, name: '맛있는 식당 3', image: resto3Img, category: '카페', rating: 4.4, isRecommended: true },
  ]

  return (
    <div className="app">
      <Header location={location} setLocation={setLocation} />
      <main className="main-content">
        <div className="container">
          <div className={styles.banner}>
            📢 신규 맛집 등록 이벤트! 최대 50% 할인 🍽️
          </div>

          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <Link to="/restaurant" className={styles.linkButton}>
            식당 상세 페이지 보기 →
          </Link>
          </div>

          <CategoryBar />

          <h2 className={styles.sectionTitle}>지금 가는 식당</h2>
          <RestaurantSection title="" restaurants={openRestaurants} />

          <h2 className={styles.sectionTitle}>추천 식당</h2>
          <RestaurantSection title="" restaurants={recommendedRestaurants} />
        </div>
      </main>
    </div>
  )
}
