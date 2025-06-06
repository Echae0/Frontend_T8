// src/components/common/TopBar.jsx
import { useNavigate } from "react-router-dom";
import { FaKey, FaUser, FaArrowLeft } from "react-icons/fa";
import "./TopBar.css";

const TopBar = ({username}) => {
  const navigate = useNavigate();
  
  const handleLogout = () => {
    const confirmLogout = window.confirm("로그아웃하시겠습니까?");
    if (confirmLogout) {
      // 사용자에게 안내 메시지
      alert("✅ 로그아웃합니다.");

      // 토큰 제거
      localStorage.removeItem("token");
      console.log("삭제 후:", localStorage.getItem("token")); // null 이어야 정상
      console.log("🗑️ Token 삭제 완료");

      // 로그인 페이지로 이동
      navigate("/login");
      console.log("➡️ 로그인 페이지로 이동");
    } else {
      console.log("❎ 로그아웃 취소됨");
    }
  };

  return (
    <div className="top-bar">
      <button className="icon-button" onClick={() => navigate("/maindisplay")}>
        <FaArrowLeft size={30} />
      </button>
      <div className="top-icons">
        <div className="username-box">
          {username}님, 환영합니다 !
        </div>
        <button className="icon-button" onClick={handleLogout}>
          <FaKey size={30} />
        </button>
        <button
          className="icon-button"
          onClick={() => {
            window.location.href = "/mypage"; // 강제 새로고침 포함 이동
          }}
        >
          <FaUser size={30} />
        </button>
      </div>
    </div>
  );
};

export default TopBar;
