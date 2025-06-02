// src/App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainDisplay from './pages/MainDisplay';
import RestaurantDetail from './pages/RestaurantDetail';
import WaitingFormPage from './pages/WaitingFormPage'; // ✅ 추가
import './App.css';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainDisplay />} />
        <Route path="/restaurant" element={<RestaurantDetail />} />
        <Route path="/restaurant/waiting" element={<WaitingFormPage />} /> {/* ✅ 추가 */}
      </Routes>
    </BrowserRouter>
  );
}
