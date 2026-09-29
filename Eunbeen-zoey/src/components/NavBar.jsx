import React from 'react';
import { Link, useLocation } from 'react-router-dom';

// [3단계] 페이지 간 이동을 담당하는 네비게이션 바
// <Link>는 <a>와 달리 페이지를 새로고침하지 않고 이동시켜줌 (SPA 방식)
function NavBar() {
  const location = useLocation();

  return (
    <nav className="navbar">
      <Link
        to="/"
        className={location.pathname === '/' ? 'active' : ''}
      >
        📅 달력
      </Link>
      <Link
        to="/settings"
        className={location.pathname === '/settings' ? 'active' : ''}
      >
        ⚙️ 설정
      </Link>
    </nav>
  );
}

export default NavBar;
