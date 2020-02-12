import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import { UserContext } from "../../context/UserContext";

const Header: React.FC = () => {
  const { state, dispatch } = useContext(UserContext);
  const { isLoggedIn } = state;

  // action logout
  const handleLogout = async (): Promise<void> => {
    dispatch({ type: "LOGOUT", payload: { userid: "", token: "" } });
  };

  // check the login status
  return (
    <header>
      <h1>React Todo App</h1>
      <nav>
        <Link className="link-item" to="/">
          Home
        </Link>
        {isLoggedIn ? (
          <Link className="link-item" to="/login" onClick={handleLogout}>
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
