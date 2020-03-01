import React, { useContext } from "react";
import { ReactComponent as Del } from "../../asserts/delete.svg";
import { GlobalContext } from "../../context/GlobalContext";
import { TodoContext } from "../../context/TodoContext";

interface Props {
  _id: number;
  todo: string;
  completed: string;
}
const TodoItem: React.FC<Props> = ({ todo, _id, completed }) => {
  const { userid, token } = useContext(GlobalContext);
  const { updateTodo, deleteTodo } = useContext(TodoContext);
  const checked = completed === "Y" ? true : false;
  return (
    <li className="todo-item">
      <input
        type="checkbox"
        defaultChecked={checked}
        onClick={() => {
          updateTodo(userid, token, _id);
        }}
      />
      <span
        style={{
          textDecorationLine: completed === "Y" ? "line-through" : "none"
        }}
      >
        {todo}
      </span>
      <span
        className="icons todo-del"
        onClick={() => {
          deleteTodo(userid, token, _id);
        }}
      >
        <Del />
      </span>
    </li>
  );
};

export default TodoItem;
