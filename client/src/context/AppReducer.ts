export interface StateType {
  userid: string;
  isLoggedIn: boolean;
  token: string;
}
// interface for action
export interface ActionType {
  type: string;
  payload: {
    userid: string;
    token: string;
  };
}

export const AppReducer = (state: StateType, action: ActionType) => {
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
