import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from 'react-redux';
import styles from "./MainDisplay.module.css";
import "../App.css";
import Header from "../components/main/Header/Header";
import CategoryBar from "../components/main/CategoryBar/CategoryBar";
import RestaurantSection from "../components/main/RestaurantSection/RestaurantSection";

export default function MainDisplay() {
  const user = useSelector((state) => state.user);
  const [username, setUsername] = useState(""); // 이름 상태 추가
  const [location, setLocation] = useState("전체");
  const [restaurants, setRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/restaurants")
      .then((res) => {
        console.log("✅ 받은 데이터:", res.data);
        setRestaurants(res.data);
        setFilteredRestaurants(res.data);
      })
      .catch((err) => {
        console.error("❌ 데이터 가져오기 실패:", err);
      });
  }, [user]);

  useEffect(() => {
    if (user && user.memberId) {
      axios
        .get(`http://localhost:8080/api/members/${user.memberId}`)  // 예: 유저 정보 API
        .then((res) => {
          setUsername(res.data.name || "손님");
        })
        .catch((err) => {
          console.error("❌ 유저 이름 가져오기 실패:", err);
          setUsername("손님");
        });
    } else {
      setUsername("손님");
    }
  }, [user]);

  // searchQuery 또는 location 변경 시, restaurants에서 필터링 수행
  useEffect(() => {
    const q = searchQuery.toLowerCase();

    const filtered = restaurants.filter((r) => {
      const name = r.name?.toLowerCase() || "";
      const desc = r.description?.toLowerCase() || "";
      const loc = r.location || "";

      const matchQuery = name.includes(q) || desc.includes(q);
     const matchLocation = location === "전체" || loc.includes(location);

      return matchQuery && matchLocation;
    });

    setFilteredRestaurants(filtered);
  }, [searchQuery, location, restaurants]);

  const handleCategorySelect = (category) => {
    if (!category) {
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
      <Header
        location={location}
        setLocation={setLocation}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        username={username}
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
