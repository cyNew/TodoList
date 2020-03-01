import React, { createContext, useReducer, Dispatch } from "react";
import { AppReducer, StateType, ActionType } from "./AppReducer";

// initial state
const initialState = {
  userid: localStorage.getItem("userid") || "",
  isLoggedIn: localStorage.getItem("userid") ? true : false,
  token: localStorage.getItem("token") || ""
};

export const GlobalContext = createContext<{state: StateType, dispatch: Dispatch<ActionType>}>({
  state: initialState,
  dispatch: () => {}
});

export const GlobalProvider: React.FC = props => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  return (
    <GlobalContext.Provider value={{ state, dispatch }}>
      {props.children}
    </GlobalContext.Provider>
  );
};
