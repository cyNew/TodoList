import React, { useState, useContext } from "react";
import { GlobalContext } from "../../context/GlobalContext";
import { TodoContext } from "../../context/TodoContext";

const TodoInput: React.FC = () => {
  const [todo, setTodo] = useState("");
  const { userid, token } = useContext(GlobalContext);
  const { createTodo } = useContext(TodoContext);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTodo(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    if (!todo) {
      window.alert("todo is null!");
      event.preventDefault();
    } else {
      createTodo(userid, token, todo);
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
