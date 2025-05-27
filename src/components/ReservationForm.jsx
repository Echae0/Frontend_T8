// src/ReservationForm.jsx
import React from 'react';

const ReservationForm = () => {
  const inputStyle = {
    display: "block",
    width: "100%",
    padding: "10px",
    marginBottom: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
  };

  const buttonStyle = {
    flex: 1,
    padding: "10px",
    backgroundColor: "#3b82f6",
    color: "white",
    border: "none",
    borderRadius: "5px",
  };

  return (
    <div
      style={{
        width: "400px",
        padding: "30px",
        borderRadius: "10px",
        backgroundColor: "white",
        boxShadow: "0 0 10px rgba(0,0,0,0.1)",
      }}
    >
      <h2 style={{ textAlign: "center", color: "#333" }}>새마을 식당</h2>
      <p style={{ textAlign: "center" }}>
        현재 나의 순서: <strong>3번째 팀</strong><br />
        예상 대기 시간: <strong>15분</strong>
      </p>

      <input placeholder="예약날짜" style={inputStyle} />
      <input placeholder="요청사항" style={inputStyle} />
      <input placeholder="총 입장인원" style={inputStyle} />
      <input placeholder="총 주문금액" style={inputStyle} />

      <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
        <button style={buttonStyle}>이전</button>
        <button style={buttonStyle}>웨이팅 취소</button>
        <button style={buttonStyle}>미루기</button>
      </div>
    </div>
  );
};

export default ReservationForm;