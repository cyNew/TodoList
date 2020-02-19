import { Context, DefaultState } from "koa";
import Router from "koa-router";
import { TodoController } from "./controller/todo.controller";
import { UserController } from "./controller/user.controller";

const router = new Router<DefaultState, Context>();

const TodoApi: string = "/api/v1/todo";
const UserApi: string = "/api/v1/user";

router
  .get(TodoApi, TodoController.getAllTodo)
  .post(TodoApi, TodoController.createTodo)
  .get(TodoApi + "/:id", TodoController.getByIdTodo)
  .put(TodoApi + "/:id", TodoController.updateTodo)
  .del(TodoApi + "/:id", TodoController.delTodo);
router
  .post(UserApi + "/register", UserController.createUser)
  .post(UserApi + "/login", UserController.login);

export default router;
