import React, { useEffect, useContext } from "react";
import TodoItem from "./TodoItem";
import TodoInput from "./TodoInput";
import { GlobalContext } from "../../context/GlobalContext";
import { TodoContext } from "../../context/TodoContext";

const TodoList: React.FC = () => {
  const { isLoggedIn, userid, token } = useContext(GlobalContext);
  const { todos, getAllTodos } = useContext(TodoContext);

  // fetching data on loading first time
  useEffect(() => {
    getAllTodos(userid, token);
  }, [isLoggedIn, userid, token]);

  return isLoggedIn ? (
    <div className="todo-container">
      <TodoInput />
      <ul className="todo-list">
        {todos
          ? todos.map(todo => (
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
    <h3 className="text">
      Error, No authorization, Please Sign In
    </h3>
  );
};

export default TodoList;
