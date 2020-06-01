import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import TodoList from "./components/todo/TodoList";
import Header from "./components/public/Header";
import About from "./components/public/About";
import "./App.css";
import GlobalProvider from "./context/GlobalContext";
import TodoProvider from "./context/TodoContext";
import Login from "./components/public/Login";
import Register from "./components/public/Register";

const App: React.FC = () => {
  return (
    <div className="app">
      <GlobalProvider>
        <TodoProvider>
          <Router>
            <Header />
            <Switch>
              <Route path="/login">
                <Login />
              </Route>
              <Route path="/about">
                <About />
              </Route>
              <Route path="/register">
                <Register />
              </Route>
              <Route path="/">
                <TodoList />
              </Route>
            </Switch>
          </Router>
        </TodoProvider>
      </GlobalProvider>
    </div>
  );
};

export default App;
