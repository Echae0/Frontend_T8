import React from "react";
import "./WaitingInfo.css";

const WaitingInfo = () => {
  return (
    <div className="waiting-container">
      <h2>새마을 식당</h2>
      <p>
        현재 나의 순서: <strong>3번째 팀</strong>
      </p>
      <p>
        예상 대기 시간: <strong>15분</strong>
      </p>

      <label>예약날짜</label>
      <input type="text" value="2025.05.27" readOnly />

      <label>요청사항</label>
      <input type="text" value="토마토 못 먹어요" readOnly />

      <label>총 입장인원</label>
      <input type="text" value="2명" readOnly />

      <label>총 주문금액</label>
      <input type="text" value="31800원" readOnly />

      <div className="waiting-buttons">
        <button>이전</button>
        <button>웨이팅 취소</button>
        <button>미루기</button>
      </div>
    </div>
  );
};

export default WaitingInfo;