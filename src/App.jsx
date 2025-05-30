import React from 'react';
import './App.css';

function App() {
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
      <nav style={{ marginTop: '20px' }}>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          <li style={{ marginBottom: '10px' }}>
            <a href="/WaitingForm" style={{
              textDecoration: 'none',
              color: '#FFD700',
              fontWeight: 'bold',
              fontSize: '1.2rem',
              padding: '10px 20px',
              border: '1px solid #FFD700',
              borderRadius: '5px',
              transition: 'all 0.2s ease-in-out'
            }}>대기 등록 페이지로 이동</a>
          </li>
          <li style={{ marginBottom: '10px' }}> 
            <a href="/review" style={{
              textDecoration: 'none',
              color: '#FFD700',
              fontWeight: 'bold',
              fontSize: '1.2rem',
              padding: '10px 20px',
              border: '1px solid #FFD700',
              borderRadius: '5px',
              transition: 'all 0.2s ease-in-out'
            }}>리뷰 작성 페이지로 이동</a>
          </li>
          <li>
            <a href="/signUp" style={{
              textDecoration: 'none',
              color: '#FFD700',
              fontWeight: 'bold',
              fontSize: '1.2rem',
              padding: '10px 20px',
              border: '1px solid #FFD700',
              borderRadius: '5px',
              transition: 'all 0.2s ease-in-out'
            }}>회원 가입 페이지로 이동</a>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default App;