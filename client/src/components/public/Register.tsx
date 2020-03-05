import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { MsgBox } from "./MsgBox";

const Register: React.FC = () => {
  const history = useHistory();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");

  const handleRegister = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();

    if (password !== password2) {
      setMsg("");
      alert("Passwords are not same!");
      return;
    }
    try {
      const res = await axios({
        url: "/api/v1/user/register",
        method: "POST",
        data: {
          username,
          password,
          email
        }
      });

      if (res.data.success) {
        setMsg("");
        alert("Register successfully!");
        history.push("/login");
      } else {
        throw new Error(res.data.msg);
      }
    } catch (error) {
      setMsg(error.message);
      return;
    }
  };

  return (
    <div className="register-container container">
      <h3 className="title">Register</h3>
      <form onSubmit={handleRegister}>
        <label htmlFor="username">Username</label>
        <input
          minLength={6}
          maxLength={16}
          required
          id="username"
          className="form-input"
          type="text"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
        <label htmlFor="email">Email</label>
        <input
          required
          id="email"
          className="form-input"
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <label htmlFor="password1">Password</label>
        <input
          minLength={8}
          maxLength={16}
          required
          id="password1"
          className="form-input"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <label htmlFor="password2">Vertify Password</label>
        <input
          minLength={8}
          maxLength={16}
          required
          id="password2"
          className="form-input"
          type="password"
          value={password2}
          onChange={e => setPassword2(e.target.value)}
        />
        <MsgBox msg={msg} />
        <div className="btn-container">
          <button className="input-submit form-btn" type="submit">
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
