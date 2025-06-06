// src/pages/MainDisplay.jsx
import { useState, useEffect } from "react";
import axios from "axios";

import styles from "./MainDisplay.module.css";
import "../App.css";

import Header from "../components/main/Header/Header";
import CategoryBar from "../components/main/CategoryBar/CategoryBar";
import RestaurantSection from "../components/main/RestaurantSection/RestaurantSection";

export default function MainDisplay() {
  const [location, setLocation] = useState("강남구");
  const [restaurants, setRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/restaurants")
      .then((res) => {
        console.log("✅ 받은 데이터:", res.data);
        setRestaurants(res.data);
        setFilteredRestaurants(res.data); // 처음엔 전체 출력
      })
      .catch((err) => {
        console.error("❌ 데이터 가져오기 실패:", err);
      });
  }, []);

  const handleCategorySelect = (category) => {
    if (!category) {
      // category가 null이면 전체 보여주기
      setFilteredRestaurants(restaurants);
    } else {
      const result = restaurants.filter(
        (r) => r.categoryCode && r.categoryCode === category
      );
      setFilteredRestaurants(result);
    }
  };

  return (
    <div className="app">
      {/* <Header location={location} setLocation={setLocation} restaurants={restaurants}/> */}
      <Header
        location={location}
        setLocation={setLocation}
        restaurants={restaurants}
        onSearch={(query) => {
          if (!query) {
            setFilteredRestaurants(restaurants);
            return;
          }

          const result = restaurants.filter(
            (r) =>
              r.name?.toLowerCase().includes(query.toLowerCase()) ||
              r.description?.toLowerCase().includes(query.toLowerCase())
          );
          setFilteredRestaurants(result);
        }}
      />

      <main className="main-content">
        <div className="container">
          <div className={styles.banner}>
            📢 신규 맛집 등록 이벤트! 최대 50% 할인 🍽️
          </div>

          <CategoryBar onCategorySelect={handleCategorySelect} />

          <RestaurantSection
            title="식당 목록"
            restaurants={filteredRestaurants}
          />
        </div>
      </main>
    </div>
  );
}
