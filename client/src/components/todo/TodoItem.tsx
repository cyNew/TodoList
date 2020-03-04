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
  return (
    <li className="todo-item">
      <input
        type="checkbox"
        defaultChecked={completed === "Y" ? true : false}
        onClick={() => {
          updateTodo(userid, token, _id);
        }}
      />
      <span
        className="todo-content"
        style={{
          textDecorationLine: completed === "Y" ? "line-through" : "none"
        }}
      >
        {todo}
      </span>
      <div
        className="icon-wrapper todo-del"
        onClick={() => {
          deleteTodo(userid, token, _id);
        }}
      >
        <Del className="icon"/>
      </div>
    </li>
  );
};

export default TodoItem;
