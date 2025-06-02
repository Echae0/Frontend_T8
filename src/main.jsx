import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import App from './App.jsx';
import WaitingFormPage from './components/WaitingFormPage.jsx';
import ReviewFormPage from './components/ReviewFormPage.jsx';
import SignUpPage from './components/SignUpPage.jsx';
import LoginPage from './components/LoginPage.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/restaurants/:restaurantId/reservations" element={<WaitingFormPage />} />
        <Route path="/review" element={<ReviewFormPage />} />
        <Route path="/signUp" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);