import React, { useState, useEffect, useContext, useCallback } from "react";
import axios from "axios";
import TodoItem from "./TodoItem";
import TodoInput from "./TodoInput";
import { GlobalContext } from "../../context/GlobalContext";

enum Status {
  y = "Y",
  n = "N"
}

interface Todo {
  id: number;
  todo: string;
  completed: Status;
}

const TodoList: React.FC = () => {
  const API_URL = "http://127.0.0.1:9000/api/v1/todo";
  const [todos, setTodos] = useState<Todo[]>([]);
  const { state } = useContext(GlobalContext);
  const { isLoggedIn, userid, token } = state;

  const fetchData = useCallback(async (): Promise<void> => {
    if (isLoggedIn) {
      try {
        let res = await axios({
          method: "get",
          url: API_URL,
          headers: {
            userid,
            authorization: `Bearer ${token}`
          }
        });
        setTodos(res.data.data);
      } catch (e) {
        console.log("fetch data failed");
      }
    }
  }, [token, userid, isLoggedIn]);

  // fetching data on loading first time
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const updateComplete = async (id: number) => {
    try {
      const todo: Todo = todos.filter(todo => todo.id === id)[0];
      await axios({
        method: "put",
        url: API_URL + `/${id}`,
        headers: {
          userid,
          authorization: "Bearer " + token
        },
        data: {
          completed: todo.completed === "Y" ? Status.n : Status.y
        }
      });

      const newTodos: Todo[] = todos.map(todo => {
        if (todo.id === id) {
          todo.completed = todo.completed === "Y" ? Status.n : Status.y;
        }
        return todo;
      });

      setTodos([...newTodos]);
    } catch (e) {
      console.log("update failed");
    }
  };

  const createTodo = async (todo: string) => {
    try {
      let res = await axios({
        method: "post",
        url: API_URL,
        headers: {
          userid,
          authorization: "Bearer " + token
        },
        data: {
          todo
        }
      });

      if (!res.data.data) {
        throw new Error();
      }
      fetchData();
    } catch (e) {
      console.log("POST new todo failed");
    }
  };

  const deleteTodo = async (id: number) => {
    try {
      await axios({
        method: "delete",
        url: API_URL + `/${id}`,
        headers: {
          authorization: "Bearer " + token
        }
      });

      const newTodos: Todo[] = todos.filter(todo => todo.id !== id);
      setTodos([...newTodos]);
    } catch (e) {
      console.log("delete todo failed");
    }
  };

  return isLoggedIn ? (
    <div className="todo-container">
      <TodoInput handleTodo={createTodo} />
      <ul>
        {todos
          ? todos.map(todo => (
              <TodoItem
                key={todo.id}
                _id={todo.id}
                todo={todo.todo}
                completed={todo.completed}
                handleComplete={updateComplete}
                handleDelete={deleteTodo}
              />
            ))
          : ""}
      </ul>
    </div>
  ) : (
    <h3 style={{ gridColumn: "4/10", alignSelf: "center" }}>
      Error, No authorization, Please Sign In
    </h3>
  );
};

export default TodoList;
