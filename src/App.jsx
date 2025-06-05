// src/App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainDisplay from './pages/MainDisplay';
import RestaurantDetail from './pages/RestaurantDetail';
import WaitingFormPage from './pages/WaitingFormPage'; 
import WaitingPage from './pages/WaitingPage';
import MyPage from './pages/MyPage'
import LoginPage from './pages/LoginPage'
import ReviewFormPage from './pages/ReviewFormPage';
import SignUpPage from './pages/SignUpPage.jsx';
import './App.css';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />  
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