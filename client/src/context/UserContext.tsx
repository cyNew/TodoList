import React, { createContext, useReducer, Dispatch } from "react";

// interface for State
interface UserState {
  userid: string;
  isLoggedIn: boolean;
  token: string;
}
// interface for action
interface UserAction {
  type: string;
  payload: {
    userid: string;
    token: string;
  };
}

// initial state
const initialState = {
  userid: localStorage.getItem("userid") || "",
  isLoggedIn: localStorage.getItem("userid") ? true : false,
  token: localStorage.getItem("token") || ""
};

const reducer = (state: UserState, action: UserAction) => {
  switch (action.type) {
    case "LOGIN":
      localStorage.setItem("token", action.payload.token!);
      localStorage.setItem("userid", action.payload.userid!);
      return {
        userid: action.payload.userid,
        isLoggedIn: true,
        token: action.payload.token
      };
    case "LOGOUT":
      localStorage.removeItem("token");
      localStorage.removeItem("userid");
      return {
        userid: action.payload.userid,
        isLoggedIn: false,
        token: action.payload.token
      };
    default:
      return state;
  }
};

export const UserContext = createContext<{state: UserState, dispatch: Dispatch<UserAction>}>({
  state: initialState,
  dispatch: () => {}
});

export const UserProvider: React.FC = props => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {props.children}
    </UserContext.Provider>
  );
};
