import React, { useContext } from "react";
import { ReactComponent as Del } from "../../asserts/delete.svg";
import { GlobalContext } from "../../context/GlobalContext";
import { TodoContext } from "../../context/TodoContext";
import axios from "axios";

interface Props {
  _id: number;
  todo: string;
  completed: string;
}
const TodoItem: React.FC<Props> = ({ todo, _id, completed }) => {
  const { state } = useContext(GlobalContext);
  const { state: todoState, dispatch } = useContext(TodoContext);

  const API_URL = "/api/v1/todo";
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
          authorization: `Bearer ${token}`,
        },
      });
      if (res.data.success) {
        const newTodos = todoState.todos.map((todo) => {
          if (todo.id === id) {
            todo.completed = todo.completed === "Y" ? "N" : "Y";
          }
          return todo;
        });

        dispatch &&
          dispatch({
            type: "UPDATE",
            payload: {
              todos: newTodos,
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
          authorization: `Bearer ${token}`,
        },
      });
      if (res.data.success) {
        dispatch &&
          dispatch({
            type: "DELETE",
            payload: {
              todos: [],
              id,
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

  return (
    <li className="todo-item">
      <input
        type="checkbox"
        defaultChecked={completed === "Y" ? true : false}
        onClick={() => {
          updateTodo(state.userid, state.token, _id);
        }}
      />
      <span
        className="todo-content"
        style={{
          textDecorationLine: completed === "Y" ? "line-through" : "none",
        }}
      >
        {todo}
      </span>
      <div
        className="icon-wrapper todo-del"
        onClick={() => {
          deleteTodo(state.userid, state.token, _id);
        }}
      >
        <Del className="icon" />
      </div>
    </li>
  );
};

export default TodoItem;
