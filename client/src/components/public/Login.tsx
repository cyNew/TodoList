import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import "./Login.css";
import { UserContext } from "../../context/UserContext";

const Login: React.FC = () => {
  let history = useHistory();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { dispatch } = useContext(UserContext);

  // handle login
  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    try {
      event.preventDefault();
      let res = await axios({
        url: "http://127.0.0.1:9000/api/v1/user/login",
        method: "post",
        data: {
          username,
          password
        }
      });
      dispatch({
        type: "LOGIN",
        payload: { userid: res.data.userid, token: res.data.token }
      });
      history.push("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="login-div">
      <h3>Sign in</h3>
      <form onSubmit={handleLogin}>
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
        <button className="input-submit" type="submit" value="Sign in">
          Sign In
        </button>
        {/* link button to register */}
        <button className="btn-link" onClick={() => history.push("/register")}>
          No account? Sign Up
        </button>
      </form>
    </div>
  );
};

export default Login;
