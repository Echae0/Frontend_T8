// src/components/common/TopBar.jsx

import { useNavigate } from "react-router-dom";
import { FaUser, FaArrowLeft } from "react-icons/fa";
import "./TopBar.css";

const TopBar = () => {
  const navigate = useNavigate();

  return (
    <div className="top-bar">
      {/* 뒤로가기 버튼 */}
      <button className="icon-button" onClick={() => navigate("/maindisplay")}>
        <FaArrowLeft size={20} />
      </button>

      <div className="top-icons">
        {/* ─────────────────────────────────────────────────────────────
            1) 알림 버튼 제거
               - <FaBell> 아이콘 버튼 부분을 삭제했습니다.
            ───────────────────────────────────────────────────────────── */}

        {/* 마이페이지 아이콘 */}
        <button
          className="icon-button"
          onClick={() => {
            window.location.href = "/mypage"; // 새로고침 포함 이동
          }}
        >
          <FaUser size={30} />
        </button>
      </div>
    </div>
  );
};

export default TopBar;

