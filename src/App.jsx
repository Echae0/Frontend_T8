// src/App.jsx
import React from 'react';
import { Link } from 'react-router-dom'; // Link 컴포넌트를 임포트합니다.
import './App.css';

function App() {
  // 실제 식당 ID를 여기에 넣어주세요. (예시로 1을 사용합니다.)
  // 실제 애플리케이션에서는 이 restaurantId를 동적으로 가져와야 할 수 있습니다.
  // 예를 들어, 사용자 입력, 다른 페이지에서 전달받기, 기본값 설정 등.
  const restaurantId = 1; // <--- 여기에 실제 사용하려는 식당 ID를 넣으세요!

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      backgroundColor: '#f0f2f5',
      fontFamily: 'Arial, sans-serif',
      color: '#333'
    }}>
      <h1>환영합니다!</h1>
      <p>원하는 페이지로 이동하세요:</p>
      <nav style={{ marginTop: '30px' }}>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          <li style={{ marginBottom: '10px' }}>
            <Link 
              to={`/restaurants/${restaurantId}/reservations`} 
              style={{
                textDecoration: 'none',
                color: '#FFD700',
                fontWeight: 'bold',
                fontSize: '1.2rem',
                padding: '10px 20px',
                border: '1px solid #FFD700',
                borderRadius: '5px',
                transition: 'all 0.2s ease-in-out'
              }}>
              대기 등록 페이지로 이동
            </Link>
          </li>
          <li style={{ marginBottom: '20px' }}> 
            <Link to="/review" style={{
              textDecoration: 'none',
              color: '#FFD700',
              fontWeight: 'bold',
              fontSize: '1.2rem',
              padding: '10px 20px',
              border: '1px solid #FFD700',
              borderRadius: '5px',
              transition: 'all 0.2s ease-in-out'
            }}>
              리뷰 작성 페이지로 이동
            </Link>
          </li>
          <li>
            <Link to="/signUp" style={{
              textDecoration: 'none',
              color: '#FFD700',
              fontWeight: 'bold',
              fontSize: '1.2rem',
              padding: '10px 20px',
              border: '1px solid #FFD700',
              borderRadius: '5px',
              transition: 'all 0.2s ease-in-out'
            }}>
              회원 가입 페이지로 이동
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default App;