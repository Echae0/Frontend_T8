import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import RestaurantDetail from './pages/RestaurantDetail';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<button onClick={() => window.location.href = '/restaurant'}>상세 페이지 이동</button>} />
        <Route path="/restaurant" element={<RestaurantDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;