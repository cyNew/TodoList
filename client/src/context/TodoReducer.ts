export enum Status {
  y = "Y",
  n = "N"
}

export interface Todo {
  id: number;
  todo: string;
  completed: Status;
  created: string;
  updated: string;
}

export type TodoStateType =
  | {
      todos: Array<Todo>;
      error?: string;
      loading: boolean;
    }
  | {
      todos: Array<Todo>;
      error?: string;
      loading: boolean;
      getAllTodos: (userid: string, token: string) => void;
      createTodo: (userid: string, token: string, todo: string) => void;
      updateTodo: (userid: string, token: string, id: number) => void;
      deleteTodo: (userid: string, token: string, id: number) => void;
    };

export type TodoActionType = {
  type: string;
  payload: {
    todos?: Array<Todo>;
    id?: number;
    error?: string;
    loading?: boolean;
  };
};

export const TodoReducer = (
  state: TodoStateType,
  action: TodoActionType
): TodoStateType => {
  switch (action.type) {
    case "GET":
      return {
        ...state,
        todos: action.payload.todos!,
        loading: false
      };
    case "ADD":
      if (state.todos) {
        return {
          ...state,
          todos: [...state.todos, ...action.payload.todos!],
        };
      } else {
        return {
          ...state,
          todos: action.payload.todos!,
        };
      }
    case "UPDATE":
      return {
        ...state,
        todos: action.payload.todos!,
      };
    case "DELETE":
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.payload.id),
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
