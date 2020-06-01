import React, { createContext, useReducer } from "react";

interface UserStateInterface {
  userid: string;
  token: string;
  isLoggedIn: boolean;
  error: string;
}

interface UserActionInterface {
  type: string;
  payload: {
    userid: string;
    token: string;
    error: string;
  };
}

const initState: UserStateInterface = {
  userid: localStorage.getItem("userid") || "",
  token: localStorage.getItem("token") || "",
  isLoggedIn: !!localStorage.getItem("userid"),
  error: "",
};

const reducer: React.Reducer<UserStateInterface, UserActionInterface> = (
  state,
  action
) => {
  switch (action.type) {
    case "LOGIN":
      localStorage.setItem("userid", action.payload.userid);
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        userid: action.payload.userid,
        token: action.payload.token,
        isLoggedIn: true,
        error: "",
      };

    case "LOGOUT":
      localStorage.removeItem("userid");
      localStorage.removeItem("token");
      return {
        ...state,
        userid: "",
        token: "",
        isLoggedIn: false,
        error: "",
      };

    case "ERROR":
      return {
        ...state,
        error: action.payload.error,
      };

    default:
      return state;
  }
};

const GlobalContext: React.Context<{
  state: UserStateInterface;
  dispatch?: React.Dispatch<UserActionInterface>;
}> = createContext({
  state: initState,
});

const GlobalProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initState);

  return (
    <GlobalContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
export { GlobalContext };
