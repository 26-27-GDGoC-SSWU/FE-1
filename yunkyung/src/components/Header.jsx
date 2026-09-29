import { NavLink } from "react-router-dom";

// 모든 페이지에 공통으로 보이는 메뉴
// NavLink는 현재 주소와 같은 메뉴에 자동으로 active 클래스를 붙여준다
function Header() {
  return (
    <header className="header">
      <h1>투두리스트</h1>
      <nav className="nav">
        <NavLink to="/" end>
          내 할 일
        </NavLink>
        <NavLink to="/recommend">추천 할 일</NavLink>
      </nav>
    </header>
  );
}

export default Header;
