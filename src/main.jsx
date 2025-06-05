// import { StrictMode } from 'react';
// import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';
import axios from 'axios';
import { Provider } from 'react-redux';
// import { store } from './app/store';
import ReactDOM from 'react-dom/client';
import store from './app/store'; // ✅ default import


// 전역 설정
const token = localStorage.getItem('token');
if (token) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <App />
//   </StrictMode>
// );
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
