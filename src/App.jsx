import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'; // Link 추가
import RestaurantDetail from './pages/RestaurantDetail';
import './App.css'; // 스타일 파일 임포트

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route 
          path="/" 
          element={
            <button>
              <Link to="/restaurant">식당 상세 페이지 이동</Link>
            </button>
          } 
        />
        <Route path="/restaurant" element={<RestaurantDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;