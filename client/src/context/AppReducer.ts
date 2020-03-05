export type UserStateType =
  | {
      userid: string;
      token: string;
      isLoggedIn: boolean;
      error?: string | undefined;
    }
  | {
      userid: string;
      token: string;
      isLoggedIn: boolean;
      error?: string | undefined;
      login: (username: string, password: string) => void;
      logout: () => void;
    };

export interface UserActionType {
  type: string;
  payload: {
    userid?: string;
    token?: string;
    error?: string;
  };
}

export const AppReducer = (
  state: UserStateType,
  action: UserActionType
): UserStateType => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        userid: action.payload.userid!,
        token: action.payload.token!,
        isLoggedIn: true,
        error: ""
      };

    case "LOGOUT":
      return {
        ...state,
        userid: "",
        token: "",
        isLoggedIn: false,
        error: ""
      };

    case "ERROR":
      return {
        ...state,
        error: action.payload.error
      };

    default:
      return state;
  }
};
