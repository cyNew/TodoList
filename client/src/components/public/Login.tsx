import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { GlobalContext } from "../../context/GlobalContext";

const Login: React.FC = () => {
  let history = useHistory();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(GlobalContext);

  // handle login
  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    login(username, password);
    history.push("/");
  };

  return (
    <div className="login-container container">
      <h3 className="title">Sign in</h3>
      <form className="login-form" onSubmit={handleLogin}>
        <label htmlFor="username">Username:</label>
        <input
          required
          id="username"
          className="form-input"
          type="text"
          onChange={e => setUsername(e.target.value)}
          value={username}
        />
        <label htmlFor="password">Password:</label>
        <input
          required
          id="password"
          className="form-input"
          type="password"
          onChange={e => setPassword(e.target.value)}
          value={password}
        />

        <div className="btn-container">
          <button
            className="input-submit form-btn"
            type="submit"
            value="Sign in"
          >
            Sign In
          </button>
          {/* link button to register */}
          <button
            className="form-btn"
            onClick={() => history.push("/register")}
          >
            No account? Sign Up
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
