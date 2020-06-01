import React, { useEffect, useContext } from "react";
import TodoItem from "./TodoItem";
import TodoInput from "./TodoInput";
import { GlobalContext } from "../../context/GlobalContext";
import { TodoContext } from "../../context/TodoContext";
import axios from "axios";

const TodoList: React.FC = () => {
  const { state } = useContext(GlobalContext);
  const { state: todoState, dispatch } = useContext(TodoContext);

  const getAllTodos = async (userid: string, token: string): Promise<void> => {
    const API_URL = "/api/v1/todo";
    try {
      const res = await axios({
        url: API_URL,
        method: "GET",
        headers: {
          userid,
          authorization: `Bearer ${token}`,
        },
      });
      if (res.data.success) {
        dispatch &&
          dispatch({
            type: "GET",
            payload: {
              todos: res.data.data,
            },
          });
      } else {
        throw new Error(res.data.msg);
      }
    } catch (error) {
      dispatch &&
        dispatch({
          type: "ERROR",
          payload: {
            todos: [],
            error,
          },
        });
    }
  };

  // fetching data on loading first time
  useEffect(() => {
    getAllTodos(state.userid, state.token);
  }, [state.userid, state.token]);

  return state.isLoggedIn ? (
    <div className="todo-container">
      <TodoInput />
      <ul className="todo-list">
        {todoState.todos
          ? todoState.todos.map((todo) => (
              <TodoItem
                key={todo.id}
                _id={todo.id}
                completed={todo.completed}
                todo={todo.todo}
              />
            ))
          : ""}
      </ul>
    </div>
  ) : (
    <h3 className="text">Error, No authorization, Please Sign In</h3>
  );
};

export default TodoList;
