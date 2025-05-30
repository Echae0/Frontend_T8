import React, { useState } from 'react';
import './App.css';

function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
    console.log('Login attempt with:', email, password);
  };

  return (
    <div className="container">
      <div className="logo">
        <img src="/muck-logo.png" alt="MUCK" />
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="이메일"
          className="input-field"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="비밀번호"
          className="input-field"
        />
        <button type="button" className="signup-btn">
          회원가입
        </button>
        <button type="submit" className="login-btn">
          LOGIN
        </button>
      </form>
    </div>
  );
}

export default App