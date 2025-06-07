import { useState, useEffect } from 'react';
import styles from "./RestaurantDetail.module.css";
import { Link, useParams } from "react-router-dom";
import axios from 'axios';
import { useSelector } from 'react-redux';

import RestaurantImageSlider from "../components/Restaurant_detail/RestaurantImageSlider.jsx";
import RestaurantInfo from "../components/Restaurant_detail/RestaurantInfo";
import WaitingInfo from "../components/Restaurant_detail/WaitingInfo";

import MenuList from "../components/Restaurant_detail/MenuList";
import MenuPreview from "../components/Restaurant_detail/MenuPreview";

import ReviewList from "../components/Restaurant_detail/ReviewList";
// import ReviewList_select from '../components/Restaurant_detail/ReviewList_select';
import TopBar from "../components/mypage/TopBar";

const RestaurantDetail = () => {
  const [selectedMenu, setSelectedMenu] = useState(null);
  const { restaurantId } = useParams();
  const [username, setUsername] = useState(""); // 이름 상태 추가
  const user = useSelector((state) => state.user);

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

  return (
    <div>
      <TopBar username={username} />
      <div className={styles.container}>
        <div className={styles.topSection}>
          <div className={styles.sliderWrapper}>
            <RestaurantImageSlider />
          </div>
          <div className={styles.waitingInfoWrapper}>
            <WaitingInfo />
          </div>
        </div>

        <div className={styles.infoSection}>
          <RestaurantInfo />
        </div>

        <div className={styles.contentWrapper}>
          <div className={styles.leftColumn}>
            {selectedMenu && <MenuPreview menu={selectedMenu} />}
            {/* <MenuList setSelectedMenu={setSelectedMenu} /> */}
          </div>

          <div className={styles.rightColumn}>
            <MenuList setSelectedMenu={setSelectedMenu} />
            {/* <ReviewList_select /> */}
          </div>
        </div>

        <div className={styles.bottomReviewSection}>
          <ReviewList isBottomSection />
        </div>

        <div className={styles.waitingButtonContainer}>
          {/* ✅ Link로 감싸기 */}
          <Link to={`/restaurant/${restaurantId}/waitingform`}>
            <button className={styles.waitingButton}>웨이팅</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RestaurantDetail;
