import React, { createContext, useReducer } from "react";

interface TodoInterface {
  id: number;
  todo: string;
  completed: string;
  created: string;
  updated: string;
}
interface TodoStateInterface {
  todos: Array<TodoInterface>;
  error?: string;
}

interface TodoActionInterface {
  type: string;
  payload: {
    todos: Array<TodoInterface>;
    id?: number;
    error?: string;
  };
}

const initState: TodoStateInterface = {
  todos: [],
  error: "",
};

const TodoContext: React.Context<{
  state: TodoStateInterface;
  dispatch?: React.Dispatch<TodoActionInterface>;
}> = createContext({
  state: initState,
});

const reducer: React.Reducer<TodoStateInterface, TodoActionInterface> = (
  state,
  action
) => {
  switch (action.type) {
    case "GET":
      return {
        ...state,
        todos: action.payload.todos,
      };
    case "ADD":
      return {
        ...state,
        todos: [...state.todos, ...action.payload.todos],
      };

    case "UPDATE":
      return {
        ...state,
        todos: action.payload.todos,
      };
    case "DELETE":
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload.id),
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

const TodoProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initState);

  return (
    <TodoContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export default TodoProvider;
export { TodoContext };
