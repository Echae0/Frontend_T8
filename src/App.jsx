// src/App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainDisplay from "./pages/MainDisplay";
import RestaurantDetail from "./pages/RestaurantDetail";
import WaitingFormPage from "./pages/WaitingFormPage";
import MyPage from "./pages/MyPage";
import LoginPage from "./pages/LoginPage";
import ReviewFormPage from "./pages/ReviewFormPage";
import SignUpPage from './pages/SignUpPage.jsx';
import "./App.css";

export default function App() {
return (
<BrowserRouter>
<Routes>
{/* 루트(“/”)로 접속하면 바로 MainDisplay 렌더링 */}
<Route path="/" element={<MainDisplay />} />

{/* 아래 경로들도 그대로 두되, 인증 검증이 필요 없으므로 RequireAuth 제거 */}
<Route path="/maindisplay" element={<MainDisplay />} />
{/* <Route path="/restaurant" element={<RestaurantDetail />} /> */}
<Route path="/restaurant/:restaurantId" element={<RestaurantDetail />} />
<Route path="/restaurant/waiting" element={<WaitingFormPage />} />
<Route path="/mypage" element={<MyPage />} />
<Route path="/reviewformpage" element={<ReviewFormPage />} />
<Route path="/login" element={<LoginPage />} />
<Route path="/signUp" element={<SignUpPage />} />
</Routes>
</BrowserRouter>
);
}
