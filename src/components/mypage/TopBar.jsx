// src/components/common/TopBar.jsx
import { useNavigate } from "react-router-dom";
import { FaBell, FaUser, FaArrowLeft } from "react-icons/fa";
import "./TopBar.css";

const TopBar = () => {
  const navigate = useNavigate();

  return (
    <div className="top-bar">
      <button className="icon-button" onClick={() => navigate("/")}>
        <FaArrowLeft size={20} />
      </button>
      <div className="top-icons">
        <button className="icon-button" onClick={() => alert("알림 클릭")}>
          <FaBell size={20} />
        </button>
        <button
          className="icon-button"
          onClick={() => {
            window.location.href = "/mypage"; // ✅ 강제 새로고침 포함 이동
          }}
        >
          <FaUser size={20} />
        </button>
      </div>
    </div>
  );
};

export default TopBar;
