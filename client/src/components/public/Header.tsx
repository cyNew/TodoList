import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { GlobalContext } from "../../context/GlobalContext";

const Header: React.FC = () => {
  const { isLoggedIn, logout } = useContext(GlobalContext);

  // check the login status
  return (
    <header>
      <h1>React Todo App</h1>
      <nav>
        <Link className="link-item" to="/">
          Home
        </Link>
        {isLoggedIn ? (
          <Link className="link-item" to="/login" onClick={logout}>
            Sign out
          </Link>
        ) : (
          <Link className="link-item" to="/login">
            Sign in
          </Link>
        )}
        <Link className="link-item" to="/about">
          About
        </Link>
      </nav>
    </header>
  );
};

export default Header;
