import React, { useState } from "react";

interface Props {
  handleTodo: (todo: string) => void;
}

const TodoInput: React.FC<Props> = ({ handleTodo }) => {
  const [todo, setTodo] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTodo(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    if (!todo) {
      window.alert("todo is null!");
      event.preventDefault()
    } else {
      handleTodo(todo);
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
