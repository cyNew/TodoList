import React, { createContext, useReducer, Reducer } from "react";
import { AppReducer, UserStateType, UserActionType } from "./AppReducer";
import axios from "axios";

const initailState: UserStateType = {
  userid: localStorage.getItem("userid") || "",
  token: localStorage.getItem("token") || "",
  isLoggedIn: localStorage.getItem("userid") ? true : false,
  error: "",
  login: (username: string, password: string) => {},
  logout: () => {}
};

export const GlobalContext = createContext(initailState);

export const GlobalProvider: React.FC = ({ children }) => {
  const API_URL = "/api/v1/user/";
  const [state, dispatch] = useReducer<Reducer<UserStateType, UserActionType>>(
    AppReducer,
    initailState
  );

  // @desc User Sign in
  // @url POST /api/v1/uesr
  const login = async (username: string, password: string) => {
    try {
      const res = await axios({
        url: API_URL + "login",
        method: "POST",
        data: {
          username,
          password
        }
      });
      if (res.data.success) {
        dispatch({
          type: "LOGIN",
          payload: {
            userid: res.data.userid,
            token: res.data.token
          }
        });
        localStorage.setItem("userid", res.data.userid);
        localStorage.setItem("token", res.data.token);
      } else {
        throw new Error(res.data.msg);
      }
    } catch (error) {
      dispatch({
        type: "ERROR",
        payload: { error: error.message }
      });
    }
  };

  function logout() {
    dispatch({
      type: "LOGOUT",
      payload: {}
    });
    localStorage.removeItem("userid");
    localStorage.removeItem("token");
  }

  return (
    <GlobalContext.Provider
      value={{
        isLoggedIn: state.isLoggedIn,
        userid: state.userid,
        token: state.token,
        error: state.error,
        login,
        logout
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
