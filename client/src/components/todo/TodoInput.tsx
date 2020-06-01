import React, { useState, useContext } from "react";
import { GlobalContext } from "../../context/GlobalContext";
import { TodoContext } from "../../context/TodoContext";
import axios from "axios";

const TodoInput: React.FC = () => {
  const [todo, setTodo] = useState("");
  const { state } = useContext(GlobalContext);
  const { dispatch } = useContext(TodoContext);

  const createTodo = async (
    userid: string,
    token: string,
    todo: string
  ): Promise<void> => {
    const API_URL = "/api/v1/todo";
    try {
      const res = await axios({
        url: API_URL,
        method: "POST",
        headers: {
          userid,
          authorization: `Bearer ${token}`,
        },
        data: {
          todo,
        },
      });
      if (res.data.success) {
        dispatch &&
          dispatch({
            type: "ADD",
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
          payload: { todos: [], error },
        });
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTodo(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    if (!todo) {
      window.alert("todo is null!");
      event.preventDefault();
    } else {
      createTodo(state.userid, state.token, todo);
      event.preventDefault();
      setTodo("");
    }
  };

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <input
        className="todo-input"
        type="text"
        onChange={handleChange}
        value={todo}
        placeholder="Add New Todo Here..."
      />
      {/* <input className="todo-submit" type="submit" value="create" /> */}
    </form>
  );
};

export default TodoInput;
