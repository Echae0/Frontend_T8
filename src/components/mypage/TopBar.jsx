// src/components/common/TopBar.jsx
import { useNavigate } from "react-router-dom";
import { FaKey, FaUser, FaArrowLeft } from "react-icons/fa";
import "./TopBar.css";

const TopBar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // accessToken 확인 (디버깅용 로그)
    const token = localStorage.getItem("token");
    console.log("📦 token:", token);

    // 사용자에게 안내 메시지
    alert("✅ 로그아웃합니다.");

    // 토큰 제거
    localStorage.removeItem("token"); // ✅ 삭제
    console.log("삭제 후:", localStorage.getItem("token")); // null 이어야 정상

    console.log("🗑️ Token 삭제 완료");

    // 로그인 페이지로 이동
    navigate("/login");
    console.log("➡️ 로그인 페이지로 이동");
  };

  return (
    <div className="top-bar">
      <button className="icon-button" onClick={() => navigate("/maindisplay")}>
        <FaArrowLeft size={20} />
      </button>
      <div className="top-icons">
        <button className="icon-button" onClick={handleLogout}>
          <FaKey size={20} />
        </button>
        <button
          className="icon-button"
          onClick={() => {
            window.location.href = "/mypage"; // 강제 새로고침 포함 이동
          }}
        >
          <FaUser size={20} />
        </button>
      </div>
    </div>
  );
};

export default TopBar;
