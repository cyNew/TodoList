import React, { createContext, useReducer, Reducer } from "react";
import axios from "axios";
import { TodoReducer, TodoStateType, TodoActionType, Todo, Status } from "./TodoReducer";

const initialState: TodoStateType = {
  todos: [],
  error: "",
  loading: true,
  getAllTodos: (userid: string, token: string) => {},
  createTodo: (userid: string, token: string, todo: string) => {},
  updateTodo: (userid: string, token: string, id: number) => {},
  deleteTodo: (userid: string, token: string, id: number) => {}
};

export const TodoContext = createContext(initialState);

export const TodoProvider: React.FC = ({ children }) => {
  const API_URL = "/api/v1/todo";
  const [state, dispatch] = useReducer<Reducer<TodoStateType, TodoActionType>>(
    TodoReducer,
    initialState
  );

  const getAllTodos = async (userid: string, token: string): Promise<void> => {
    try {
      const res = await axios({
        url: API_URL,
        method: "GET",
        headers: {
          userid,
          authorization: `Bearer ${token}`
        }
      });
      if (res.data.success) {
        dispatch({
          type: "GET",
          payload: {
            todos: res.data.data
          }
        });
      } else {
        throw new Error(res.data.msg);
      }
    } catch (error) {
      dispatch({
        type: "ERROR",
        payload: {
          error
        }
      });
    }
  };

  const createTodo = async (
    userid: string,
    token: string,
    todo: string
  ): Promise<void> => {
    try {
      const res = await axios({
        url: API_URL,
        method: "POST",
        headers: {
          userid,
          authorization: `Bearer ${token}`
        },
        data: {
          todo
        }
      });
      if (res.data.success) {
        dispatch({
          type: "ADD",
          payload: {
            todos: res.data.data
          }
        });
      } else {
        throw new Error(res.data.msg);
      }
    } catch (error) {
      dispatch({
        type: "ERROR",
        payload: { error }
      });
    }
  };

  const updateTodo = async (
    userid: string,
    token: string,
    id: number
  ): Promise<void> => {
    try {
      const res = await axios({
        url: `${API_URL}/${id}`,
        method: "PUT",
        headers: {
          userid,
          authorization: `Bearer ${token}`
        }
      });
      if (res.data.success) {
        const newTodos: Array<Todo> = state.todos.map(todo => {
          if (todo.id === id) {
            todo.completed = todo.completed === "Y" ? Status.n : Status.y;
          }
          return todo;
        });

        dispatch({
          type: "UPDATE",
          payload: {
            todos: newTodos
          }
        });
      } else {
        throw new Error(res.data.msg);
      }
    } catch (error) {
      dispatch({
        type: "ERROR",
        payload: {
          error
        }
      });
    }
  };

  const deleteTodo = async (
    userid: string,
    token: string,
    id: number
  ): Promise<void> => {
    try {
      const res = await axios({
        url: `${API_URL}/${id}`,
        method: "DELETE",
        headers: {
          userid,
          authorization: `Bearer ${token}`
        }
      });
      if (res.data.success) {
        dispatch({
          type: "DELETE",
          payload: {
            id
          }
        });
      } else {
        throw new Error(res.data.msg);
      }
    } catch (error) {
      dispatch({
        type: "ERROR",
        payload: {
          error
        }
      });
    }
  };

  return (
    <TodoContext.Provider
      value={{
        todos: state.todos,
        loading: state.loading,
        error: state.error,
        getAllTodos,
        createTodo,
        updateTodo,
        deleteTodo
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};
