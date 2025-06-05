// src/App.jsx
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "./features/user/userSlice";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainDisplay from './pages/MainDisplay';
import RestaurantDetail from './pages/RestaurantDetail';
import WaitingFormPage from './pages/WaitingFormPage'; // ✅ 추가
import MyPage from './pages/MyPage'
import LoginPage from './pages/LoginPage'
import ReviewFormPage from './pages/ReviewFormPage';
import SignUpPage from './pages/SignUpPage.jsx';
import WaitingPage from './pages/WaitingPage';
import './App.css';

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
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />  
        <Route path="/maindisplay" element={<MainDisplay />} />
        <Route path="/restaurant/:restaurantId" element={<RestaurantDetail />} />
        <Route path="/restaurant/:restaurantId/waitingform" element={<WaitingFormPage />} /> {/* ✅ 추가 */}
        <Route path="/mypage" element={<MyPage />} /> {/* ✅ 마이페이지 추가 */}
        <Route path="/restaurant/:restaurantId/waiting" element={<WaitingPage />} />
        <Route path="/reviewformpage" element={<ReviewFormPage />} />
        <Route path="/signUp" element={<SignUpPage />} />
      </Routes>
    </BrowserRouter>
  );
}