import { Context, Next } from "koa";
import { getRepository } from "typeorm";
import { TodoTable } from "../entity/todo.entity";

enum Status {
  y = "Y",
  n = "N"
}

const dbName: string = process.env.NODE_ENV === "production" ? "prod" : "test";
class TodoController {
  // find all todos
  // URL: /api/v1/todo
  public static async getAllTodo(ctx: Context, next?: Next) {
    const todoRepo = getRepository(TodoTable, dbName);
    const todos = await todoRepo.find({ userid: ctx.header.userid });
    if (todos !== undefined && todos.length >= 1) {
      ctx.body = {
        data: todos
      };
    } else {
      ctx.status = 404;
      return;
    }
  }

  // find a single todo
  public static async getByIdTodo(ctx: Context, next?: Next) {
    const todoRepo = getRepository(TodoTable, dbName);
    const todo = await todoRepo.findOne({ id: ctx.params.id });
    if (!todo) {
      ctx.status = 404;
      return;
    }
    ctx.body = {
      data: [todo]
    };
  }

  public static async createTodo(ctx: Context, next?: Next) {
    const todoRepo = getRepository(TodoTable, dbName);
    const { todo } = ctx.request.body;

    if (!todo) {
      ctx.status = 404;
      ctx.body = {
        msg: "todo is null"
      };
      return;
    } else {
      let newTodo = new TodoTable();
      newTodo.todo = todo;
      newTodo.completed = ctx.request.body.completed || Status.n;
      newTodo.created = new Date();
      newTodo.updated = new Date();
      newTodo.userid = ctx.header.userid;
      try {
        await todoRepo.save(newTodo);
        ctx.body = {
          data: [newTodo]
        };
      } catch (error) {
        ctx.status = 404;
        console.error(error);
        return;
      }
    }
  }

  public static async updateTodo(ctx: Context, next?: Next) {
    const todoRepo = getRepository(TodoTable, dbName);
    let todo = await todoRepo.findOne(ctx.params.id);

    if (!todo) {
      ctx.status = 404;
      return;
    } else {
      todo.todo = ctx.request.body.todo || todo.todo;
      todo.completed = ctx.request.body.completed || todo.completed;
      todo.updated = new Date();
      try {
        await todoRepo.save(todo);
        ctx.body = {
          data: [todo]
        };
      } catch (error) {
        ctx.status = 404;
        console.error(error);
        return;
      }
    }
  }

  public static async delTodo(ctx: Context, next?: Next) {
    const todoRepo = getRepository(TodoTable, dbName);
    const todo = await todoRepo.findOne(ctx.params.id);
    if (!todo) {
      ctx.status = 404;
      return;
    } else {
      try {
        await todoRepo.remove(todo);
        ctx.status = 200;
        ctx.body = {
          data: [todo]
        };
      } catch (error) {
        ctx.status = 404;
        console.error(error);
        return;
      }
    }
  }
}

export { TodoController };
