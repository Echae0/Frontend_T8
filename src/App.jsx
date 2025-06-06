// src/App.jsx
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "./features/user/userSlice";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainDisplay from "./pages/MainDisplay"; // 메인 화면
import RestaurantDetail from "./pages/RestaurantDetail"; // 식당 상세
import WaitingFormPage from "./pages/WaitingFormPage"; // 웨이팅 신청
import MyPage from "./pages/MyPage"; // 마이페이지
import LoginPage from "./pages/LoginPage"; // 로그인
import ReviewFormPage from "./pages/ReviewFormPage"; // 리뷰 작성
import SignUpPage from "./pages/SignUpPage"; // 회원가입
import WaitingPage from "./pages/WaitingPage"; // 웨이팅 현황

import PrivateRoute from "./pages/PrivateRoute"; // 보호 라우트
import "./App.css";

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        dispatch(setUser(parsedUser));
      } catch (error) {
        console.error("localStorage 사용자 정보를 파싱할 수 없습니다:", error);
      }
    }
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Routes>
        {/* 공개 페이지 */}
        <Route path="/" element={<LoginPage />} /> {/* 기본 진입 시 로그인 */}
        <Route path="/login" element={<LoginPage />} /> {/* 로그인 페이지 */}
        <Route path="/signUp" element={<SignUpPage />} /> {/* 회원가입 페이지 */}

        {/* 보호된 페이지 */}
        <Route path="/maindisplay" element={<PrivateRoute><MainDisplay /></PrivateRoute>} /> {/* 메인 화면 */}
        <Route path="/mypage" element={<PrivateRoute><MyPage /></PrivateRoute>} /> {/* 마이페이지 */}
        <Route path="/reviewformpage" element={<PrivateRoute><ReviewFormPage /></PrivateRoute>} /> {/* 리뷰 작성 */}
        <Route path="/restaurant/:restaurantId" element={<PrivateRoute><RestaurantDetail /></PrivateRoute>} /> {/* 식당 상세 */}
        <Route path="/restaurant/:restaurantId/waiting" element={<PrivateRoute><WaitingPage /></PrivateRoute>} /> {/* 웨이팅 현황 */}
        <Route path="/restaurant/:restaurantId/waitingform" element={<PrivateRoute><WaitingFormPage /></PrivateRoute>} /> {/* 웨이팅 신청 */}
      </Routes>
    </BrowserRouter>
  );
}
