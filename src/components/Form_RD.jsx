// src/components/Form_RD.jsx
import React from 'react';
import './Form_RD.css';

const Form_RD = () => {
  return (
    <div className="restaurant-detail-wrapper">
      <div className="restaurant-header">
        <h2>세마음 식당</h2>
        <div className="restaurant-images">
          <img src="/sample1.jpg" alt="식당" />
          <img src="/sample2.jpg" alt="식당" />
          <img src="/sample3.jpg" alt="식당" />
        </div>
        <div className="action-buttons">
          <button>현재 대기 인원</button>
          <button>예상 대기 시간</button>
        </div>
        <p>📍 신천동 400-2번지 동구 대구광역시 KR</p>
        <p>⏰ 영업시간: ~~</p>
      </div>

      <div className="menu-review-section">
        <div className="menu-box">
          <img src="/menu-main.jpg" alt="대표 메뉴" />
          <p className="menu-title">얼큰불고기김치세트</p>
          <p className="menu-price">₩13,000</p>
          <div className="menu-list">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <img key={i} src={`/menu-${i}.jpg`} alt={`menu${i}`} />
            ))}
          </div>
        </div>

        <div className="review-box">
          <h3>선택 메뉴 포함 리뷰</h3>
          {[1, 2].map(i => (
            <div className="review-card" key={i}>
              <div className="review-header">
                <span className="nickname">nickname</span>
                <span>⭐️⭐️⭐️</span>
              </div>
              <img src="/review-food.jpg" alt="리뷰 음식" />
              <p>먹고도 먹었고 맛있었던 불고기볶음과 마늘쫑...</p>
              <p className="review-meta">인기 세트 · 리뷰수: 14건 · 추천수: 45 · 메뉴 사진 수: 9장</p>
            </div>
          ))}
        </div>
      </div>

      <button className="waiting-button">웨이팅</button>
    </div>
  );
};

export default Form_RD;
