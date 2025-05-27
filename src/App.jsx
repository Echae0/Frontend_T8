// src/App.jsx
import React from 'react';
import ReservationForm from "./components/ReservationForm";

function App() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",  // minHeight로 변경 (내용이 많아져도 대응 가능)
        padding: "20px",    // 화면 가장자리와의 여백 추가
        backgroundColor: "#f8f9fa",
      }}
    >
      <div
        style={{
          width: "500px",  // 400px → 500px로 크기 증가
          padding: "40px", // 내부 패딩도 증가
          borderRadius: "12px", // 모서리 둥글기 강조
          backgroundColor: "white",
          boxShadow: "0 4px 20px rgba(0,0,0,0.12)", // 그림자 강조
          transform: "translateY(-5%)" // 미세한 위치 조정 (선택사항)
        }}
      >
        <h2 style={{ 
          textAlign: "center", 
          color: "#333",
          fontSize: "24px",  // 제목 크기 증가
          marginBottom: "25px" // 여백 추가
        }}>
          새마을 식당
        </h2>
        
        <div style={{ textAlign: "center", marginBottom: "25px" }}>
          <p style={{ margin: "10px 0", fontSize: "16px" }}>
            현재 나의 순서: <strong style={{ fontSize: "18px" }}>3번째 팀</strong>
          </p>
          <p style={{ margin: "10px 0", fontSize: "16px" }}>
            예상 대기 시간: <strong style={{ fontSize: "18px" }}>15분</strong>
          </p>
        </div>

        <input placeholder="예약날짜" style={inputStyle} />
        <input placeholder="요청사항" style={inputStyle} />
        <input placeholder="총 입장인원" style={inputStyle} />
        <input placeholder="총 주문금액" style={inputStyle} />

        <div style={{ 
          display: "flex", 
          gap: "12px", 
          marginTop: "30px" // 버튼 상단 여백 증가
        }}>
          <button style={buttonStyle}>이전</button>
          <button style={{
            ...buttonStyle,
            backgroundColor: "#ef4444" // 취소 버튼은 빨간색으로
          }}>웨이팅 취소</button>
          <button style={{
            ...buttonStyle,
            backgroundColor: "#10b981" // 미루기 버튼은 초록색으로
          }}>미루기</button>
        </div>
      </div>
    </div>
  );
}

const inputStyle = {
  display: "block",
  width: "100%",
  padding: "12px",  // 입력창 패딩 증가
  marginBottom: "15px", // 입력창 간격 증가
  borderRadius: "6px",
  border: "1px solid #ddd",
  fontSize: "16px"  // 입력 텍스트 크기 증가
};

const buttonStyle = {
  flex: 1,
  padding: "12px",
  backgroundColor: "#3b82f6",
  color: "white",
  border: "none",
  borderRadius: "6px",
  fontSize: "16px",
  fontWeight: "500",
  cursor: "pointer",
  transition: "all 0.2s ease",
  ":hover": {
    opacity: 0.9,
    transform: "translateY(-1px)"
  }
};
export default App;