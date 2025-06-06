import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  // 로그인 안 되어 있으면 /login으로 리다이렉트
  if (!token) {
    alert("로그인이 필요합니다.");
    return <Navigate to="/login" replace />;
  }

  // 로그인 되어 있으면 children 컴포넌트 출력
  return children;
};

PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PrivateRoute;
